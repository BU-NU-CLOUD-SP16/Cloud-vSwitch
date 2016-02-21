angular.module('vSwitchUiApp')
    .service('OrgService', function($http, $location) {
        var endpoint = 'http://129.10.3.72:8080';

        this.add = function(org, callback) {
            var userid = localStorage.getItem("userid");
            var token = localStorage.getItem("token")
            org.code = org.name + "-" + userid.substr(userid.length - 5) + Math.floor((Math.random() * 100) + 1);
            org.ready = true
            org.owner = userid
            console.log(org)
            $http({
                method: 'POST',
                url: endpoint + '/organization',
                data: org,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                add_helper(response.data, callback)
            }, function errorCallback(response) {
                console.log(response)
                alert('Wrong')
            });
        }

        function add_helper(org, callback) {
            var token = localStorage.getItem("token")
            var userid = localStorage.getItem('userid');
            $http({
                method: 'POST',
                url: endpoint + '/organization/' + org.id + '/members/' + userid,
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
            var userid = localStorage.getItem('userid');
            var token = localStorage.getItem("token")
            $http({
                method: 'GET',
                url: endpoint + '/user/' + userid + '/organizations',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback(response.data)
            }, function errorCallback(response) {
                alert('Wrong')
            });
        }

        this.get = function(id, callback) {
            var token = localStorage.getItem("token")
            $http({
                method: 'GET',
                url: endpoint + '/organization/' + id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback(response.data)
            }, function errorCallback(response) {
                alert('Wrong')
            });
        }


        this.update = function(org, callback) {
            var token = localStorage.getItem("token");
            var id = org.id;
            var data = {}
            data.name = org.name

            $http({
                method: 'PUT',
                url: endpoint + '/organization/' + id,
                data: data,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                alert("done")
            }, function errorCallback(response) {
                alert('Wrong')
            });
        }

        this.delete = function(org, callback) {
            
            var userid = localStorage.getItem("userid");
            var id = org.id;

            if (userid != org.owner.id) {
                alert("You are not the owner");
                callback();
                return;
            } else {
                delete_helper(id, callback);
            }
        }
        
        function delete_helper(id, callback) {
            var token = localStorage.getItem("token");
            $http({
                    method: 'DELETE',
                    url: endpoint + '/organization/' + id,
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                }).then(function successCallback(response) {
                    alert("done")
                    callback()
                }, function errorCallback(response) {
                    alert('Wrong')
                });
        }

        this.join = function(code, callback) {
            var token = localStorage.getItem("token")
            $http({
                method: 'GET',
                url: endpoint + '/organization?code=' + code,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {

                if (response.data.length > 0) {
                    join_helper(response.data[0], callback);
                }
            }, function errorCallback(response) {
                alert('Wrong')
            });
        }

        function join_helper(org, callback) {
            var token = localStorage.getItem("token")
            var userid = localStorage.getItem('userid');
            $http({
                method: 'POST',
                url: endpoint + '/organization/' + org.id + '/members/' + userid,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback();
            }, function errorCallback(response) {
                alert('Wrong')
            });

        }

    })