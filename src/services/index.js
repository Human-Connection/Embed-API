const embeds = require('./embeds/embeds.service.js');
const images = require('./images/images.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(embeds);
  app.configure(images);
};
