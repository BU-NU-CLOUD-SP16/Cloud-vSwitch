'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('SessionCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.login = login;
    $scope.logout = logout;
    $scope.signup = signup;
    $scope.update = update;
    
    // variables
    $scope.user = {};
    $scope.logged = true;

    
    function login() {
        $location.path('/organizations');
    }
    
     function logout() {
        //$scope.logged = false;
        $location.path('/login');
    }
    
    function update() {
        $location.path('/organizations');
    }
    
    function signup() {
        $location.path('/login');
    }
  });
