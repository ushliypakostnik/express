import express from 'express';
import path from 'path';

import config from './config';

import fs from 'fs';
import sizeOf from 'image-size';

const app = express();

// Static
app.use('/images', express.static(__dirname + '/images/'));

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

const content = JSON.parse(fs.readFileSync('content.json'));
const ALBUMSARR = Object.entries(content);
const items = ALBUMSARR.length;

const names = [];
const albums = [];
for (let i = 0; i < items; i++) {
  names.push(Object.values(ALBUMSARR[i][1]));

  let images = 0;
  try {
    images = getAlbum('/images/album' + (i + 1)).length;
  } catch(err) {
    console.error(err);
  }

  let album = [];
  for (let k = 0; k < images; k++) {
    album.push(getData('/images/album' + (i + 1) +'/' + (k + 1) + '.jpg'));
  }
  albums.push(album);
}

// API

app.get('/albums', (req, res) => {
  res.json(names);
});

app.get('/albums/album:id', (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const data = Object.values(albums[id - 1]);
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
