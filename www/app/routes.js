define([
    'app',
    'controllers/HomeController'
], function (app) {
    'use strict';
    // definition of routes
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: "/home",
                    cache: false,
                    controller: 'HomeController',
                    templateUrl: "templates/home.html"
                })
            
        }
    ]);

});
