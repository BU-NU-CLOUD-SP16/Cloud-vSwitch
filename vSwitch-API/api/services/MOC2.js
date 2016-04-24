var request = require('request');

module.exports = {

    /**
     * MOC authentication
     * @param callback
     */
    auth: function(callback) {
        var error = null;

        // Check if Token exists
        if (typeof (sails.config.moc.token) != 'undefined') {
            var expires = new Date(sails.config.moc.token.expires);
            var now = new Date();

            // Check if token is valid
            if (now < expires) {
                var token = sails.config.moc.token.id;
                var tenant = sails.config.moc.token.tenant.id;
                return callback(error, token, tenant);
            }
        }

        // Request Token
        request({
            url: "https://keystone.kaizen.massopencloud.org:5000/v2.0/tokens",
            method: 'POST',
            json: {
                auth: {
                    tenantId: process.env.MOC_TENANT,
                    passwordCredentials: {
                        username: process.env.MOC_USER,
                        password: process.env.MOC_PASSWORD
                    }
                }
            }
        }, function (error, response, body) {
            if (error) {
                error = {
                    code: "1001",
                    msg: "MOC authentication error"
                }
            }
            sails.config.moc.token = body.access.token;
            var token = sails.config.moc.token.id;
            var tenant = sails.config.moc.token.tenant.id;
            return callback(error, token, tenant)
        });
    },

    /**
     * Create instance
     * @param callback
     * Error: 1003
     */
    create: function(instance, options, callback) {
        var get_ip = this.get_ip;
        var details = this.details;
        var create_fn = function(error, token, tenant) {
            if (error) {
                return callback(error, instance);
            }

            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    'server': {
                        'name': instance.name,
                        //TODO: list other distros
                        'imageRef': options.imageRef,
                        'flavorRef': options.flavorRef,
                        'security_groups' : [
                            {
                                'name': 'default'
                            }
                        ],
                        //TODO: get networks
                        'user_data': options.user_data,
                        'networks': [{
                            'uuid': process.env.MOC_NETWORK
                        }],

                        'key_name': 'cloud'
                    }
                }
            }, function(error, response, body) {
                if (error) {
                    error = {
                        code: "1002",
                        msg: "Failed to create instance"
                    };
                    return callback(error, instance);
                }

                instance.instance_id = body.server.id;

                if (options.user_data) {
                    var k0;
                    var k1 = function() {
                        details(instance, k0);
                    };
                    k0 = function(error, details) {
                        if (!error) {
                            if (details.server.status == "ACTIVE") {
                                get_ip(instance);
                            } else {
                                k1();
                            }
                        }
                    };
                    details(instance, k0);
                }
                callback(error, instance);
            });
        };
        this.auth(create_fn)
    },

    /**
     * Terminate instance
     * @param callback
     * Error: 1003
     */
    terminate: function(instance, callback) {
        var id = instance.instance_id;
        var terminate_fn = function(error, token, tenant) {
            if (error) {
                return callback(error, instance);
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers/"+id+"/action",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    'forceDelete': null
                }
            }, function(error) {
                if (error) {
                    error = {
                        code: "1003",
                        msg: "Termination failed"
                    };
                }
                callback(error, instance)
            });
        };
        this.auth(terminate_fn)
    },


    /**
     * Start instance
     * @param callback
     * Error: 1004
     */
    start: function(instance, callback) {
        var id = instance.instance_id;
        var start_fn = function(error, token, tenant) {
            if (error) {
                return callback(error, instance);
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
            }, function(error) {
                if (error) {
                    error = {
                        code: "1004",
                        msg: "Start instance failed"
                    };
                }
                callback(error, instance)
            });
        };
        this.auth(start_fn)
    },

    /**
     * Start instance
     * @param callback
     * Error: 1005
     */
    stop: function(instance, callback) {
        var id = instance.instance_id;
        var stop_fn = function(error, token, tenant) {
            if (error) {
                return callback(error, instance);
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
            }, function(error) {
                if (error) {
                    error = {
                        code: "1005",
                        msg: "Stop instance failed"
                    };
                }
                callback(error, instance)
            });
        };
        this.auth(stop_fn)
    },

    /**
     * Instance details
     * @param callback
     * Error: 1006
     */
    details: function(instance, callback) {
        if (!instance) {
            error = {
                code: "1005",
                msg: "Failed to get instance"
            };
            callback(error, null)
        }
        var id = instance.instance_id;
        var details_fn = function(err, token, tenant) {
            if (err) {
                callback(err, instance);
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/servers/"+ id,
                method: 'GET',
                headers: {
                    'X-Auth-Token': token
                }
            }, function(error, response, body) {
                if (error) {
                    error = {
                        code: "1005",
                        msg: "Failed to get instance"
                    };
                    callback(error, body)
                } else {
                    callback(error, JSON.parse(body))
                }
            });
        };

        this.auth(details_fn)
    },

    get_ip: function(instance) {
        var create_ip = this.create_ip;
        var assign_ip = this.assign_ip;
        var floating_ips_fn = function(err,token,tenant) {
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/" + tenant + "/os-floating-ips",
                method: 'GET',
                headers: {
                    'X-Auth-Token': token
                }
            }, function (error, response, body) {
                if (!error) {
                    var ips = JSON.parse(body).floating_ips;
                    for (var i in ips) {
                        var ip = ips[i];
                        if (ip.instance_id == null) {
                            return assign_ip(instance, ip.ip);
                        }
                    }
                }
                return create_ip(instance);
            })
        };
        this.auth(floating_ips_fn)
    },

    create_ip: function(instance) {
        console.log("Creating ip");
        var assign_ip = this.assign_ip;
        var create_ip_fn = function(err,token,tenant) {
            if (err) {
                callback(err, instance);
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/" + tenant + "/os-floating-ips",
                method: 'POST',
                headers: {
                    'X-Auth-Token': token
                },
                json: {
                    'pool': "public"
                }
            }, function (error, response, body) {
                console.log(error);
                console.log(body);
                var ip = body.floating_ip;
                return assign_ip(instance, ip.ip);
            })
        };
        this.auth(create_ip_fn)

    },

    assign_ip: function(instance,ip) {
        var id = instance.instance_id;
        var assign_fn = function(err, token, tenant) {
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
            }, function() {
                console.log("Assigned ip: " + ip);
            });
        };
        this.auth(assign_fn)
    },

    create_key: function() {},
    list_images: function(callback) {
        var images_fn = function(err, token, tenant) {
            if (err) {
                callback(err);
                return
            }
            request({
                url: "https://glance.kaizen.massopencloud.org:9292/v2/images",
                method: 'GET',
                headers: {
                    'X-Auth-Token': token
                }
            }, function(error, response, body) {
                callback(error, JSON.parse(body).images)
            });
        };
        this.auth(images_fn)
    },
    list_flavors: function(callback) {
        var flavors_fn = function(err, token, tenant) {
            if (err) {
                callback(err);
                return
            }
            request({
                url: "https://nova.kaizen.massopencloud.org:8774/v2/"+tenant+"/flavors/detail",
                method: 'GET',
                headers: {
                    'X-Auth-Token': token
                }
            }, function(error, response, body) {
                callback(error, JSON.parse(body).flavors)
            });
        };
        this.auth(flavors_fn)

    }
};