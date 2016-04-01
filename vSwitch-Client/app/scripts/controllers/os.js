const exec = require('child_process').exec;

angular.module('app')
    .controller('OsCtrl', function ($scope, $window) {
        $scope.platform = process.platform;

        $scope.connect = connect;
        $scope.disconnect = disconnect;

        var vpn;
        function connect() {
            console.log("Connected");
            var sudo = require('electron-sudo');
            var options = {
                name: 'Cloud vSwitch',
                process: {
                    on: function (ps) {
                        vpn = ps;
                    }
                }
            };
            sudo.exec('bin/openvpn /Volumes/Datos/javier/client1.ovpn', options, function(error) {
                console.log(error)
            });
        }

        function disconnect() {
            var sudo = require('electron-sudo');
            var options = {
                name: 'Cloud vSwitch'
            };

            sudo.exec('kill -9 ' + (vpn.pid+1) , options, function(error) {
                console.log(error);
            });
        }
});