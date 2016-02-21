angular.module('vSwitchUiApp')
    .service('ProfileService', function($http, $location) {

    var endpoint = 'http://129.10.3.72:8080';
    
    this.get = function(callback) {

            var token = localStorage.getItem("token")
            var userid = localStorage.getItem("userid")
            $http({
                method: 'GET',
                url: endpoint + '/user/'+userid,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                callback(response.data);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Wrong')
            });
        }
    
    this.update = function(user) {
        var token = localStorage.getItem("token")
            var userid = localStorage.getItem("userid")
            $http({
                method: 'PUT',
                url: endpoint + '/user/'+userid,
                data: user,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                $location.path('/');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Wrong')
            });
    }
    
    })