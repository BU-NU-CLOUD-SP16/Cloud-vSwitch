'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('OrgCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
    $scope.organizations = localStorage.getItem('organizations') == null ? []: JSON.parse(localStorage.getItem('organizations'));
    $scope.organization  = {};
    
    $scope.add_organization  = add_organization;
    $scope.join_organization = join_organization;
    $scope.rem_organization  = rem_organization;
    $scope.edit_organization = edit_organization;
    $scope.view_instances    = view_instances;
    
    $scope.installer = installer;
    
    
    
    
    function add_organization() {
      if (typeof($scope.organization.name) == "undefined" || $scope.organization.name == "") {
        alert("Must type a name for the organization");
        return;
      } else {
        
        //TODO: call service add_organization
  
        $scope.organizations.push({name:$scope.organization.name, instances:[], code: "MYCODE"});
        localStorage.setItem('organizations', JSON.stringify($scope.organizations));
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
        $scope.organizations.push({name:"Organization", instances:[], code: "MYCODE"});
        localStorage.setItem('organizations', JSON.stringify($scope.organizations));
        $scope.organization.code = "" 
      }
    }
    
    function edit_organization(index) {

      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
      
      //TODO: call service edit_organization  
    }
    
    function rem_organization(index) {
      if (confirm("Are you sure you want to remove " + $scope.organizations[index])) 
        $scope.organizations.splice(index, 1);
        
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
    }
    
    function view_instances(index) {
      localStorage.setItem('current', index);
      $location.path('/instances'); 
    }
    
    function installer() {
      alert("Downloading installer")
      
    }
    
  });
