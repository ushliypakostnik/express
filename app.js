import express from 'express';
import path from 'path';

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

function getConfig(url) {
  try {
    return fs.readdirSync(__dirname + url);
  } catch(err) {
    console.error(err);
  }
}

function getData(url) {
  let width = sizeOf(__dirname + url).width;
  let height = sizeOf(__dirname + url).height;
  let src = 'http://127.0.0.1:8082' + url;
  return {src, width, height}
}

const ALBUMS = JSON.parse(fs.readFileSync('config.txt', 'utf-8'));
const ALBUMSARR = Object.entries(ALBUMS);
const items = ALBUMSARR.length;

const names = [];
const contents = [];
for (let i = 0; i < items; i++) {
  names.push(Object.values(ALBUMSARR[i][1]));

  let images = getConfig('/images/album' + (i + 1)).length;
  let content = [];
  for (let k = 0; k < images; k++) {
    content.push(getData('/images/album' + (i + 1) +'/' + (k + 1) + '.jpg'));
  }
  contents.push(content);
}

// API

app.get('/albums', (req, res) => {
  res.json(names);
});

app.get('/albums/album:id', (req, res, next) => {
  const id = Number(req.params.id);

  if ((id > 0) && (id <= items)) {
    const content = Object.values(contents[id - 1]);
    res.json(content);
  } else {
    next();
  }
});

// Others
app.use(function(req, res) {
    res.status(404);
    res.send('Page not found!!!');
});

app.listen(8082, () => {
  console.log('Example app listening on port 8082!');
});