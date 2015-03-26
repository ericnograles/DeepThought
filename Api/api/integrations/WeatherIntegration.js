var _ = require('lodash'),
    Q = require('q')
    http = require('http'),
    WeatherObject = require('../domain/Weather');

module.exports = {
  findWeatherBySearchString: function(searchString) {
    var deferred = Q.defer();
    var options = {
      method: 'GET',
      hostname: 'api.openweathermap.org',
      path: '/data/2.5/weather?q=' + searchString,
      port: 80
    };

    // Call out to the weather service
    var req = http.request(options, function(res) {
      var responseString = '';
      if (res.statusCode !== 200) {
        deferred.reject();
      }

      // Get the data
      res.on('data', function(data) {
        responseString += data;
      });

      // Process the results
      res.on('end', function() {
        var weatherData = JSON.parse(responseString),
            weatherObject = new WeatherObject();

        weatherObject.fromEntity(weatherData);
        deferred.fulfill(weatherObject);
      });
    });
    req.end();

    req.on('error', function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }
};

