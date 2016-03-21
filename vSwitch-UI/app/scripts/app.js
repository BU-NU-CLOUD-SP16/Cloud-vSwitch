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
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'toastr'
  ])
  .constant('endpoint', 'http://localhost:1337')
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            preventDuplicates: true,
            preventOpenDuplicates: true,
        })
    })
  .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('noauth', {
              templateUrl: "../views/noauth.html",
              abstract: true,
          })
          .state('noauth.login', {
              url: '/login',
              templateUrl: '../views/login.html',
              controller: 'SessionCtrl',
              onEnter: ['$location', authenticated]
          })
          .state('noauth.auth/signup', {
            url: '/signup',
            templateUrl: '../views/signup.html',
            controller: 'SessionCtrl'
        })
          .state('auth', {

              templateUrl: "../views/auth.html",
              abstract: true
          })
          .state('auth.dashboard', {
              url: '/dashboard',
              onEnter: ['$location', authenticated],
              views: {
                  '' : {templateUrl: '../views/dashboard.html'},
                  'organizations@auth.dashboard' : {templateUrl: '../views/organizations.html'},
                  'settings@auth.dashboard': {templateUrl: '../views/dashboard_settings.html'},
                  'profile@auth.dashboard' : {templateUrl: '../views/profile.html'}
              }
          })
          .state('auth.profile', {
              url: '/profile',
              templateUrl: '../views/profile.html',
              onEnter: ['$location', authenticated]
          })
          .state('auth.organization', {
              url: '/organization',
              views: {
                  '' : {templateUrl: '../views/organization.html'},
                  'instances@auth.organization' : {templateUrl: '../views/instances.html', controller: "OrgCtrl"},
                  'settings@auth.organization' : {templateUrl: '../views/settings.html'},
                  'uinstaller@auth.organization' : {templateUrl: '../views/uinstaller.html',controller: "OrgCtrl"},
                  'sinstaller@auth.organization' : {templateUrl: '../views/sinstaller.html'},
                  'invite@auth.organization': {templateUrl: '../views/invite.html', controller: "InvitationCtrl"}
              },
              onEnter: ['$location', authenticated]
          })

    
  })
  
function authenticated ($location) {
        if (localStorage.getItem('token') == null || localStorage.getItem('userid') == null) {
            $location.path("/login");
        }
    }
