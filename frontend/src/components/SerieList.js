import Chapter from './Chapter';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function mapLink(location, json) {

  return json.info.map( (item, key) => (
    <li key={key}>
      <Link to={location + '/' + item.id}>{item.id} {item.title}</Link>
    </li>
  ) );
}

function mapRoute(location, json) {

  return json.info.map( (item, key) => (
    <Route key={key} path={location + '/' + item.id}>
      <Chapter
        index={item.id - json.info[0].id}
        info={json.info}
        location={location + '/' + item.id}
        locationParent={location}
        title={json.title} />
    </Route>
  ) );
}

function renderLast(json) {

  //console.log(json.last);
  //return <a href={json.last.url}>{json.last.id} {json.last.title}</a>;
}

function SerieList(object) {

  const location = object.location;

  const [error, setError] = useState(false);
  const [isLoaded1, setIsLoaded1] = useState( false);
  const [isLoaded2, setIsLoaded2] = useState( false);
  const [isLoaded3, setIsLoaded3] = useState( false);
  const [isLoaded4, setIsLoaded4] = useState( false);

  const [jsonSeassons, setJSONSeassons] = useState([]);
  const [jsonSeasson, setJSONSeasson] = useState([]);

  const [jsonArcos, setJSONArcos] = useState([]);
  const [jsonArco, setJSONArco] = useState([]);

  const [json, setJSON] = useState({ id : 1, idList : 1, info : [ '' ], relleno : undefined, title : '' });

  

  const change = () => {

    if (json.title == jsonSeasson.title) {
      setJSON(jsonArco);
    } else {
      setJSON(jsonSeasson);
    }
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {

    let url = 'http://localhost:8000/serie' + location + '/';

    let urls = [
      url + 'last?show=seasson',
      url + 'last?show=arco',
      url + 'seassons',
      url + 'arcos',
    ]

    function loadedControl(i) {
      
      switch (i) {
        case 0: setIsLoaded1( true ); break;
        case 1: setIsLoaded2( true ); break;
        case 2: setIsLoaded3( true ); break;
        case 3: setIsLoaded4( true ); break;
      }
    }

    for (let i = 0; i < 4; i++) {
      fetch(urls[i])
      .then(res => res.json())
      .then(
        (result) => {
          loadedControl(i);
          switch (i) {
            case 0: setJSONSeasson(result); setJSON(result); break;
            case 1: setJSONArco(result); break;
            case 2: setJSONSeassons(result); break;
            case 3: setJSONArcos(result); break;
          }
        },
        (err) => {
          loadedControl(i);
          setError(err && error);
        }
      );
    }
  }, []);

  if (error) {
    return <h1>error</h1>;
  } else if (!isLoaded1 || !isLoaded2 || !isLoaded3 || !isLoaded4) {
    return <h1>loading...</h1>;
  } else {
    
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path={location}>
              <div>{renderLast(json)}</div>
              <div>
                <div>
                  <div>{json.title}</div>
                  <div>
                    <button onClick={ () => { change() } } >Change</button>
                  </div>
                </div>
                <ul>
                  {mapLink(location, json)}
                </ul>
              </div>
            </Route>
            {mapRoute(location, json)}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default SerieList;
