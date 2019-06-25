import request from 'supertest';

import config from '../config';

import app from '../app';

describe('Test the api', () => {
  test('GET /albums', (done) => {
    request(app).get('/albums').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  config.CONTENT.forEach((item) => {
    test(`GET /albums/${item.id}`, (done) => {
      request(app).get(`/albums/${item.id}`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
