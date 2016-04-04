angular.module('app')
    .controller('SessionCtrl', function ($scope, $location, SessionService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.platform = process.platform;

        $scope.login = login;

        $scope.user = {};

        function login() {
            var user = $scope.user;
            SessionService.login(user, function() {
                $location.path("/dashboard")
            })
        }
    })