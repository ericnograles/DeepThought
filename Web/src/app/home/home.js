angular.module('deepThought.home', [
    'ui.router',
    'deepThought.constants',
    'toaster',
    'btford.socket-io'
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

    .controller('SearchCtrl', function($scope, $http, $log, socketFactory, questionService, questions) {
        $log.info('SearchCtrl');
        $scope.searchText = null;
        $scope.searchResult = null;
        $scope.createdMovie = null;
        $scope.questions = questions;
        // Socket.io Subscriber
        try {
            var sockets = io.connect('http://localhost:1337/');
            sockets.on('question:created', function(question) {
                var matchingQuestion = _.find($scope.questions, function(existingQuestion){
                    return existingQuestion.text === question.text;
                });
                if (_.isUndefined(matchingQuestion)) {
                    $scope.questions.push(question);
                    $scope.$apply();
                }
            });
        }
        catch (err){
            console.log(err);
        }

        /**
         * Asks DeepThought a question
         */
        $scope.askDeepThought = function() {
            questionService.askQuestion($scope.searchText).then(function(question){
                $scope.deepThoughtResponse = $scope.searchText +  ' I\'ll have to give that some thought. Come back later.';
                var matchingQuestion = _.find($scope.questions, function(existingQuestion){
                    return existingQuestion.text === question.text;
                });
                if (_.isUndefined(matchingQuestion)) {
                    $scope.questions.push({ text: question.text, createdAt: question.createdAt });
                }
            },
            function(err){
                $scope.deepThoughtResponse = 'Error accessing Deep Thought. Come back later.';
            });

        };
    })
;

