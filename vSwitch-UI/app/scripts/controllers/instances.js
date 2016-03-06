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

    // $scope variables
    $scope.code = "";

    // Scope functions
    $scope.add_instance = add_instance;
    $scope.rem_instance = rem_instance;
    $scope.edit_instance = edit_instance;
    $scope.show_code = show_code;
    $scope.start = start;
    $scope.stop = stop;
    
    get_organization();

    // Functions
    
    function get_organization() {
      var id = localStorage.getItem("current");
      OrgService.get(id, function(org) {
        $scope.organization = org;
      })
     
     list_instances(); 
    }
  
    function list_instances() {
      InstanceService.list(function(instances) {
        $scope.instances = instances
      });
    }
    
    function add_instance() {
      var instance = $scope.instance;
      InstanceService.add(instance, list_instances);
      
    }
    

    function rem_instance(index) {
      var instance = $scope.instances[index];
      if (confirm("Are yoy sure you want to delete instance " + $scope.instances[index].name))
         InstanceService.delete(instance, list_instances);
    }

    function edit_instance(index) {
      var instance = $scope.instances[index];
      instance.edit = instance.edit ? false : true;
      if (!instance.edit) 
        InstanceService.update(instance);
    }

    function stop(index) {
        var instance = $scope.instances[index];
        InstanceService.stop(instance);
    }
    
    function start(index) {
        var instance = $scope.instances[index];
        InstanceService.start(instance);
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
