'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('InstanceCtrl', function($scope, $timeout, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Local storage
    $scope.organizations = JSON.parse(localStorage.getItem('organizations'));
    var current = localStorage.getItem("current");

    // Scope variables
    $scope.organization = $scope.organizations[current]
    $scope.instances = $scope.organization.instances;
    $scope.code = "";

    // Scope functions
    $scope.add_instance = add_instance;
    $scope.rem_instance = rem_instance;
    $scope.edit_instance = edit_instance;
    $scope.show_code = show_code;

    // Functions

    function add_instance() {
      //TODO: call service add_organization
      $scope.instances.push({name: $scope.instance_name, ready: false});
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
      $scope.instance_name = ""
      
      var index = $scope.instances.length - 1;
      $timeout(function () {add_instance_complete(index)}, 3000);
    }
    
    function add_instance_complete(index) {
      $scope.instances[index].ready = true;
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
      
    }

    function rem_instance(index) {
      
      if (!$scope.instances[index].ready) return;
      
      if (confirm("Are yoy sure you want to delete instance " + $scope.instances[index]))
        $scope.instances.splice(index, 1);
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
    }

    function edit_instance(index) {

      localStorage.setItem('organizations', JSON.stringify($scope.organizations));

      //TODO: call service edit_organization  
    }

    function show_code() {
      if ($scope.code == "") {
        $scope.code = $scope.organization.code;
      }
      else {
        $scope.code = "";
      }
    }
    
  });
