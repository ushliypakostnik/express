const env = process.env.NODE_ENV;

const development = {
  MEDIA_URL: process.env.MEDIA_URL || 'http://127.0.0.1:8082',
  PORT: process.env.PORT || 8082
};

const production = {
  MEDIA_URL: process.env.MEDIA_URL || 'http://api.samovarov.pro',
  PORT: process.env.PORT || 8082
};

export const content = {
  album1: {
    name: "pinhole"
  },
  album2: {
    name: "wedding"
  },
  album3: {
    name: "concert"
  }
};

const config = {
  development,
  production,
  content
};

export default config[env];