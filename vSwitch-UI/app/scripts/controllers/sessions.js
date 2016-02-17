'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('SessionCtrl', function ($scope, $location, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.login = login;
    $scope.logout = logout;
    $scope.signup = signup;
    $scope.update = update;
    
    // variables
    $scope.user = {};
    $scope.logged = true;

    
    function login() {
        $rootScope.logged = true;
        var dbUser = JSON.parse(localStorage.getItem("user"));
        $rootScope.username = dbUser.name;
        if ($scope.user.email == dbUser.email && $scope.user.password == dbUser.password) {
          $location.path('/organizations');
        } else {
          alert("Wrong email or password");
        }
    }
    
     function logout() {
       $rootScope.logged = false;
        //$scope.logged = false;
        $location.path('/login');
    }
    
    function update() {
        localStorage.setItem('user', JSON.stringify($scope.user));
        $location.path('/organizations');
    }
    
    function signup() {
        localStorage.setItem('user', JSON.stringify($scope.user));
        $location.path('/login');
    }
  });
