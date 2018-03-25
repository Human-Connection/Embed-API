// embeds.model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const embeds = new mongooseClient.Schema({
    url: { type: String, required: true, index: true, unique: true },
    metadata: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
  });

  embeds.index({ url: 1 }, { unique: true });
  embeds.index({ 'metadata.url': 1 });
  embeds.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

  return mongooseClient.model('embeds', embeds);
};
