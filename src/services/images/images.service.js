const fetch = require('node-fetch');

// ToDo: Add image cache / thumbnail creation
module.exports = function (app) {
  return app.use('/images', (req, res) => {
    if (!req.query.url) {
      res.end('no url found.');
    }
    fetch(req.query.url)
      .then(result => {
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
