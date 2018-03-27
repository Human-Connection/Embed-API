
module.exports = function (app) {
  const ProviderDefault = require('./provider.default')(app);
  return class ProviderYouTube extends ProviderDefault {
    constructor (options = {}) {
      options = Object.assign({
        name: 'youtube',
        methods: {
          metaphor: true,
          metascraper: false
        }
      }, options);
      super(options);
      this.regex = /(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})/gi;
    }

    checkURL (url) {
      const match = url.match(this.regex);
      return match && match.length > 1;
    }

    normalizeURL (url) {
      const match = url.match(this.regex);
      if (match && match[1]) {
        url = `https://www.youtube.com/watch?v=${match[1]}`;
      }

      return url;
    }

    enrichMetadata (metadata) {
      return metadata;
    }
  };
};
