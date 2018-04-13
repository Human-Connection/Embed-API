module.exports = function (app) {
  return class ProviderDefault {
    constructor (options = {}) {
      this.app = app;
      this.imageBaseUrl = `${app.get('baseUrl')}/images?url=`;

      options = Object.assign({
        name: 'default',
        methods: {
          metaphor: true, // this is always needed at the moment
          metascraper: true // this is optional
        }
      }, options);
      this.methods = options.methods;
      this.name = options.name;
    }

    checkURL () {
      return true;
    }

    normalizeURL (url) {
      return url;
    }

    proxyImageUrl (url) {
      url = encodeURIComponent(url);
      return this.imageBaseUrl + url;
    }

    enrichMetadata (metadata) {
      if (metadata.icon && metadata.icon.any) {
        metadata.icon.any = this.proxyImageUrl(metadata.icon.any);
      }

      if (metadata.image && metadata.image.url) {
        metadata.image.url = this.proxyImageUrl(metadata.image.url);
      }

      if (metadata.embed && metadata.embed.type && metadata.embed.type === 'photo') {
        if (!metadata.image) {
          metadata.image = {};
        }
        metadata.image.url = this.proxyImageUrl(metadata.url);
      }

      return metadata;
    }
  };
};
