import express from 'express';
import path from 'path';

import config from './config';

import fs from 'fs';
import sizeOf from 'image-size';

const app = express();

const CONTENT = ["pinhole", "wedding", "concert"];

// Static
if (config.STATIC_SERVE) {app.use('/images', express.static(__dirname + '/images/'));}

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Data

function getAlbum(path) {
  try {
    return fs.readdirSync(__dirname + path);
  } catch(err) {
    console.error(err);
  }
}

function getData(path) {
  let width, height, src;
  try {
    src = config.MEDIA_URL + path;
    width = sizeOf(__dirname + path).width;
    height = sizeOf(__dirname + path).height;
    return {src, width, height}
  } catch(err) {
    console.error(err);
  }
}

const items = CONTENT.length;

const albums = [];
for (let i = 0; i < items; i++) {
  let images = [];
  try {
    images = getAlbum(`/images/album${i + 1}`);
  } catch(err) {
    console.error(err);
  }

  const album = [];
  images.forEach(function(item, k, arr) {
    album.push(getData(`/images/album${i + 1}/` + item));
  });
  albums.push(album);
}

// API

app.get('/albums', (req, res) => {
  res.json(CONTENT);
});

app.get('/albums/album:id', (req, res, next) => {
  const id = Number(req.params.id);
  let data;

  try {
    data = Object.values(albums[id - 1]);
  } catch(err) {
    console.error(err);
    next();
  }
  res.json(data);
});

// Others
app.use(function(req, res) {
    res.status(404);
    res.send('Page not found!!!');
});

// Server
app.listen(config.PORT, () => {
  console.log('App listening on port ' + config.PORT + '!');
});
