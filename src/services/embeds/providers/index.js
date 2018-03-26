
module.exports = function (app) {
  const ProviderYouTube = require('./provider.youtube')(app);
  const ProviderDefault = require('./provider.default')(app);

  return class Provider {
    constructor (url) {
      // list of possible providers plus the default fallback
      const providers = [
        new ProviderYouTube(),
        new ProviderDefault()
      ];

      // find the matching provider by url
      let outputProvider;
      providers.forEach(provider => {
        if (!outputProvider && provider.checkURL(url)) {
          outputProvider = provider;
          return outputProvider;
        }
      });
      return outputProvider;
    }
  };
};
