/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const mongoose = require('mongoose');
const { URL } = require('url');
const metascraper = require('metascraper').load([
  require('metascraper-date')(),
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-image')()
]);
const got = require('got');

const getMetadata = async (targetURL, Provider) => {
  const data = {
    metascraper: {}
  };

  // only get data from requested services
  let promises = [];
  if (Provider.methods.metascraper) {
    promises.push(new Promise(async (resolve, reject) => {
      try {
        let metadata = {};
        const head = await got.head(targetURL);
        if (head.headers['content-type'].indexOf('text') < 0) {
          if (head.headers['content-type']) {
            metadata.overwrite = {
              type: head.headers['content-type'].split('/').shift(),
              contentType: head.headers['content-type']
            };
          }
        } else {
          const { body: html, url } = await got(targetURL);
          metadata = await metascraper({ html, url });
        }

        data.metascraper = metadata;
        resolve(data);
      } catch (err) {
        resolve({err});
      }
    }));
  }

  await Promise.all(promises);

  // TODO: Figure out why all of this conditionals, and check what can be removed.
  if (!data.metascraper) {
    return data.metaphor;
  }

  if (data.metascraper && data.metascraper.overwrite) {
    data.metaphor = Object.assign(data.metaphor, data.metascraper.overwrite);
    delete data.metascraper.overwrite;
  }

  if (data.metascraper.title && data.metaphor.title !== data.metaphor.description) {
    data.metaphor.title = data.metascraper.title;
  }
  if (data.metascraper.description) {
    data.metaphor.description = data.metascraper.description;
  }
  if (data.metascraper.date) {
    data.metaphor.date = data.metascraper.date;
  }
  return data.metascraper;
};

class Service {
  constructor (options) {
    this.options = options || {};
    if (!options.app) {
      throw new Error('embeds services missing option.app');
    }
    this.app = options.app;
    this.embeds = mongoose.model('embeds');
    this.Provider = require('./providers')(this.app);
  }

  async find (params) {
    let url = params.query.url;
    url = url.replace(/\/+$/, '');
    if (url.indexOf('://') < 0) {
      url = `https://${url}`;
    }
    const Provider = new this.Provider(url);
    url = Provider.normalizeURL(url);
    // 1. check if there is already metadata
    let embed = await this.embeds.findOne({
      $or: [
        { url: url },
        { url: `${url}/` },
        { 'metadata.url': url },
        { 'metadata.url': `${url}/` }
      ]
    });
    if (embed) {
      return embed.metadata;
    }

    // 2. if not or not older then x minutes, get fresh data and save it to the database
    let metadata = await getMetadata(url, Provider);
    try {
      metadata = Provider.enrichMetadata(metadata);
    } catch (err) {
      return err;
    }

    if (!metadata.title && !metadata.site_name) {
      throw new errors.NotFound('no data found for url');
    }

    try {
      await this.embeds.create({
        url,
        metadata
      });
    } catch (err) {
      return err;
    }

    // 3. return cached or fresh metadata
    return metadata;
  }

  async get (id, params) {
    throw errors.NotImplemented();
  }

  async create (data, params) {
    throw errors.NotImplemented();
  }

  async update (id, data, params) {
    throw errors.NotImplemented();
  }

  async patch (id, data, params) {
    throw errors.NotImplemented();
  }

  async remove (id, params) {
    throw errors.NotImplemented();
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
