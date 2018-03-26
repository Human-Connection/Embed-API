
module.exports = function (app) {
  return class ProviderYouTube {
    constructor (options = {}) {
      this.app = app;
      this.name = 'youtube';
      this.regex = /(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})/i;
    }

    checkURL (url) {
      return !!url.match(this.regex);
    }

    normalizeURL (url) {
      const match = url.match(this.regex);
      console.log(match);
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
