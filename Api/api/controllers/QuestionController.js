/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Overrides the default findOne blueprint to use caching
   * @param req
   * @param res
   */
  findOne: function(req, res) {
    QuestionService.findOne(req.params.id).done(function(question) {
      return res.json(question);
    }, function(err) {
      return res.serverError(err);
    });
  }

};

