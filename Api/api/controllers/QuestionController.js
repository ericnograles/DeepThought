/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  protectedQuestion: function(req, res) {
    return res.json({ message: 'This is a protected question'});
  }

};

