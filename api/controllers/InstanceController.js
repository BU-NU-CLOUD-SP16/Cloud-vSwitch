/**
 * InstanceController
 *
 * @description :: Server-side logic for managing instances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moc = require('../services/MOC.js');
var request = require('request');

module.exports = {
    create: 
        function(req, res) {
            instance = req.body
            // MOC create instance
            moc.create(instance, function(err, instance) {
                if (err) {
                    return res.status(400).json()
                }
                Instance.create(instance).exec(function(err,instance) {
                    if (err) {
                        return res.json(err.status, {
                            err: err
                        });
                    }
                    return res.status(200).json(instance)
                })
            })

        },

    start: 
        function(req, res) {    
            instance = req.body
            console.log(instance)
            moc.start(instance, function(err,instance) {
                console.log(err)
                if (err) {
                    return res.status(400).json()
                }
                return res.status(200).json(instance)
            })
        },
    stop: 
        function(req, res) {
            instance = req.body
            moc.stop(instance, function(err, instance) {
                if (err) {
                    return res.status(400).json()
                }
                return res.status(200).json(instance)
            })
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
            
                moc.terminate(instance, function(err,instance) {
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
                })
            })
        }
};


