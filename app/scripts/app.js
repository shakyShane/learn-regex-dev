

angular.module('ngRegexApp', [])
    .config(function ($routeProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'ListCtrl'
                })
                .when('/myroute', {
                    templateUrl: 'views/myroute.html',
                    controller: 'MyrouteCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
    });
