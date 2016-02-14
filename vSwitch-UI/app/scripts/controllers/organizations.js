'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('OrgCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
    $scope.organizations = [];
    $scope.organization  = {};
    
    $scope.add_organization  = add_organization;
    $scope.join_organization = join_organization;
    $scope.rem_organization  = rem_organization;
    $scope.edit_organization = edit_organization;
    
    
    
    
    function add_organization() {
      if (typeof($scope.organization.name) == "undefined" || $scope.organization.name == "") {
        alert("Must type a name for the organization");
        return;
      } else {
        
        //TODO: call service add_organization
        $scope.organizations.push($scope.organization.name);
        $scope.organization.name = "" 
      }
    }
    
    function join_organization() {
      if (typeof($scope.organization.code) == "undefined" || $scope.organization.code == "") {
        alert("Must type an Invitation code");
        return;
      } else {
        var code = $scope.organization.code;
        
        //TODO: Call service join_organization(code) 
        $scope.organizations.push("Organization");
        $scope.organization.code = "" 
      }
    }
    
    function edit_organization(index) {
      $scope.edit = !$scope.edit
      alert('edit')
      
      //TODO: call service edit_organization  
    }
    
    function rem_organization(index) {
      if (confirm("Are you sure you want to remove " + $scope.organizations[index])) 
        $scope.organizations.splice(index, 1);
    }
    
  });
