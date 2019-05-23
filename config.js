require('dotenv').config();

const env = process.env.NODE_ENV;

const development = {
  MEDIA_URL: process.env.MEDIA_URL || 'http://127.0.0.1:8082',
  PORT: process.env.PORT || 8082
};

const production = {
  MEDIA_URL: process.env.MEDIA_URL || 'http://api.samovarov.pro',
  PORT: process.env.PORT || 8082
};

const config = {
  development,
  production
};

export default config[env];