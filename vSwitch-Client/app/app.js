(function () {
    'use strict';

    angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'ngMessages',
        'toastr'
    ])
        .constant('endpoint', 'http://10.0.0.5:1337')

        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "app/views/login.html",
                })
                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: "app/views/dashboard.html",
                })
                .state('organization', {
                    url: "/organization/:id",
                    templateUrl: "app/views/organization.html",
                })
                .state('os', {
                    url: "/os",
                    templateUrl: "app/views/os.html",
                })
        })
})();
