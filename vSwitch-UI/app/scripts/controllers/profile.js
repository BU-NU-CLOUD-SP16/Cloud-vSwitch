'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('ProfileCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.update = update;
    
    // variables
    $scope.user = {
        name: "Jhon",
        lastname: "Doe",
        email: "jdoe@gmail.com"
    };
    $scope.logged = true;

    function update() {
        $location.path('/organizations');
    }
    
  });
