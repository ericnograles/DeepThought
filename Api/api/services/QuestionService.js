var Q = require('q'),
    ApplicationCache = require('../cache/ApplicationCache');

/**
 * The QuestionService handles the Question domain model
 * @type {{findOne: Function}}
 */
module.exports = {
  findOne: function(id) {
    var deferred = Q.defer();
    ApplicationCache.getObject(id, Question).done(function(question) {
      deferred.resolve(question);
    }, function(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
};
