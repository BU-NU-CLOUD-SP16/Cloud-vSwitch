angular.module('app')
    .service('OrgService', function($http, $location, toastr, endpoint) {

        /**
         * Service list organization
         * Get user's organizations
         * @callback: function to be executed when done
         */
        this.list = function(callback) {
            var userid = localStorage.getItem('userid');
            var token = localStorage.getItem("token");
            $http({
                method: 'GET',
                url: endpoint + '/user/' + userid + '/organizations',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback(response.data)
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        this.get = function(id, callback) {
            var token = localStorage.getItem("token");
            console.log(id);
            $http({
                method: 'GET',
                url: endpoint + '/organization/' + id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback(response.data)
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         * Organization details
         * @org: organization
         * @callback: function to be executed when done
         */
        this.details = function(org) {
            var token = localStorage.getItem("token");
            $http({
                method: 'GET',
                url: endpoint + '/organization/'+org.id+'/details',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                org.status = response.data.server.status;
                org.ip = response.data.server.addresses.MyNetwork[0].addr;
                org.float_ip = response.data.server.addresses.MyNetwork[1].addr;

            }, function errorCallback(response) {

            });
        }

    });
