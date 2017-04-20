
(function () {
    'use strict';
    
    var _templateBase = './scripts';
    
    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: _templateBase + '/views/login.html' ,
                // controller: 'treeIndexController',
                // controllerAs: '_ttrl'
            })
            .when('/index', {
                // templateUrl: _templateBase + '/customer/customer.html' ,
                // controller: 'customerController',
                // controllerAs: '_ctrl'
                templateUrl: _templateBase + '/views/treeIndex.html' ,
                controller: 'treeIndexController',
                controllerAs: '_ttrl'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);

})();