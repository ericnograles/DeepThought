var Q = require('q'),
  async = require('async'),
  cache_manager = require('cache-manager'),
  redis_store = require('./redis_store'),
  redis_connection = require('../../config/connections').connections.redisApplicationCache,
  ttl = 100,
  redis_cache = cache_manager.caching({ store: redis_store.create(redis_connection), db: 2, ttl: ttl });

/**
 * The ApplicationCache serves as a cross-cutting concern
 * @type {{}}
 */
module.exports = {

  /**
   * Retrieves an object either from the cache or MongoDB
   * @param key
   * @param model
   */
  getObject: function(key, model) {
    var deferred = Q.defer();
    redis_cache.wrap(model.adapter.collection + '_' + key, function(callback) {
      model.findOne({ id: key })
        .exec(function(err, existingModel) {
          callback(err, existingModel);
        });
    }, ttl, function(err, existingModel) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(existingModel);
      }
    });
    return deferred.promise;
  },

  /**
   * Sets an object value in the cache
   * @param key
   * @param model
   * @param object
   */
  setObject: function(key, model, object) {
    var deferred = Q.defer();
    redis_cache.set(model.adapter.collection + '_' + key, object, ttl, function(err) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(object);
      }
    });
    return deferred.promise;
  }

};
