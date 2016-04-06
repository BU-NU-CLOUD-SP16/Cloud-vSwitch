angular.module('vSwitchUiApp')
    .service('ProfileService', function($http, $location, toastr, endpoint) {

        /**
         * Service get user
         * Get user by id
         * @callback: function to be executed when done
         **/
        this.get = function(callback) {
            var token = localStorage.getItem("token");
            var id = localStorage.getItem("userid");
            $http({
                method: 'GET',
                url: endpoint + '/user/' + id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         * Service update user
         * Update user by id
         * @user: organization object
         * @callback: function to be executed when done
         **/
        this.update = function(user, callback) {
            var token = localStorage.getItem("token");
            var userid = localStorage.getItem("userid");
            $http({
                method: 'PUT',
                url: endpoint + '/user/' + userid,
                data: user,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Profile updated");
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
    })