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
    
    
    $scope.instances = [];
    
    $scope.add_instance = add_instance;
    $scope.rem_instance = rem_instance;
    
    
    function add_instance() {
      if (typeof($scope.instance_name) == "undefined" || $scope.instance_name == "") {
        alert("Must type a name for the instance");
        return;
      } else {
        
        //TODO: call service add_organization
        $scope.instances.push($scope.instance_name);
        $scope.instance_name = "" 
      }

    }
    
    function rem_instance(index) {
      if (confirm("Are yoy sure you want to delete instance " + $scope.instances[index]))
        $scope.instances.splice(index, 1);
    }
  });
