import express from 'express';
import path from 'path';
import url from 'url';

import fs from 'fs';
import sizeOf from 'image-size';

import config from './config';

const app = express();

// Data

function getData(album, image) {
  const src = `${config.MEDIA_URL}/${album}/{src}/${image}`;
  const fullPath = path.join(config.MEDIA_DIR, album, image);

  const { width, height } = sizeOf(fullPath);

  return { src, width, height };
}

// Initialization
const albums = {};
config.CONTENT.forEach((item) => {
  const album = [];
  let images = [];

  images = fs.readdirSync(path.join(config.MEDIA_DIR, item.id));
  images.forEach((image) => {
    if (!path.extname(image)) {
      return;
    }

    album.push(getData(item.id, image));
  });

  albums[item.id] = album;
});

// Static
if (config.STATIC_SERVE) {
  const mediaURL = new url.URL(config.MEDIA_URL);
  app.use(mediaURL.pathname, express.static(config.MEDIA_DIR));
}

// CORS
if (config.CORS_ENABLED) {
  app.use((req, res, next) => {
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
  const { id } = req.params;
  let data;

  if (id in albums) {
    data = albums[id];
  } else {
    next();
  }

  res.json(data);
});

// Others
app.use((req, res) => {
  res.status(404);
  res.send('Page not found!!!');
});

module.exports = app;
