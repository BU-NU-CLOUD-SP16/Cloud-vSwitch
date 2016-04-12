angular.module('vSwitchUiApp')
    .service('InstanceService', function($http, $location, toastr, endpoint, $timeout) {

        /*
         ** Service Add instance
         ** @org: instance object
         ** @callback: function to be executed
         **/
        this.add = function(instance, callback) {
            var token = localStorage.getItem("token");
            instance.organization = localStorage.getItem("current");
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
                toastr.error("There was an error");
            });
        };

        /*
         ** This function add the instance to the organization
         ** @instance: instance object
         ** @callback: function to be executed
         **/
        function add_helper(instance, callback) {
            var token = localStorage.getItem("token");
            var orgid = localStorage.getItem('current');
            $http({
                method: 'POST',
                url: endpoint + '/organization/'+orgid+'/instances/'+ instance.id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Instanced added successfully");
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         * Service list instances
         * Get organization's instances
         * @callback: function to be executed when done
         */
        this.list = function(callback) {
            var token = localStorage.getItem("token");
            var orgid = localStorage.getItem("current");
            $http({
                method: 'GET',
                url: endpoint + '/organization/'+orgid+'/instances',
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
         * Service update instance
         * Update instance by id
         * @instance: instance object
         * @callback: function to be executed when done
         **/
        this.update = function(instance) {
            var id = instance.id;
            var token = localStorage.getItem("token");
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
                toastr.success("Instance updated successfully");
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        this.stop = function(instance) {
            var details = this.details;
            var token = localStorage.getItem("token");
            $http({
                method: 'POST',
                url: endpoint + '/instance/stop',
                data: instance,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Instance stopped");
                details(instance, null);
            }, function errorCallback(response) {
                toastr.success("Instance could not be stopped");
            })
        };

        this.start = function(instance) {
            var token = localStorage.getItem("token");
            $http({
                method: 'POST',
                url: endpoint + '/instance/start',
                data: instance,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Instance started");
            }, function errorCallback(response) {
                toastr.success("Instance could not be started");
            })
        };

        /**
         * Service delete instance
         * Delete instance by id
         * @org: instance object
         * @callback: function to be executed when done
         **/
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
                toastr.success("Instance deleted successfully");
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         * Service instance details
         * Get instance details
         * @org: instance object
         * @callback: function to be executed when done
         **/
        this.details = function(instance) {
            var token = localStorage.getItem("token");

            if (!token) {
                return
            }

            $http({
                method: 'GET',
                url: endpoint + '/instance/'+instance.id+'/details',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                instance.status = response.data.server.status;
                instance.ip = response.data.server.addresses.MyNetwork[0].addr;
                $timeout(details(instance), 5000)
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
    });
