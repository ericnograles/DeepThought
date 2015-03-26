var _ = require('lodash'),
  Q = require('q');

/**
 * The QuestionDTO
 * @constructor
 */
function QuestionDTO() {
  this.id = null;
  this.text = null;
  this.askedBy = null;
  this.createdAt = null;
};

QuestionDTO.prototype.fromDomain = function(domainObject) {
  var self = this;
  _.each(Object.keys(domainObject), function(property) {
    self[property] = _.cloneDeep(domainObject[property]);
  });
  self.origin = 'DTO';
};

module.exports = QuestionDTO;
