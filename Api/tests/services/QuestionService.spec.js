var async = require('async'),
    assert = require('assert'),
    _ = require('lodash'),
    Sails = require('sails'),
    QuestionService = require('../../api/services/QuestionService'),
    sails;

describe('QuestionService', function() {

    before(function(done) {
      // Scaffold all supporting objects
      async.waterfall([
        function scaffoldSails(callback) {
          Sails.lift({
            models: {
              connection: 'localDiskDb'
            }
          }, function(err, server) {
            sails = server;
            callback(err);
          })
        },
        function createSampleQuestion(callback) {
          Question
            .create({
              text: 'A unit testable question',
              userName: 'eric.nograles'
            })
            .exec(function(err, question) {
              callback(err);
            });
        }
      ], function(err) {
        done(err);
      });
    });

  it('should find a specific Question', function(done) {
    Question
      .find({ userName: 'eric.nograles' })
      .exec(function(err, questions) {
        assert(!_.isUndefined(questions));
        _.each(questions, function(question) {
          assert(question.userName === 'eric.nograles');
        });
        done();
      });
  });

  after(function(done) {
    async.waterfall([
      function destroyQuestions(callback) {
        Question.destroy(function(err) {
          callback(err);
        });
      },
      function lowerSails(callback) {
        sails.lower(callback);
      }
    ], function(err) {
      done(err);
    });
  });

});
