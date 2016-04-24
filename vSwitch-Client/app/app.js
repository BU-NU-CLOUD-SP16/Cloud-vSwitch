(function () {
    'use strict';
    var endpoint = "https://cloud-vswitch-api.herokuapp.com";
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
        .constant('endpoint', endpoint)
        .config(function(toastrConfig) {
            angular.extend(toastrConfig, {
                preventDuplicates: true,
                preventOpenDuplicates: true,
            })
        })
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
