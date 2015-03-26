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
    QuestionService
      .findById(req.params.id)
      .done(function(question) {
        return res.json(question);
      }, function(error) {
        return res.serverError(error);
      });
  },

  /**
   * Uses the OpenWeather API to get weather JSON
   * @param req
   * @param res
   */
  findWeather: function(req, res) {
    QuestionService
      .findWeather(req.query.location)
      .done(function(weather) {
        return res.json(weather);
      }, function(error) {
        return res.serverError(error);
      });
  }

};

