const assert = require('assert');
const app = require('../../src/app');

describe('\'embeds\' service', () => {
  it('registered the service', () => {
    const service = app.service('embeds');

    assert.ok(service, 'Registered the service');
  });
});
