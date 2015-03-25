var Q = require('q'),
    async = require('async'),
    Sails = require('sails');

module.exports = {

  /**
   * Scaffolds a Sails app with localDiskDb for unit testing purposes
   * @returns {promise.promise|jQuery.promise|promise|d.promise|Q.promise|jQuery.ready.promise}
   */
  scaffoldSails: function() {
    var deferred = Q.defer();

    // Lift sails
    Sails.lift({
      models: {
        connection: 'localDiskDb'
      }
    }, function(err, server) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(server);
      }
    });

    return deferred.promise;
  },

  /**
   * Tears down a given Sails server
   * @param sails
   * @returns {promise.promise|jQuery.promise|promise|d.promise|Q.promise|jQuery.ready.promise}
   */
  teardownSails: function(sails) {
    var deferred = Q.defer();

    // Lower sails
    sails.lower(function finalizeSailsLower(err) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};
