'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('InstanceCtrl', function($scope, $timeout, $location, OrgService, InstanceService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Local storage
    //$scope.organizations = JSON.parse(localStorage.getItem('organizations'));
    //var current = localStorage.getItem("current");

    // Scope variables
    //$scope.organization = $scope.organizations[current]
    //$scope.instances = $scope.organization.instances;
    $scope.code = "";

    // Scope functions
    $scope.add_instance = add_instance;
    $scope.rem_instance = rem_instance;
    $scope.edit_instance = edit_instance;
    $scope.show_code = show_code;
    
    get_organization();

    // Functions
    
    function get_organization() {
      var id = localStorage.getItem("current");
      OrgService.get(id, function(org) {
        $scope.organization = org
        console.log(org)
      })
     
     list_instances(); 
    }
  
    function list_instances() {
      InstanceService.list(function(instances) {
        $scope.instances = instances
      })
    }
    
    function add_instance() {
      var instance = $scope.instance
      InstanceService.add(instance, list_instances)
      
    }
    

    function rem_instance(index) {
      //if (!$scope.instances[index].ready) return;
      var instance = $scope.instances[index];
      if (confirm("Are yoy sure you want to delete instance " + $scope.instances[index]))
         InstanceService.delete(instance, list_instances);
    }

    function edit_instance(index) {
      var instance = $scope.instances[index];
      instance.edit = instance.edit ? false : true
      if (!instance.edit) 
        InstanceService.update(instance);
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
