import './Chapter.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function renderRoute(selection, chapter, object) {

  let id = chapter.id + selection;
  let index = object.index + selection;
  let location = object.locationParent + '/' + id;

  return <Route path={object.locationParent + '/' + id}>
    <Chapter
      index={index}
      info={object.info}
      location={location}
      locationParent={object.locationParent}
      title={object.title} />
  </Route>;
}

function Chapter(object) {

  console.log(object);

  const chapter = object.info[object.index];

  return (
    <Router>
      <Switch>
        <Route exact path={object.location}>
          <div className="main">
            <div className="column lateral">
              <div className="bt-l">
                <Link to={object.locationParent + '/' + (chapter.id - 1)}>
                  <svg width="50" height="50">
                    <polygon points="0,0 25,43 50,0" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="column center">
              <div className="titles">
                <div className="tl1">
                  {object.title} {'#' + chapter.id} {chapter.relleno ? '🔴' : '🟢'}
                </div>
                <div className="tl2">
                  {chapter.title}
                </div>
              </div>
              <video width="480" height="320" controls>
                <source src={chapter.url} type="video/mp4" />
              </video>
            </div>
            <div className="column lateral">
              <div className="bt-r">
                <Link to={object.locationParent + '/' + (chapter.id + 1)}>
                  <svg width="50" height="50">
                    <polygon points="0,0 25,43 50,0" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Route>
        {renderRoute(-1, chapter, object)}
        {renderRoute(1, chapter, object)}
      </Switch>
    </Router>
  );
}

export default Chapter;
