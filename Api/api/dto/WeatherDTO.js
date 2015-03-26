var _ = require('lodash'),
  Q = require('q');

/**
 * The WeatherDTO
 * @constructor
 */
function WeatherDTO() {
};

WeatherDTO.prototype.fromDomain = function(domainObject) {
  var self = this;
  _.each(Object.keys(domainObject), function(property) {
    self[property] = _.cloneDeep(domainObject[property]);
  });
  self.origin = 'DTO';
};

module.exports = WeatherDTO;
