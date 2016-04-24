
var sudo = require('electron-sudo');
var ping = require('ping');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var slash = require('slash');



angular.module('app')
    .service('VpnService', function($http, toastr, endpoint, $timeout) {

        this.checkOpenvpn = function(callback) {
            var install = this.install;

            switch (process.platform) {
                case 'win32':
                    install(callback);
                    break;
                case 'linux':
                    const child = exec('which openvpn',
                        function (error, stdout, stderr) {
                            if (error !== null) {
                                install(callback);
                            } else {
                                callback();
                            }
                        });
                    break;
                case 'darwin':
                    callback();
            }
        };

        this.install = function(callback) {
            var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;

            var appdir = process.resourcesPath;
            var options = {
                name: 'Cloud vSwitch',
            };
            var cmd;
            switch (process.platform) {

                case 'linux':
                    cmd = 'sh -c \'if VERB="$( which yum )" 2> /dev/null; then  yum install -y openvpn; else apt-get install openvpn; fi\'';
                    sudo.exec(cmd,
                        options,function(error) {
                            console.log(error);
                            callback();
                        });
                    break;
                case 'win32':
                    var install = path.join(appdir,'app','bin','openvpn-install.exe') + " /S";
                    var batfile = 'REG QUERY HKLM\\SOFTWARE\\OPENVPN-GUI \r\n if %errorlevel% == 1 ' + install;
                    fs.writeFile(path.join(homedir, 'openvpn-install.bat'), batfile, function (err) {
                        if (err) return console.log(err);
                        cmd = path.join(homedir,'openvpn-install.bat');
                        sudo.exec(cmd,
                            options,function(error) {
                                console.log(error);
                                callback();
                            });
                    });
            };


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

                    var ovpn = "client \n" +
                        "dev tun \n" +
                        "proto tcp \n" +
                        "remote " + organization.float_ip + " 80 \n" +
                        "resolv-retry infinite \n" +
                        "nobind \n" +
                        "comp-lzo \n" +
                        "persist-tun \n" +
                        "persist-key \n" +
                        "verb 4 \n" +
                        "ca " + slash(path.join(homedir, 'ca.crt')) + " \n" +
                        "cert " + slash(path.join(homedir, 'cert.crt')) + " \n" +
                        "key " + slash(path.join(homedir, 'cert.key'));
                    fs.writeFile(path.join(homedir, 'client.ovpn'), ovpn, function (err) {
                        if (err) return console.log(err);
                        connect_fn(path.join(homedir, 'client.ovpn'), organization);
                    });

                }, function errorCallback(response) {
                    toastr.error("There was an error");
                });
            });


        };

        this.disconnect = function(organization) {
            var token = localStorage.getItem("token");
            var options = {
                name: 'Cloud vSwitch'
            };
            var appdir = process.resourcesPath;
            var cmd = '';
            switch (process.platform) {
                case 'win32':
                    cmd = path.join(appdir, 'app','bin','taskkill.bat');
                    break;
                case 'linux':
                    cmd = 'pkill openvpn';
                    break;
                case 'darwin':
                    cmd = 'pkill openvpn';
                    break;
            };
            sudo.exec(cmd, options, function(error) {
                if (!error) {
                    disconnect_api(organization)
                }
            });
        };

        this.monitor = function(organization) {
            ping.sys.probe(organization.ip, function(isAlive){
                organization.connected = isAlive;
            });
        };

        function connect_api(organization) {
            var token = localStorage.getItem("token");
            console.log("connect_api")
            var userid = localStorage.getItem('userid');
            $http({
                method: 'POST',
                url: endpoint + '/organization/'+organization.id+'/connected/'+userid,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                console.log(response)
            }, function errorCallback(response) {
                console.log(response)
            });
        }

        function disconnect_api(organization) {
            console.log("disconnect");
            var token = localStorage.getItem("token");
            var userid = localStorage.getItem('userid');
            $http({
                method: 'DELETE',
                url: endpoint + '/organization/'+organization.id+'/connected/'+userid,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                console.log(response)
            }, function errorCallback(response) {
                console.log(response)

            });
        }


        function connect_apple(ovpn, organization) {
            var appdir = process.resourcesPath;
            var options = {
                name: 'Cloud vSwitch',
            };
            sudo.exec(path.join(appdir, 'app','bin','openvpn') + ' ' + ovpn, options, function(error) {
                console.log(error);

                if (error) {
                    sudo.exec('./bin/openvpn ' + ovpn, options, function(error) {
                        console.log(error);
                            connect_api(organization)
                    })
                }

                if (!error) {
                    connect_api(organization)
                }
            });
        }

        function connect_linux(ovpn, organization) {
            var options = {
                name: 'Cloud vSwitch',
            };
            sudo.exec('openvpn ' + ovpn, options, function(error) {
                console.log(error);
                if (!error) {
                    connect_api(organization)
                }
            });
        }

        function connect_win(ovpn, organization) {
            var appdir = process.resourcesPath;
            var options = {
                name: 'Cloud vSwitch',
            };
            $timeout(function() {
                sudo.exec(path.join(appdir, 'app', 'bin', 'openvpn.bat'), options, function (error) {
                    if (!error) {
                        connect_api(organization)
                    }
                });
            }, 45000);
        }
    });
