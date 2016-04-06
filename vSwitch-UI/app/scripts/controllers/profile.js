'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
    .controller('ProfileCtrl', function ($scope, $location, ProfileService) {

      // Scope variables
      getUser();

      // Scope functions
      $scope.update = update;


      function getUser() {
        ProfileService.get(function(user) {
          $scope.user = user;
        })
      }

      // Functions
      function update() {
        ProfileService.update($scope.user, function() {
          $location.path("/");
        });
      }

    });
