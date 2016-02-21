angular.module('vSwitchUiApp')
    .service('SessionService', function($http, $location) {

    var endpoint = 'http://129.10.3.72:8080';
    this.signup = function(user) {
        // Call api/signup

        $http({
            method: 'POST',
            url: endpoint + '/signup/',
            data: user
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            localStorage.setItem("token", response.data.token)
            $location.path('/login')
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert('Wrong')
        });
    };
    
    this.login = function(user, callback) {
        var token = localStorage.getItem("token")
        $http({
            method: 'POST',
            url: endpoint + '/login',
            data: user,
            headers: {
                'Authorization': "Bearer " + token
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userid", response.data.user.id)
            localStorage.setItem("username", response.data.user.name)
            callback();
            $location.path('/organizations')
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert('Wrong email or password')
        });
    } 
});