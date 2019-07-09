require('dotenv').config();

const env = process.env.NODE_ENV;

const CONTENT = [
  { id: 'pinhole', name: 'pinhole' },
  { id: 'wedding', name: 'wedding' },
  { id: 'concert', name: 'concert' },
  { id: 'pixelart', name: 'pixelart' },
];

const common = {
  PORT: process.env.PORT || 8082,
  MEDIA_DIR: process.env.MEDIA_DIR || 'media',
  CONTENT,
}

const development = {
  ...common,
  MEDIA_URL: process.env.MEDIA_URL || 'http://127.0.0.1:8082/media',
  STATIC_SERVE: true,
  CORS_ENABLED: true,
};

const production = {
  ...common,
  MEDIA_DIR: process.env.MEDIA_DIR || 'media',
  MEDIA_URL: process.env.MEDIA_URL || 'http://www.yourserver.com/media',
  STATIC_SERVE: false,
  CORS_ENABLED: false,
};

const config = {
  development,
  production,
};

export default config[env];
