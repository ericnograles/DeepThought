angular.module('deepThought.constants', [])
    .constant('END_POINTS', {
        search: {
            byActorOrMovie: '/search/byActorOrMovie'
        }
    })
    .constant('STATES', {
        deepThought: {
            default: 'deepThought',
            home: 'deepThought.home'
        }
    })
    .constant("LOGGED_IN_EVENT", "event:loggedIn")
;