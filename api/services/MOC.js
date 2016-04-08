var request = require('request');

module.exports = {
    auth: function(action) {
        var exists = false
        if (typeof (sails.config.moc.token) != 'undefined') {

            expires = new Date(sails.config.moc.token.expires);
            now = new Date();

            if (now < expires) {
                exists = true;
                token = sails.config.moc.token.id;
                tenant = sails.config.moc.token.tenant.id;

                action(null, token, tenant)

            }
        }

        if (!exists) {
            request({
                url: "https://keystone.kaizen.massopencloud.org:5000/v2.0/tokens",
                method: 'POST',
                json: {
                    auth: {
                        tenantId: "58f77860f8a246528fa0392896947a29",
                        passwordCredentials: {
                            username: process.env.MOC_USER,
                            password: process.env.MOC_PASSWORD
                        }
                    }
                }
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                    error = {
                        code: 2001,
                        msg: "MOC: Authentication error"
                    }
                } else {
                    sails.config.moc.token = body.access.token;
                    token = sails.config.moc.token.id;
                    tenant = sails.config.moc.token.tenant.id;
                }
                action(error, token, tenant)
            });
        }
    },
    create: function(instance, user_data, callback) {
        var floating_ips = this.floating_ips;
        var create_fn = function(err, token, tenant) {
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    'server': {
                        'name': instance.name,
                        'imageRef': '3dfb6cd0-9bf8-4106-b6ef-e735542fb669',
                        'flavorRef': '2',
                        'security_groups' : [
                            {
                                'name': 'default'
                            }
                        ],
                        'user_data': user_data,
                        'networks': [{
                            'uuid': '95c65624-b11a-4fb0-a46c-fa7b957fdbaa'
                        }],

                        'key_name': 'cloud'
                    }
                }
            }, function(error, response, body) {
                if (error) {
                    // Failed to create instance Error code
                    error = {
                        code: 2002,
                        msg: "MOC: Failed to create instance"
                    };
                    callback(error, instance);
                    return
                }

                instance.instance_id = body.server.id;

                if (user_data) {
                    //TODO: pass the callback to the floating_ips fn
                    floating_ips(instance);
                }
                callback(error, instance);
            });
        };
        this.auth(create_fn)
    },

    start: function(instance, callback) {
        id = instance.instance_id
        start_fn = function(err, token, tenant) {
            if (err) {
                callback(err, instance)
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers/"+id+"/action",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    'os-start': null
                }
            }, function(error, response, body) {
                error = {
                    code: 2005,
                    msg: "MOC: Failed to start instance " + id
                };
                callback(error, instance)
            });
        };

        this.auth(start_fn)
    },
    stop: function(instance, callback) {
        id = instance.instance_id;
        stop_fn = function(err, token, tenant) {
            if (err) {
                callback(err, instance);
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers/"+id+"/action",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    'os-stop': null
                }
            }, function(error, response, body) {
                error = {
                    code: 2006,
                    msg: "MOC: Failed to stop instance " + id
                };
                callback(error, instance)
            });
        };

        this.auth(stop_fn)
    },
    terminate: function(instance, callback) {
        stop_fn = function(err, token, tenant) {
            if (err) {
                callback(err, instance)
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers/"+instance.instance_id+"/action",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    'forceDelete': null
                }
            }, function(error, response, body) {
                error = {
                    code: 2007,
                    msg: "MOC: Failed to terminate instance " + id
                };
                callback(error, instance)
            });
        };

        this.auth(stop_fn)
    },
    details: function(instance, callback) {
        id = instance.instance_id;
        details_fn = function(err, token, tenant) {
            if (err) {
                callback(err, instance)
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers/"+ instance.instance_id,
                method: 'GET',
                headers: {
                    'X-Auth-Token': token
                }
            }, function(error, response, body) {
                if (error) {
                    callback(error, body)

                } else {
                    error = {
                        code: 2008,
                        msg: "MOC: Failed to get instance " + id + " status"
                    };
                    callback(error, JSON.parse(body))

                }
            });
        };

        this.auth(details_fn)
    },
    floating_ips: function(instance) {
        var assign_ip = this.assign_ip;
        var details = this.details;

        floating_ips_fn = function(err,token,tenant) {
            if (err) {
                callback(err, instance);
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/" + tenant + "/os-floating-ips",
                method: 'GET',
                headers: {
                    'X-Auth-Token': token
                }
            }, function (error, response, body) {
                var ips = JSON.parse(body).floating_ips;
                for (var i in ips) {
                    var ip = ips[i];
                    if (ip.instance_id == null) {
                        var k0 = function(err, response) {
                            var status = response.server.status;
                            if (status == "ACTIVE") {
                                return assign_ip(instance, ip.ip);
                            } else {
                                //TODO: Improve  this fn
                                function sleep(time, callback) {
                                    var stop = new Date().getTime();
                                    while(new Date().getTime() < stop + time) {
                                        ;
                                    }
                                    callback();
                                }
                                sleep(5000, function() {
                                });
                                details(instance, k0);
                            }
                        };

                        details(instance, k0);

                    }
                }

                //TODO: Create Floating ip
            });
        };
        this.auth(floating_ips_fn);
    },
    assign_ip: function(instance, ip) {
        id = instance.instance_id;
        assign_fn = function(err, token, tenant) {
            if (err) {
                callback(err, instance);
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers/"+id+"/action",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    "addFloatingIp": {
                        "address": ip
                    }
                }
            }, function(error, response, body) {
                //TODO: terminate instance
                //TODO: call callback with the error
                error = {
                    code: 2009,
                    msg: "Failed to assign floating ip to instance"
                };
                console.log("Assigned ip");
            });
        };
        this.auth(assign_fn)
    },
}
