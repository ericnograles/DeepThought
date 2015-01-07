angular.module('deepThought.home', [
    'ui.router',
    'deepThought.constants',
    'toaster'
])
    .config(function($stateProvider, STATES) {
        $stateProvider
            .state(STATES.deepThought.default, {
                abstract: true,
                templateUrl: 'templates/deepThought.main.tpl.html'
            })
            .state(STATES.deepThought.home, {
                url: '/home',
                views: {
                    'search': {
                        templateUrl: 'home/home.search.tpl.html',
                        controller: 'SearchCtrl'
                    }
                },
                resolve: {
                    questions: function(questionService) {
                        return questionService.findQuestions();
                    }
                }
            });
    })

    .controller('SearchCtrl', function($scope, $http, $log, questions) {
        $log.info('SearchCtrl');
        $scope.searchText = null;
        $scope.searchResult = null;
        $scope.createdMovie = null;
        $scope.questions = [];
        // Socket.io Subscriber
        try {
            var sockets = io.connect('http://localhost:1337/');
            sockets.on('question:created', function (question) {
                // TODO: deepThoughtResponse
            });
        }
        catch (err){
            console.log(err);
        }

        $scope.askDeepThought = function() {
            $scope.deepThoughtResponse = $scope.searchText +  ' I\'ll have to give that some thought. Come back later.';
            $scope.questions.push({ text: $scope.searchText, date: new Date()});
        };
    })
;

