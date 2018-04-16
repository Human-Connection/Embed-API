module.exports = function (app) {
  const ProviderDefault = require('./provider.default')(app);
  return class ProviderFlickr extends ProviderDefault {
    constructor (options = {}) {
      options = Object.assign({
        name: 'flickr',
        methods: {
          metaphor: true,
          metascraper: true
        }
      }, options);
      super(options);
      this.regex = /(?:(?:https?:\/\/)(?:www)?\.?(?:flickr)(?:\.com))/gi;
    }

    checkURL (url) {
      return this.regex.test(url);
    }

    normalizeURL (url) {
      return url;
    }

    enrichMetadata (metadata) {
      if (metadata.embed && metadata.embed.url) {
        metadata.image.url = metadata.embed.url;
      }
      return metadata;
    }
  };
};
