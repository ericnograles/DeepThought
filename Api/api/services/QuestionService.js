var Q = require('q'),
    ApplicationCache = require('../cache/ApplicationCache'),
    QuestionRepository = require('../repositories/QuestionRepository');

/**
 * The QuestionService handles the Question domain model
 * @type {{findOne: Function}}
 */
module.exports = {
  findById: function(id) {
    var deferred = Q.defer();

    // Use the repository
    QuestionRepository
      .findById(id)
      .done(function(questionEntity) {
        deferred.resolve(questionEntity);
      }, function(error) {
        deferred.reject(error);
      });

    return deferred.promise;
  }
};
