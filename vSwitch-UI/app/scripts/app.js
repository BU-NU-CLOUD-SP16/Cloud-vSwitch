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
    'ngMessages'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/',{
        templateUrl:'views/organizations.html',
        controller: 'OrgCtrl'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations.html',
        controller: 'OrgCtrl'
      })
      .when('/instances', {
        templateUrl: 'views/instances.html',
        controller: 'InstanceCtrl'
      })
      .when('/invite', {
        templateUrl: 'views/invite.html',
        controller: 'InvitationCtrl'
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
        controller: 'SessionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
