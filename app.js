import express from 'express';

const app = express();

const ALBUMS = {
  album1: {
    name: 'album1',
    content: [
      ['/images/album1/image-1.jpg',[1000,700]],
      ['/images/album1/image-2.jpg',[1000,700]],
      ['/images/album1/image-3.jpg',[1000,700]],
    ]
  },
  album2: {
    name: 'album2',
    content: [
      ['/images/album2/image-1.jpg',[1000,700]],
      ['/images/album2/image-2.jpg',[1000,700]],
      ['/images/album2/image-3.jpg',[1000,700]],
    ]
  },
  album3: {
    name: 'album3',
    content: [
      ['/images/album3/image-1.jpg',[1000,700]],
      ['/images/album3/image-2.jpg',[1000,700]],
      ['/images/album3/image-3.jpg',[1000,700]],
    ]
  },
}

const keys = Object.keys(ALBUMS);
const values = Object.values(ALBUMS);

// Static
app.use('/static', express.static(__dirname + '/images'));

app.get('/albums', (req, res) => {
  res.json(keys);
});

app.get('/albums/album:id', (req, res, next) => {
  const id = req.params.id;

  if (id < keys.length) {
    const content = Object.values(values[id])[1];
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