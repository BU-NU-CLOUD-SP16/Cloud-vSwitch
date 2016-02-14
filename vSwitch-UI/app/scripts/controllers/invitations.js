'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('InvitationCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.invite = invite;
    $scope.add_invite = add_invite;
    $scope.rem_invitation = rem_invitation;
    
    $scope.form = {
      emails: [""]
    };
    
    $scope.organizations = ["Organization"];
    
    function invite() {
      alert("Invitation sent")
    }
    
    function add_invite() {
      $scope.form.emails.push("");
    }
    
    function rem_invitation(index) {
      $scope.form.emails.splice(index,1);
      
      if ($scope.form.emails.length == 0)
        $scope.form.emails.push("");   
    }
    

  });
