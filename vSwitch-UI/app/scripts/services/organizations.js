angular.module('vSwitchUiApp')
    .service('OrgService', function($http, $location, toastr, endpoint) {
        /**
         ** Service Add organization
         ** @org: organization object
         **/
        this.add = function(org, callback) {
            var userid = localStorage.getItem("userid");
            var token = localStorage.getItem("token");
            org.owner = userid;
            $http({
                method: 'POST',
                url: endpoint + '/organization',
                data: org,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                add_helper(response.data, callback, toastr)
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         ** This functions adds the owner to the organization members
         ** @org: organization object
         ** @callback: function to be executed when done
         **/
        function add_helper(org, callback, toastr) {
            var token = localStorage.getItem("token");
            var userid = localStorage.getItem('userid');
            $http({
                method: 'POST',
                url: endpoint + '/organization/' + org.id + '/members/' + userid,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success('Organization added successfully');
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };


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

        /**
         * Service get orgaization
         * Get organization by id
         * @id: id of the organization
         * @callback: function to be executed when done
         **/
        this.get = function(id, callback) {
            var token = localStorage.getItem("token");
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
         * Service update orgaization
         * Update organization by id
         * @org: organization object
         * @callback: function to be executed when done
         **/
        this.update = function(org, callback) {
            var token = localStorage.getItem("token");
            var id = org.id;
            org.owner = org.owner.id;
            $http({
                method: 'PUT',
                url: endpoint + '/organization/' + id,
                data: org,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Organization updated");
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         * Service delete orgaization
         * Delete organization by id
         * @org: organization object
         * @callback: function to be executed when done
         **/
        this.delete = function(org, callback) {

            var userid = localStorage.getItem("userid");
            var id = org.id;
            if (userid != org.owner) {
                toastr.error("Permision denied", "You are not the owner");
                callback();
                return;
            }
            else {
                delete_helper(id, callback);
            }
        };


        function delete_helper(id, callback) {
            var token = localStorage.getItem("token");
            $http({
                method: 'DELETE',
                url: endpoint + '/organization/' + id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Organization deleted successfully");
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         * Service join orgaization
         * Join organization by id
         * @code: organization code
         * @callback: function to be executed when done
         **/
        this.join = function(code, callback) {
            var token = localStorage.getItem("token");
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
                toastr.error("There was an error");
            });
        };

        /**
         ** This functions adds the user to the organization members
         ** @org: organization object
         ** @callback: function to be executed when done
         **/
        function join_helper(org, callback) {
            var token = localStorage.getItem("token");
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
                toastr.error("There was an error");
            });
        };

        /**
         ** This functions get the details of the vSwich instance
         ** @org: organization object
         ** @callback: function to be executed when done
         **/
        this.details = function(org, callback) {
            var token = localStorage.getItem("token");
            if (!token) {
                return;
            }
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
                toastr.error("There was an error");
            });
        };

        /**
         ** This functions get the geo information of an ip
         ** @callback: function to be executed when done
         **/
        this.geo = function(callback) {
            $http({
                method: 'GET',
                url: 'http://ipinfo.io',
            }).then(function successCallback(response) {
                console.log(response);
                callback(response.data)
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });

        },

        this.installer = function(url) {
            $http({
                method: 'GET',
                url: url,
                responseType: 'arraybuffer'
            }).then(function successCallback(response) {
                console.log(response);
                var a = document.createElement('a');
                var blob = new Blob([response.data], {'type':"application/octet-stream"});
                a.href = URL.createObjectURL(blob);
                a.download = "Cloud-vSwitch.zip";
                a.click();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
    });
