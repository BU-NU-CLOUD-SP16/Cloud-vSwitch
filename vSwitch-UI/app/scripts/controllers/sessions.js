'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('SessionCtrl', function ($scope, $location, $rootScope, SessionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    // Scope variables
    $scope.user = {};
    
    // Scope functions
    $scope.login = login;
    $scope.signup = signup;
    
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
          $location.path('/login');
        })
    }
  });
