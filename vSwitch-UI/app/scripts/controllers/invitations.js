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
    
    // Local storage
    $scope.organizations = JSON.parse(localStorage.getItem('organizations'));
    var current = localStorage.getItem("current");
    // Scope variables
    $scope.organization = $scope.organizations[current]
    
    // Scope variables
     $scope.form = {
      emails: [""]
    };
    
    // Scope functions
    $scope.invite = invite;
    $scope.add_invite = add_invite;
    $scope.rem_invitation = rem_invitation;
    
   
    // Functions
    
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
