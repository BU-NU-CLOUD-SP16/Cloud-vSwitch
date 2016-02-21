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
    $scope.update = update;
    
   
    // Functions

    // TODO: alert when wrong
    function login() {
      var user = $scope.user;
      SessionService.login(user, function() {
        $rootScope.logged = true;
      })
    }
    
    function update() {
        localStorage.setItem('user', JSON.stringify($scope.user));
        $location.path('/organizations');
    }
    
    // TODO: alert when wrong
    function signup() {
        console.log($scope.user);
        var user = $scope.user;
        SessionService.signup(user)
    }
  });
