import './Chapter.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function clear(interval) {

  clearInterval(interval);
  return -1;
}

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

function updateTime(time) {
  console.log(time);
  /*
    fetch('http://localhost:8000/list')
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.log(err)
      }
    );
  */
}

function Chapter(object) {

  const chapter = object.info[object.index];

  useEffect(() => {

    if (chapter.id - 1 <= 0) {
      document.getElementById('bt-l').classList.add('disabled-chapter');
    }

    if (chapter.id + 1 > object.info.length) {
      document.getElementById('bt-r').classList.add('disabled-chapter');
    }

    let interval = -1;
    let video = document.getElementById('video');

    video.currentTime = video.duration == chapter.minute ? 0 : chapter.minute * 60;

    video.onplaying = function() {
      console.log('play');

      if (interval == -1) {
        interval = setInterval(function() { updateTime(video.currentTime); }, 60000);
      }
    }

    video.onpause = function() {
      console.log('pause');
      interval = clear(interval);
      let time = parseInt(video.currentTime / 60);
      updateTime(time);
    }

    video.onended = function() {
      console.log('end');
      interval = clear(interval);
      updateTime(video.duration);
    }

  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={object.location}>
          <div className="main-chapter">
            <div className="column-chapter lateral-chapter">
              <div className="bt-l-chapter" id="bt-l">
                <Link className="a-chapter" to={object.locationParent + '/' + (chapter.id - 1)}>
                  <svg width="50" height="50">
                    <polygon className="polygon-chapter" points="0,0 25,43 50,0" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="column-chapter center-chapter">
              <div className="titles-chapter">
                <div className="tl1-chapter">
                  {object.title} {'#' + chapter.id} {chapter.relleno ? '🔴' : '🟢'}
                </div>
                <div className="tl2-chapter">
                  {chapter.title}
                </div>
              </div>
              <video id="video" width="480" height="320" controls>
                <source src={chapter.url} type="video/mp4" />
              </video>
            </div>
            <div className="column-chapter lateral-chapter">
              <div className="bt-r-chapter" id="bt-r">
                <Link className="a-chapter" to={object.locationParent + '/' + (chapter.id + 1)}>
                  <svg width="50" height="50">
                    <polygon className="polygon-chapter" points="0,0 25,43 50,0" />
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
