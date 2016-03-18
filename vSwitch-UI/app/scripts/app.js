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
  .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('login', {
          name: 'login',
          url: '/login',
          templateUrl: '../views/login.html',
          controller: 'SessionCtrl',
          resolve: {authenticated: authenticated}
      })
      .state('signup', {
          name: 'signup',
          url: '/signup',
          templateUrl: '../views/signup.html',
          controller: 'SessionCtrl'
      })
      .state('profile', {
          name: 'profile',
          url: '/profile',
          templateUrl: '../views/profile.html',
          resolve: {authenticated: authenticated}
      })
      .state('dashboard', {
          name: 'dashboard',
          url: '/',
          templateUrl: '../views/dashboard.html',
          resolve: {authenticated: authenticated}
      })
      .state('organization', {
          name: 'organization',
          url: '/organization',
          views: {
            '' : {templateUrl: '../views/organization.html',resolve: {authenticated: authenticated}},
            'instances@organization' : {templateUrl: '../views/instances.html', controller: "InstanceCtrl", resolve: {authenticated: authenticated}},
            'settings@organization' : {templateUrl: '../views/settings.html',resolve: {authenticated: authenticated}},
            'uinstaller@organization' : {templateUrl: '../views/uinstaller.html',resolve: {authenticated: authenticated}},
            'sinstaller@organization' : {templateUrl: '../views/sinstaller.html',resolve: {authenticated: authenticated}},
            'invite@organization': {templateUrl: '../views/invite.html', controller: "InvitationCtrl",resolve: {authenticated: authenticated}}
          },
          resolve: {authenticated: authenticated}
      })
    
  })
  
function authenticated ($q, $location, $rootScope) {
    var def = $q.defer();
   if (localStorage.getItem('token') == null || localStorage.getItem('userid') == null){
      $location.path('/login');
      def.reject();
   } else {
     def.resolve('authenticated');
   }
}
