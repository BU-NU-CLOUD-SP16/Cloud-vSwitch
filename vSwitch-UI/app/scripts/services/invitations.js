angular.module('vSwitchUiApp')
    .service('InvitationService', function($http, $location, toastr, endpoint) {
    
        /*
         ** Service invite
         ** @org: instance object
         ** @emails: emails
         ** @callback: function to be executed
         **/
        this.invite = function(org, emails, callback) {
            var token = localStorage.getItem("token");
            var data = {
                organization: org,
                emails: emails
            };
            $http({
                method: 'POST',
                url: endpoint + '/invite',
                data: data,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Invitation sent");
                $location.path('/');
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
    })