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
      this.regex = /(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})&(start=.*[0-9])/gi;
    }

    checkURL (url) {
      this.match = this.regex.exec(url);
      return this.match && this.match.length > 1;
    }

    normalizeURL (url) {
      if (this.match && this.match[1] && this.match[2]) {
        url = `https://www.youtube.com/watch?v=${this.match[1]}&${this.match[2]}`;
      } else {
        url = `https://www.youtube.com/watch?v=${this.match[1]}`;
      }

      return url;
    }

    enrichMetadata (metadata) {
      if (metadata.thumbnail && metadata.thumbnail.url && !metadata.image) {
        metadata.image = {
          url: metadata.thumbnail.url
        };
      }
      return metadata;
    }
  };
};
