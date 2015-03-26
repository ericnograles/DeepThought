var _ = require('lodash'),
  Q = require('q');

/**
 * A POJSO domain of the Weather object
 * @constructor
 */
function Weather() {

};

Weather.prototype.fromEntity = function(entity) {
  var self = this;
  _.each(Object.keys(entity), function(property) {
    self[property] = _.cloneDeep(entity[property]);
  });
};

module.exports = Weather;
