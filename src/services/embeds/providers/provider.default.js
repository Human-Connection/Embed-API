module.exports = function (app) {
  return class ProviderDefault {
    constructor (options = {}) {
      this.app = app;

      options = Object.assign({
        name: 'default',
        methods: {
          metaphor: true, // this is always needed at the mement
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

    enrichMetadata (metadata) {
      const truncate = require('lodash/truncate');

      if (metadata.url && (!metadata.embed || !metadata.embed.html || app.get('embedTypeWhitelist').indexOf(metadata.embed.type) < 0)) {
        const embedTemplate = `
          <a href="${metadata.url}" target="_blank" class="embed-link">
            <span class="embed-description">
              ${truncate(metadata.description, { length: 256 })}<br />
              ${(metadata.icon) ? `<img class="embed-logo" src="${metadata.icon.any}" />` : ''}
              <small class="embed-publisher">${metadata.site_name || truncate(metadata.url, { length: 64 })}</small>
            </span>
            <img class="embed-image" src="${metadata.image.url}" />
          </a>`;
        metadata.embed = Object.assign(metadata.embed || {}, {
          type: 'link',
          html: embedTemplate.replace(/\s{2,}/igm, '')
        });
      }
      return metadata;
    }
  };
};
