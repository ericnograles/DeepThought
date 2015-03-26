var async = require('async'),
    assert = require('assert'),
    _ = require('lodash'),
    Q = require('q'),
    proxyquire = require('proxyquire'),
    ApplicationCache = require('../mocks/MockApplicationCache'),
    Sails = require('sails'),
    TestHelper = require('../helpers/TestHelper'),
    QuestionService,
    sails;

describe('Question Service', function() {

  var mockQuestionId;

  // Scaffold all supporting objects
    before(function(done) {
      async.waterfall([
        function scaffoldSails(callback) {
          TestHelper
            .scaffoldSails()
            .then(function(sailsServer) {
              sails = sailsServer;
              callback();
            }, function(error) {
              callback(error);
            });
        },
        function mockApplicationCache(callback) {
          QuestionService = proxyquire('../../api/services/QuestionService', { '../cache/ApplicationCache': ApplicationCache });
          callback()
        },
        function createSampleQuestion(callback) {
          Question
            .create({
              text: 'A unit testable question',
              userName: 'eric.nograles'
            })
            .exec(function(err, question) {
              mockQuestionId = question.id;
              callback(err);
            });
        }
      ], function finalizeScaffolding(err) {
        done(err);
      });
    });

  it('should find a specific Question', function(done) {
    QuestionService
      .findOne(mockQuestionId)
      .done(function(question) {
        assert(!_.isUndefined(question));
        assert(question.id === mockQuestionId);
        done();
      }, function(error) {
        done(error);
      })
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
