'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('InvitationCtrl', function ($scope, OrgService, InvitationService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
     get_organization();
     get_organizations();

    // Functions
    
    function get_organization() {
      var id = localStorage.getItem("current");
      OrgService.get(id, function(org) {
        $scope.organization = org;
      })
    }
    
    function get_organizations() {
      OrgService.list(function(orgs) {
        $scope.organizations = orgs;
      })
    }    
    
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
      var org = $scope.organization;
      var emails = $scope.form.emails;
      var msg = $scope.form.msg;
      InvitationService.invite(org, emails);
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
