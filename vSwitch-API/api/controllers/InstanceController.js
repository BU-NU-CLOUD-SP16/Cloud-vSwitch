/**
 * InstanceController
 *
 * @description :: Server-side logic for managing instances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moc = require('../services/MOC.js');
var ca = require('../services/CA.js');
var script = require('../services/ConfigScript.js');

module.exports = {
    create:
        function(req, res) {
            instance = req.body;
            callback = function(err, instance) {
                if (err) {
                    return res.status(400).json();
                }
                Instance.create(instance).exec(function(err,instance) {
                    if (err) {
                        return res.json(err.status, {
                            err: err
                        });
                    }
                    return res.status(200).json(instance);
                })
            }

            // If no provider
            //callback(null, instance);

            moc.create(instance, null, callback)


        },

    start:
        function(req, res) {
            instance = req.body
            callback = function(err,instance) {
                if (err) {
                    return res.status(400).json();
                }
                return res.status(200).json(instance)
            }

            // if no provider
            //callback(null,instance)
            // MOC start instance
            moc.start(instance, callback);
        },
    stop:
        function(req, res) {
            instance = req.body
            callback = function(err, instance) {
                if (err) {
                    return res.status(400).json()
                }
                return res.status(200).json(instance)
            }
            // if no provider
            //callback(null, instance)
            // MOC stop instance
            moc.stop(instance, callback);
        },

    destroy:
        function(req, res) {
            instance = req.params.id
            Instance.findOne({
                id: req.params.id
            }).exec(function(err, instance) {
                if (err) {
                    return res.status(400).json()
                }
                if (!instance) {
                    return res.status(404).json()
                }

                callback = function(err,instance) {
                    if (err) {
                        return res.status(400).json()
                    }
                    Instance.destroy(instance).exec(function(err,instance) {
                        if (err) {
                            return res.status(400).json({
                                err: {error: err}
                            });
                        } else {
                            return res.status(200).json(instance)
                        }
                    })
                }

                // If no provider
                //callback(null, instance);
                // MOC terminate instance
                moc.terminate(instance, callback);
            })
        },
    details: function(req, res) {
        console.log(req.params.id);
        Instance.findOne({
            id: req.params.id
        }).exec(function(err, instance) {
            if (err) {
                return res.status(400).json()
            }
            if (!instance) {
                return res.status(404).json()
            }
            moc.details(instance, function (error, response) {
                if (error) {
                    res.status(500).json();
                } else {
                    res.status(200).json(response);
                }
            })
        });
    }
};


