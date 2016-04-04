
var sudo = require('electron-sudo');
var ping = require('ping');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;



angular.module('app')
    .service('VpnService', function($http, toastr, endpoint) {

        this.checkOpenvpn = function(callback) {
            var install = this.install;
            const child = exec('which openvpn',
                function(error, stdout, stderr) {
                    if (error !== null) {
                        install(callback);
                    } else {
                        callback();
                    }
                });
        };

        this.install = function(callback) {
            var options = {
                name: 'Cloud vSwitch',
            };
            var cmd;
            switch (process.platform) {

                case 'linux':
                    cmd = 'sh -c \'if VERB="$( which yum )" 2> /dev/null; then  yum install -y openvpn; else apt-get install openvpn; fi\'';
                    break;
                case 'win32':
                    cmd = ''
            };

            sudo.exec(cmd,
                options,function(error) {
                    console.log(error);
                    callback();
                });
        };

        this.connect = function(organization) {
            this.checkOpenvpn(function() {
                var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
                var connect_fn;

                switch (process.platform) {
                    case 'darwin':
                        connect_fn = connect_apple;
                        break;
                    case 'linux':
                        connect_fn = connect_linux;
                        break;
                    case 'win32':
                        connect_fn = connect_win;
                };


                fs.access(path.join(homedir, organization.id + '.ovpn'), fs.F_OK, function (err) {
                    if (!err) {
                        console.log("File exists");
                        connect_fn(path.join(homedir, organization.id + '.ovpn'));

                    } else {
                        console.log("File doesn't exists");
                        var token = localStorage.getItem("token");
                        var userid = localStorage.getItem("userid");

                        var data = {
                            organization: organization,
                            user: userid
                        };

                        $http({
                            method: 'POST',
                            url: endpoint + '/certificate/',
                            data: data,
                            headers: {
                                'Authorization': "Bearer " + token
                            }
                        }).then(function successCallback(response) {

                            fs.writeFile(path.join(homedir, 'cert.crt'), response.data.cert, function (err) {
                                if (err) return console.log(err);
                            });

                            fs.writeFile(path.join(homedir, 'cert.key'), response.data.key, function (err) {
                                if (err) return console.log(err);
                            });

                            fs.writeFile(path.join(homedir, 'ca.crt'), response.data.cacert, function (err) {
                                if (err) return console.log(err);
                            });

                            var ovpn = "client\n" +
                                "dev tun\n" +
                                "proto tcp\n" +
                                "remote " + organization.float_ip + " 80\n" +
                                "resolv-retry infinite\n" +
                                "nobind\n" +
                                "comp-lzo\n" +
                                "persist-tun\n" +
                                "persist-key\n" +
                                "verb 4\n" +
                                "ca " + path.join(homedir, 'ca.crt') + "\n" +
                                "cert " + path.join(homedir, 'cert.crt') + "\n" +
                                "key " + path.join(homedir, 'cert.key');
                            fs.writeFile(path.join(homedir, organization.id + '.ovpn'), ovpn, function (err) {
                                if (err) return console.log(err);
                                connect_fn(path.join(homedir, organization.id + '.ovpn'));
                            });

                        }, function errorCallback(response) {
                            toastr.error("There was an error");
                        });
                    }
                });

            });
        };

        this.disconnect = function() {
            var options = {
                name: 'Cloud vSwitch'
            };

            sudo.exec('pkill openvpn' , options, function(error) {

            });
        };

        this.monitor = function(organization) {
            ping.sys.probe(organization.ip, function(isAlive){
                organization.connected = isAlive;
            });
        };


        function connect_apple(ovpn) {
            var appdir = process.resourcesPath;
            var options = {
                name: 'Cloud vSwitch',
            };
            sudo.exec(path.join(appdir, 'app','bin','openvpn') + ' ' + ovpn, options, function(error) {
                console.log(error);

                if (error) {
                    sudo.exec('./bin/openvpn ' + ovpn, options, function(error) {
                        console.log(error);
                    })
                }
            });
        }

        function connect_linux(ovpn) {
            var appdir = process.resourcesPath;
            var options = {
                name: 'Cloud vSwitch',
            };
            sudo.exec(path.join(appdir, 'app','bin','openvpn') + ' ' + ovpn, options, function(error) {
                console.log(error);

                if (error) {
                    sudo.exec('openvpn ' + ovpn, options, function(error) {
                        console.log(error);
                    })
                }

            });
        }

        function connect_win(ovpn) {
            var appdir = process.resourcesPath;
            var options = {
                name: 'Cloud vSwitch',
            };
            sudo.exec('openvpn ' + ovpn, options, function(error) {
                console.log(error);

                if (error) {
                    sudo.exec(path.join(appdir, 'app','bin','openvpn.exe') + ' ' + ovpn, options, function(error) {
                        console.log(error);
                    })
                }

            });
        }
    });