// const cors = require('cors');

// eslint-disable-next-line no-unused-vars
let allowedRoutes = [
  '/images'
];

module.exports = function (app) {
  /*
  const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions))
  */
  app.use(function (req, res, next) {
    const authentication = req.header('authentication');
    const token = app.get('token')
    if (allowedRoutes.includes(req.path) || !token || authentication === token) {
      next();
    } else {
      res.status(401).send('Request not authorized');
    }
  });
};
