const assert = require('assert');
const app = require('../../src/app');
const service = app.service('images');

describe('\'images\' service', () => {
  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });
});
