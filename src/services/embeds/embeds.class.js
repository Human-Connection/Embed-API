/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const mongoose = require('mongoose');

const Metaphor = require('metaphor');
const engine = new Metaphor.Engine({
  preview: false,
  tweet: true
});

const getMetadata = (url) => {
  return new Promise((resolve) => {
    engine.describe(url, (metadata) => {
      resolve(metadata);
    });
  });
};

class Service {
  constructor (options) {
    this.options = options || {};
    this.app = options.app;
    this.embeds = mongoose.model('embeds');
  }

  async find (params) {
    let url = params.query.url;
    url = url.replace(/\/+$/, '');
    if (url.indexOf('://') < 0) {
      url = `http://${url}`;
    }

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
    let metadata = await getMetadata(url);

    if (!metadata.sources) {
      throw new errors.NotFound('no data found for url');
    }

    await this.embeds.create({
      url,
      metadata
    });

    // 3. return cached or fresh metadata
    return metadata;
  }

  async get (id, params) {
    throw errors.NotImplemented();
  }

  async create (data, params) {
    throw errors.NotImplemented();

    // if (Array.isArray(data)) {
    //   return await Promise.all(data.map(current => this.create(current)));
    // }
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
