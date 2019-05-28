require('dotenv').config();

const env = process.env.NODE_ENV;

const development = {
  PORT: process.env.PORT || 8082,
  MEDIA_URL: process.env.MEDIA_URL || 'http://127.0.0.1:8082',
  STATIC_SERVE: true
};

const production = {
  PORT: process.env.PORT || 8082,
  MEDIA_URL: process.env.MEDIA_URL || 'http://api.samovarov.pro',
  STATIC_SERVE: false
};

const config = {
  development,
  production
};

export default config[env];