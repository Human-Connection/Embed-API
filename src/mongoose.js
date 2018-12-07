const mongoose = require('mongoose');

const MONGODB_URI = process.env.EMBED_API_MONGO_DB || 'mongodb://localhost:27017/embeds';

module.exports = function (app) {
  mongoose.Promise = global.Promise;
  mongoose.connect(`${MONGODB_URI}`, { useNewUrlParser: true }).catch( (e) => return(e));
  app.set('mongooseClient', mongoose);
};
