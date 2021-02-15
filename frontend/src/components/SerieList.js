import './SerieList.css'
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
    <li className="li-list" key={key}>
      <Link className="a-list" to={location + '/' + item.id}>{item.id} {item.title}</Link>
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

function setProgress(minute, url) {
  
  let video = document.createElement('video');
  let source = document.createElement('source')
  source.src = url;

  video.appendChild(source);

  video.addEventListener('loadedmetadata', function() {

    //porcentaje de carga de video

    console.log(video.duration);
  });

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
      <Router>
        <Switch>
          <Route exact path={location}>
            <div className="serie-list">
              <div className="last-list">
                <Link className="button-list" to={location + '/' + json.last.id}>
                  <div className="title-list">{json.title}</div>
                  <div className="chapter-list">
                    <div className="number-list">{json.last.id}</div>
                    <div className="title-list">{json.last.title}</div>
                  </div>
                  <div className="time-list">
                    <div className="bar-list">
                      <div className="progress-list">{setProgress(json.last.minute, json.last.url)}</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="list-list">
                <div className="title-list">
                  <div className="text-list">seasson 1</div>
                  <div className="buttons-list">
                    <div className="expand-list">
                      <svg width="30" height="30">
                        <polygon className="polygon-list" points="0,0 15,26 30,0" />
                      </svg>
                    </div>
                    <div className="change-list">
                      <svg width="30" height="20">
                        <polygon className="polygon-list" points="0,10 15,0 10,8 30,8 30,12 10,12 15,20 0,10" />
                      </svg>
                      <svg width="30" height="20">
                        <polygon className="polygon-list" points="30,10 15,0 20,8 0,8 0,12 20,12 15,20 30,10" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="chapters-list">
                  <ul>
                    {mapLink(location, json)}
                  </ul>
                </div>
              </div>
            </div>
          </Route>
          {mapRoute(location, json)}
        </Switch>
      </Router>
    );
  }
}

export default SerieList;
