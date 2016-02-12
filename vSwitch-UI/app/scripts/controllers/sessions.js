'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('SessionCtrl', function ($scope, $location, SessionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.login = login;
    $scope.signup = signup;
    
    function login() {

        $location.path('/organizations');
    }
    
    function signup() {
        $location.path('/login');
    }
  });
