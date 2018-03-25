// Initializes the `url` service on path `/url`
const createService = require('./embeds.class.js');
const createModel = require('./embeds.model.js');
const hooks = require('./embeds.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');
  const Model = createModel(app);

  const options = {
    name: 'embeds',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/embeds', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('embeds');

  service.hooks(hooks);
};
