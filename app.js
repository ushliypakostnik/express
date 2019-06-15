import express from 'express';
import path from 'path';
import url from 'url';

import config from './config';

import fs from 'fs';
import sizeOf from 'image-size';

const app = express();

// Data

function getData(album, image) {
  let width, height, src, fullPath;

  fullPath = path.join(config.MEDIA_DIR, album, image);

  src = config.MEDIA_URL + '/' + album + '/' + image;
  width = sizeOf(fullPath).width;
  height = sizeOf(fullPath).height;

  return {src, width, height}
}

// Initialization
const albums = {};
config.CONTENT.forEach(function(item, i) {
  const album = [];
  let images = [];

  images = fs.readdirSync(path.join(config.MEDIA_DIR, item['id']));
  images.forEach(function(image, k) {
    if (!path.extname(image)) {
        return;
    }

    album.push(getData(item['id'], image));
  });

  albums[item['id']] = album;
});

// Static
if (config.STATIC_SERVE) {
  const mediaURL = new url.URL(config.MEDIA_URL);
  app.use(mediaURL.pathname, express.static(config.MEDIA_DIR));
}

// CORS
if (config.CORS_ENABLED) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

// API

app.get('/albums', (req, res) => {
  res.json(config.CONTENT);
});

app.get('/albums/:id', (req, res, next) => {
  const id = req.params.id;
  let data;

  if (id in albums) {
    data = albums[id];
  } else {
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
