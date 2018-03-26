
module.exports = function (app) {
  const ProviderYouTube = require('./provider.youtube')(app);
  const ProviderDefault = require('./provider.default')(app);

  return class Provider {
    constructor (url) {
      const providers = [
        new ProviderYouTube(),
        new ProviderDefault()
      ];
      let outputProvider;
      providers.forEach(provider => {
        if (!outputProvider && provider.checkURL(url)) {
          console.log(provider.name);
          outputProvider = provider;
          return outputProvider;
        }
      });
      return outputProvider;
    }
  };
};
