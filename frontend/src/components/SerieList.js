import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function SerieList(object) {

  const [errorSeasson, setErrorSeasson] = useState(null);
  const [errorArco, setErrorArco] = useState(null);

  const [isLoadedSeasson, setIsLoadedSeasson] = useState(false);
  const [isLoadedArco, setIsLoadedArco] = useState(false);

  const [jsonSeasson, setJSONSeasson] = useState({ series : [] });
  const [jsonArco, setJSONArco] = useState({ series : [] });

  const [title, setTitle] = useState('seasson');

  const [json, setJSON] = useState({ id : 1, idList : 1, info : [], relleno : undefined, title : '' });
  //let json = { id : 1, idList : 1, info : [], relleno : undefined, title : '' };

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

    fetch('http://localhost:8000/serie/' + object.serieName + '/last?show=seasson')
      .then(res => res.json())
      .then(
        (result) => { setIsLoadedSeasson(true); setJSONSeasson(result); setJSON(result); },
        (error) => { setIsLoadedSeasson(true); setErrorSeasson(error); }
      );

      fetch('http://localhost:8000/serie/' + object.serieName + '/last?show=arco')
      .then(res => res.json())
      .then(
        (result) => { setIsLoadedArco(true); setJSONArco(result); },
        (error) => { setIsLoadedArco(true); setErrorArco(error); }
      );
  }, []);

  if (errorSeasson || errorArco) {
    console.log('error');
  } else if (!isLoadedSeasson || !isLoadedArco) {
    console.log('loading...');
  } else {
    console.log(jsonSeasson);
    //console.log(jsonArco);
  }

  return (
    <div>
      <div>
        <div>{json.id}</div>
        <div>
          <div>
            <div>{json.title}</div>
            <div>
              <button onClick={ () => { change() } } >Change</button>
            </div>
          </div>
          <ul>
            {json.info.map( (item, key) => <li key={key}>{item.title}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SerieList;
