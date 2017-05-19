"use strict";

const request = require('supertest');
const app = require('../bin/www');

describe('GET /', function() {
  it('loads web page', function(done) {
    request(app.server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /auth/google', function() {
  it('loads web page', function(done) {
    request(app.server)
      .get('/auth/google')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});