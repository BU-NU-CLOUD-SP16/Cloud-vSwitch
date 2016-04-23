/**
 * InstanceController
 *
 * @description :: Server-side logic for managing instances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moc = require('../services/MOC2.js');
var ca = require('../services/CA.js');
var script = require('../services/ConfigScript.js');

module.exports = {
    create:
        function(req, res) {
            var instance = req.body;
            var callback = function(err, instance) {
                if (err) {
                    return res.status(400).json();
                }
                Instance.create(instance).exec(function(err,instance) {
                    if (err) {
                        moc.terminate(instance, function() {});
                        return res.json(err.status, {
                            err: err
                        });
                    }
                    return res.status(200).json(instance);
                })
            };
            var options = {
                user_data: null,
                flavorRef: instance.flavor,
                imageRef: instance.image
            };
            moc.create(instance, options, callback)


        },

    start:
        function(req, res) {
            var instance = req.body;
            var callback = function(err,instance) {
                console.log(err);
                if (err) {
                    return res.status(400).json({
                        err: {error: err}
                    });
                }
                return res.status(200).json(instance)
            };
            // MOC start instance
            moc.start(instance, callback);
        },
    stop:
        function(req, res) {
            var instance = req.body;
            var callback = function(err, instance) {
                console.log(err);
                if (err) {
                    return res.status(400).json({
                        err: {error: err}
                    });
                }
                return res.status(200).json(instance)
            };
            // MOC stop instance
            moc.stop(instance, callback);
        },

    destroy:
        function(req, res) {
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

                var callback = function(err,instance) {
                    if (err) {
                        return res.status(400).json({
                            err: {error: err}
                        })
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
                };

                // MOC terminate instance
                moc.terminate(instance, callback);
                //callback(null,instance)
            })
        },
    details: function(req, res) {
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
                    return res.status(400).json({
                        err: {error: err}
                    });
                } else {
                    res.status(200).json(response);
                }
            })
        });
    },
    flavors: function(req, res) {
        var callback = function(error, flavors) {
            if (error) {
                return res.status(400).json({
                    err: {error: err}
                });
            } else {
                return res.status(200).json(flavors);
            }
        };
        moc.list_flavors(callback);
    },
    images: function(req, res) {
        var callback = function(error, images) {
            if (error) {
                return res.status(400).json({
                    err: {error: err}
                });
            } else {
                return res.status(200).json(images);
            }
        };
        moc.list_images(callback);
    }
};


