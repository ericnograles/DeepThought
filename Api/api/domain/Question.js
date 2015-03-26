var _ = require('lodash'),
    Q = require('q');

/**
 * A POJSO domain of the Question object
 * @constructor
 */
function Question() {
  this.id = null;
  this.text = null;
  this.askedBy = null;
  this.createdAt = null;
};

Question.prototype.fromEntity = function(entity) {
  var self = this;
  _.each(Object.keys(entity), function(property) {
    self[property] = _.cloneDeep(entity[property]);
  });
};

module.exports = Question;
