'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('ProfileCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    // Scope variables
    $scope.user = JSON.parse(localStorage.getItem("user"));
    $scope.logged = true;
    
    // Scope functions
    $scope.update = update;
    
    // Functions
    function update() {
        localStorage.setItem('user', JSON.stringify($scope.user));
        $location.path('/organizations');
    }
    
  });
