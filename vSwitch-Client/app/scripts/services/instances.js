angular.module('app')
    .service('InstanceService', function($http, $location, toastr, endpoint) {

        /**
         * Service list instances
         * Get organization's instances
         * @callback: function to be executed when done
         */
        this.list = function(org, callback) {
            var token = localStorage.getItem("token")
            $http({
                method: 'GET',
                url: endpoint + '/organization/'+org+'/instances',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };


        this.details = function(instance, callback) {
            var token = localStorage.getItem("token");
            $http({
                method: 'GET',
                url: endpoint + '/instance/'+instance.id+'/details',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                instance.status = response.data.server.status;
                instance.ip = response.data.server.addresses.MyNetwork[0].addr;
            }, function errorCallback(response) {
            });
        }
    })
