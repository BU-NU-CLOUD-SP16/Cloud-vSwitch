'use strict';

angular.module('vSwitchUiApp')
    .controller('SessionCtrl', function ($scope, $location, $rootScope, SessionService) {

      // Scope variables
      $scope.user = {};

      // Scope functions
      $scope.login = login;
      $scope.signup = signup;
      $scope.logout = logout;

      // Functions
      function login() {
        var user = $scope.user;
        SessionService.login(user, function() {
          $location.path("/dashboard");
          $rootScope.logged = true;
        })
      }

      function signup() {
        var user = $scope.user;
        SessionService.signup(user, function() {
          $location.path('/dashboard');
        })
      }

      function logout() {
        $location.path('/login');
        localStorage.clear();
      }
    });
