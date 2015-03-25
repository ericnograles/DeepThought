var async = require('async'),
    assert = require('assert'),
    _ = require('lodash'),
    Sails = require('sails'),
    QuestionService = require('../../api/services/QuestionService'),
    TestHelper = require('../helpers/TestHelper'),
    sails;

describe('Question Service', function() {

  // Scaffold all supporting objects
    before(function(done) {
      async.waterfall([
        function scaffoldSails(callback) {
          TestHelper
            .scaffoldSails()
            .then(function(sailsServer) {
              sails = sailsServer;
              done();
            }, function(error) {
              callback(error);
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
      ], function finalizeScaffolding(err) {
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

  // Teardown all supporting objects
  after(function(done) {
    async.waterfall([
      function destroyQuestions(callback) {
        Question.destroy(function(err) {
          callback(err);
        });
      },
      function lowerSails(callback) {
        TestHelper
          .teardownSails(sails)
          .then(function() {
            callback();
          }, function(error) {
            done(callback(error));
          })
      }
    ], function finalizeTeardown (err) {
      done(err);
    });
  });

});
