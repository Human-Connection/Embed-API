const fetch = require('node-fetch');

// ToDo: Add image cache / thumbnail creation
module.exports = function (app) {
  return app.use('/images', (req, res) => {
    if (!req.query.url) {
      res.status(404).end('no url found.');
    }
    fetch(req.query.url)
      .then(result => {
        if (result.headers.get('content-type').indexOf('image') < 0) {
          res.status(404).end('no url found.');
        }
        res.writeHead(200, {
          'Content-Type': result.headers.get('content-type')
        });
        result.buffer()
          .then(buffer => {
            res.end(buffer);
          });
      });
  });
};
