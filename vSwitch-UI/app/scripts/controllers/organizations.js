'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('OrgCtrl', function($scope, $rootScope, $location, $timeout, OrgService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    


    // Local Storage
    $scope.organizations = localStorage.getItem('organizations') == null ? [] : JSON.parse(localStorage.getItem('organizations'));

    // Scope variables
    $scope.organization = {};

    // Scope functions
    $scope.add_organization = add_organization;
    $scope.join_organization = join_organization;
    $scope.rem_organization = rem_organization;
    $scope.edit_organization = edit_organization;
    $scope.view_instances = view_instances;

    list_organizations();
    
 
    // Functions

    function list_organizations() {
      OrgService.list(function(orgs) {
        $scope.organizations = orgs;
      })
    }    

    function add_organization() {

      //TODO: call service add_organization
  
      OrgService.add($scope.organization, list_organizations)
      //$scope.organization.code = "";
    }
    

    function join_organization() {

      var code = $scope.code;
      OrgService.join(code, list_organizations);
      $scope.code = "";

      /**
      //TODO: Call service join_organization(code) 
      $scope.organizations.push({
        name: "Organization",
        instances: [],
        code: "MYCODE",
        ready: false
      });
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
      $scope.organization.code = ""

      var index = $scope.organizations.length - 1;
      $timeout(function () {add_organization_complete(index)}, 2000);
      **/
      
    }

    function edit_organization(index) {
      var organization = $scope.organizations[index];
      organization.edit = organization.edit ? false : true
      if (!organization.edit)
        OrgService.update(organization);

      //localStorage.setItem('organizations', JSON.stringify($scope.organizations));

      //TODO: call service edit_organization  
    }

    function rem_organization(index) {
      //if (!$scope.organizations[index].ready) return;
      
      if (confirm("Are you sure you want to remove " + $scope.organizations[index])) {
        var organization = $scope.organizations[index];
        OrgService.delete(organization, list_organizations);
      }
    }

    function view_instances(index) {
      //TODO: Fix later
      localStorage.setItem('current', $scope.organizations[index].id);
      $location.path('/instances');
    }

  });
