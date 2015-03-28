var Q = require('q'),
    QuestionRepository = require('../repositories/QuestionRepository'),
    WeatherIntegration = require('../integrations/WeatherIntegration'),
    QuestionDTO = require('../dto/QuestionDTO'),
    WeatherDTO = require('../dto/WeatherDTO');

/**
 * The QuestionService handles the Question domain model
 * @type {{findOne: Function}}
 */
module.exports = {
  findById: function(id) {
    var deferred = Q.defer();

    // Use the repository
    QuestionRepository
      .findById(id)
      .done(function(question) {
        var questionDto = new QuestionDTO();
        questionDto.fromDomain(question);
        deferred.resolve(questionDto);
      }, function(error) {
        deferred.reject(error);
      });

    return deferred.promise;
  },

  findWeather: function(searchString) {
    var deferred = Q.defer();

    WeatherIntegration
      .findWeatherBySearchString(searchString)
      .done(function(weather) {
        var weatherDto = new WeatherDTO();
        weatherDto.fromDomain(weather);
        deferred.fulfill(weatherDto);
      }, function(error) {
        deferred.reject(error);
      });

    return deferred.promise;
  }
};
