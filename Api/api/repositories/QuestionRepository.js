var _ = require('lodash'),
  Q = require('q'),
  ApplicationCache = require('../cache/ApplicationCache'),
  QuestionObject = require('../domain/Question');

module.exports = {
  findById: function(id) {
    var deferred = Q.defer();

    // You can swap out the below with whatever ORM operations
    // should you not want to use Waterline
    ApplicationCache.getObject(id, Question).done(function(entity) {
      var questionObject = new QuestionObject();
      questionObject.fromEntity(entity);
      deferred.resolve(questionObject);
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }
};
