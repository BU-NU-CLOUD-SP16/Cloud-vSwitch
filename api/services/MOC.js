var request = require('request');

module.exports = {
    auth: function(action) {
        request({
            url: "https://keystone.kaizen.massopencloud.org:5000/v2.0/tokens",
            method: 'POST',
            json: {
                auth: {
                    tenantId: "58f77860f8a246528fa0392896947a29",
                    passwordCredentials: {
                        username: sails.config.moc.username,
                        password: sails.config.moc.password
                    }
                }
            }
        }, function(error, response, body) {
            console.log(error);
            token = body.access.token.id
            tenant = body.access.token.tenant.id
            action(error, token, tenant)
        });
    },
    create: function(instance, user_data, callback) {
        create_fn = function(err, token, tenant) {
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
                        'networks': [{
                            'uuid': '95c65624-b11a-4fb0-a46c-fa7b957fdbaa'
                        }],
                        'user_data': user_data,
                        'key_name': 'cloud'
                    }
                }
            }, function(error, response, body) {
                if (error) {
                    callback(error, instance)
                    return
                }

                console.log(body)
                instance.instance_id = body.server.id
                callback(error, instance)
            });
        }
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
                console.log(error)
                callback(error, instance)
            });
        }

        this.auth(start_fn)
    },
    stop: function(instance, callback) {
        id = instance.instance_id
        stop_fn = function(err, token, tenant) {
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
                    'os-stop': null
                }
            }, function(error, response, body) {
                callback(error, instance)
            });
        }

        this.auth(stop_fn)
    },
    terminate: function(instance, callback) {
        console.log(instance)
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
                console.log(body)
                callback(error, instance)
            });
        }

        this.auth(stop_fn)
    },
}
