/**
 * Integration with the BigBluster API (aka the /Server Sails.js project)
 * Awesomeness shall happen here!...
 */
angular.module('deepThought.services.question',
    [
        'deepThought.constants',
        'deepThought.config'
    ])
    .factory('questionService', function ($q, $http, $log, END_POINTS, ENVIRONMENT) {
        var apiRoot = ENVIRONMENT.API_ROOT;

        /**
         * Asks the Deep Thought API a question
         * @param text
         * @returns {Deferred}
         */
        var askQuestion = function(text) {
            var url = apiRoot + '/question';
            var deferred = $q.defer();

            $http({
                method: 'POST',
                data: { text: text },
                url: url,
                cache: false
            })
                .success(function(question) {
                    deferred.resolve(question);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject('Oh noes!');
                });


            return deferred.promise;
        };

        /**
         * Finds questions from DeepThought
         * @returns {Deferred}
         */
        var findQuestions = function() {
            var url = apiRoot + '/question';
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: url,
                cache: false
            })
                .success(function(questions) {
                    deferred.resolve(questions);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject('Oh noes!');
                });

            return deferred.promise;
        };

        return {
            askQuestion: askQuestion,
            findQuestions: findQuestions
        };
    })
;