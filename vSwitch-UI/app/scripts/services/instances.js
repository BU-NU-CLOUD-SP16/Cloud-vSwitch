angular.module('vSwitchUiApp')
    .service('InstanceService', function($http, $location) {
        var endpoint = 'http://129.10.3.72:8080';
    
         this.add = function(instance, callback) {

            var token = localStorage.getItem("token")
            instance.organization = localStorage.getItem("current")
            $http({
                method: 'POST',
                url: endpoint + '/instance',
                data: instance,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {

                add_helper(response.data, callback);
            }, function errorCallback(response) {

                alert('Wrong')
            });
        }
        
        function add_helper(instance, callback) {
            var token = localStorage.getItem("token")
            var orgid = localStorage.getItem('current');
            $http({
                method: 'POST',
                url: endpoint + '/organization/'+orgid+'/instances/'+ instance.id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback();
            }, function errorCallback(response) {
                alert('Wrong')
            });
        }
        
        this.list = function(callback) {
            var token = localStorage.getItem("token")
            var orgid = localStorage.getItem("current")
            $http({
                method: 'GET',
                url: endpoint + '/organization/'+orgid+'/instances',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response.data)
                callback(response.data)
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Wrong')
            });
        }
        
        this.update = function(instance) {
            var id = instance.id;
            var token = localStorage.getItem("token")
            var data = {};
            data.name = instance.name;
            $http({
                method: 'PUT',
                url: endpoint + '/instance/' + id,
                data: data,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                console.log(response.data)
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Wrong')
            });
        }
        
        this.delete = function(instance,callback) {
            var id = instance.id;
            var token = localStorage.getItem("token")
            $http({
                method: 'DELETE',
                url: endpoint + '/instance/' + id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                console.log(response.data)
                callback()
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert('Wrong')
            });
        }
    })