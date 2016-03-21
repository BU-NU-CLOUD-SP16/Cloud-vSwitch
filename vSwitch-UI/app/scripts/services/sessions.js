angular.module('vSwitchUiApp')
    .service('SessionService', function($http, $location, toastr, endpoint, $q) {

        /**
         * Service signup user
         * @user: user object
         * @callback: function to be executed when done
         **/
        this.signup = function(user, callback) {
            $http({
                method: 'POST',
                url: endpoint + '/signup/',
                data: user
            }).then(function successCallback(response) {
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        };

        /**
         * Service login user
         * @user: user object
         * @callback: function to be executed when done
         **/
        this.login = function(user, callback) {
            var token = localStorage.getItem("token");
            $http({
                method: 'POST',
                url: endpoint + '/login',
                data: user,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userid", response.data.user.id);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                callback();
            }, function errorCallback(response) {
                toastr.error('Wrong email or password');
            });
        }

        this.authenticated = function () {
            //var def = $q.defer();
            if (localStorage.getItem('token') == null || localStorage.getItem('userid') == null){
                console.log("Unauthorized")
                $location.path('/login');
              //  def.reject();
            } else {
                //def.resolve('authenticated');
            }
        }

    });