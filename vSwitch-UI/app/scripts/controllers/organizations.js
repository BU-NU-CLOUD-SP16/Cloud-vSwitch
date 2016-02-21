'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('OrgCtrl', function($scope, $rootScope, $location, $timeout, OrgService, toastr) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
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
      OrgService.add($scope.organization, list_organizations);
    }
    

    function join_organization() {
      var code = $scope.code;
      OrgService.join(code, list_organizations);
      $scope.code = "";
    }

    function edit_organization(index) {
      var organization = $scope.organizations[index];
      organization.edit = organization.edit ? false : true;
      if (!organization.edit)
        OrgService.update(organization);
    }

    function rem_organization(index) {

      if (confirm("Are you sure you want to remove " + $scope.organizations[index])) {
        var organization = $scope.organizations[index];
        OrgService.delete(organization, list_organizations);
      }
    }

    function view_instances(index) {
      localStorage.setItem('current', $scope.organizations[index].id);
      $location.path('/instances');
    }
  });
