
import SerieList from './SerieList';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function mapLink(json) {
  return json.series.map( (item, key) => (
    <li key={key}>
      <Link to={item}>{item}</Link>
    </li>
  ) );
}

function mapRoute(json) {
  return json.series.map( (item, key) => (
    <Route key={key} path={ '/' + item }>
      <SerieList location={'/' + item} />
    </Route>
  ) );
}

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [json, setJSON] = useState({ series : [] });

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8000/list")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setJSON(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/'>
              <ul> {mapLink(json)} </ul>
            </Route>
            {mapRoute(json)}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
