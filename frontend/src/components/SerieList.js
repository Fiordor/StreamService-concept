import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function mapInfo(json) {

  return json.info.map( (item, key) => (
    <li key={key}>
      <a href={item.url}>{item.id} {item.title}</a>
    </li>
  ) );
}

function renderLast(json) {

  return <a href={json.last.url}>{json.last.id} {json.last.title}</a>;
}

function SerieList(object) {

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

    let url = 'http://localhost:8000/serie/' + object.serieName + '/';

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
    return <h1>loading...</h1>
  } else {
    
    return (
      <div>
        <div>
          <div>{renderLast(json)}</div>
          <div>
            <div>
              <div>{json.title}</div>
              <div>
                <button onClick={ () => { change() } } >Change</button>
              </div>
            </div>
            <ul>
              {mapInfo(json)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SerieList;
