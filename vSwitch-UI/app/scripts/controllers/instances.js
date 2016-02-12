'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('InstanceCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
    $scope.instances = [0];
    
    $scope.add_instance = add_instance;
    $scope.rem_instance = rem_instance;
    
    
    function add_instance() {
      $scope.instances.push(1);
    }
    
    function rem_instance(index) {
      $scope.instances.splice(index, 1);
    }
  });
