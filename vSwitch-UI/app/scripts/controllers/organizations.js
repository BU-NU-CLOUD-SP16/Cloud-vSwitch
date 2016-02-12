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
    
    $scope.add_organization = add_organization;
    $scope.rem_organization = rem_organization;
    
    
    function add_organization() {
      $scope.organizations.push("Organization");
    }
    
    function rem_organization(index) {
      $scope.organizations.splice(index, 1);
    }
    
  });
