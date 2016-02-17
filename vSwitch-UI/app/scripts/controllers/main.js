'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('MainCtrl', function($scope, $location, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.logout = logout;
    
    function logout() {
      $rootScope.logged = false;
      //$scope.logged = false;
      $location.path('/login');
    }

  });
