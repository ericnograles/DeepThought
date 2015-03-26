var Q = require('q');

/**
 * This mocks out the ApplicationCache to just go directly against the model instead
 * of relying on the cache to be existent
 * @type {{getObject: Function, setObject: Function}}
 */
module.exports = {
  getObject: function(key, model) {
    var deferred = Q.defer();
    model.findOne({ id: key })
      .exec(function(err, existingModel) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(existingModel);
        }
      });
    return deferred.promise;
  },
  setObject: function(key, model, object) {
    var deferred = Q.defer();
    deferred.resolve();
  }
};
