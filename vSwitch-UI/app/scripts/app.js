'use strict';

/**
 * @ngdoc overview
 * @name vSwitchUiApp
 * @description
 * # vSwitchUiApp
 *
 * Main module of the application.
 */
angular
  .module('vSwitchUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'toastr'
  ])
  .constant('endpoint', 'http://129.10.3.72:8080')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/',{
        templateUrl:'views/organizations.html',
        controller: 'OrgCtrl'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations.html',
        controller: 'OrgCtrl',
        resolve: {
                authenticated: authenticated
            }
      })
      .when('/instances', {
        templateUrl: 'views/instances.html',
        controller: 'InstanceCtrl',
        resolve: {
                authenticated: authenticated
        }
      })
      .when('/invite', {
        templateUrl: 'views/invite.html',
        controller: 'InvitationCtrl',
        resolve: {
                authenticated: authenticated
        }
      })
      .when('/login',{
        templateUrl:'views/login.html',
        controller: 'SessionCtrl'
      })
      .when('/signup',{
        templateUrl:'views/signup.html',
        controller: 'SessionCtrl'
      })
      .when('/profile',{
        templateUrl:'views/profile.html',
        controller: 'SessionCtrl',
        resolve: {
                authenticated: authenticated
        }
      })
      .otherwise({
        redirectTo: '/',
        resolve: {
                authenticated: authenticated
        }
      });
  });
  
function authenticated ($q, $location, $rootScope) {
    var def = $q.defer();
   if (localStorage.getItem('token') == null || localStorage.getItem('userid') == null){
      $location.path('/login');
      def.reject();
   } else {
     def.resolve('authenticated');
   }
}