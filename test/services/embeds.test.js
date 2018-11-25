const assert = require('assert');
const app = require('../../src/app');
const service = app.service('embeds');

const port = app.get('port') || 3030;

describe('\'embeds\' service', () => {
  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  // Parameters for the find() method on the Service class.
  let params = {
    simpleUrl: {
      query: {
        url: 'https://www.youtube.com/watch?v=QWU9YsxXPqw'
      }
    },
    startTimeUrl: {
      query: {
        url: 'https://www.youtube.com/watch?v=QWU9YsxXPqw&start=332'
      }
    }
  };

  it('GET /embeds?url={simpleUrl}', async () => {
    // Calls Embeds Service.find(params) method, which will trigger the URL validation
    await service.find(params.simpleUrl).then((body) => {
      assert.equal(body.site_name.toLowerCase(), 'youtube');
      assert.equal(body.url, params.simpleUrl.query.url);
    }).catch(err => {
      return err;
    });
  });

  it('GET /embeds?url={startTimeUrl}', async () => {
    await service.find(params.startTimeUrl).then((body) => {
      assert.equal(body.site_name.toLowerCase(), 'youtube');

      // Start time is only appended to the "video" key and it always returns with a "?start"
      assert.equal(body.video[0].url, 'https://www.youtube.com/embed/QWU9YsxXPqw?start=332');
    }).catch(err => {
      return err;
    });
  });
});
