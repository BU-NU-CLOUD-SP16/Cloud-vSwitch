/**
 * OrganizationController
 *
 * @description :: Server-side logic for managing organizations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moc = require('../services/MOC2.js');
var ca = require('../services/CA.js');
var script = require('../services/ConfigScript.js');

module.exports = {
    create:
        function(req, res) {
            var organization = req.body;
            organization.code = organization.name + "-" + organization.owner.substr(organization.owner.length - 5) + Math.floor((Math.random() * 100) + 1);


            var callback = function(err, organization) {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }
                Organization.create(organization).exec(function(err,organization) {
                    if (err) {
                        moc.terminate(organization, callback);
                        return res.json(err.status, {
                            error: err
                        });
                    }
                    return res.status(200).json(organization);
                })
            };


            var options = {
                country: organization.country,
                state: organization.providence,
                locality: organization.city,
                organization: organization.name,
                organizationUnit: organization.ou,
                commonName: organization.name,
                emailAddress: organization.email
            };

            ca.certkey(options, function(cert, key, cacert, dh) {
                // Client install script

                script.server(cert, key, cacert, dh, function(user_data) {
                    // MOC create instance
                    var options = {
                        user_data: user_data,
                        flavorRef: 2,
                        imageRef: '3dfb6cd0-9bf8-4106-b6ef-e735542fb669'
                    };
                    moc.create(organization, options, callback);
                    //callback(null, organization);
                })

            });
        },

    details: function(req, res) {
        var id = req.params.id;
        Organization.findOne({
            id: req.params.id
        }).exec(function(err, organization) {
            if (err) {
                return res.status(400).json()
            }
            if (!organization) {
                return res.status(404).json()
            }
            moc.details(organization, function (error, response) {
                if (error) {
                    res.status(500).json();
                } else {
                    res.status(200).json(response);
                }
            })
        });
    },

    destroy:
        function(req, res) {
            console.log(req.params.id);
            Organization.findOne({
                id: req.params.id
            }).exec(function(err, organization) {
                console.log(organization);
                if (err) {
                    return res.status(400).json()
                }
                if (!organization) {
                    return res.status(404).json()
                }

                var callback = function(err,organization) {
                    if (err) {
                        return res.status(400).json({
                            err: {error: err}
                        })
                    }
                    console.log(organization);
                    Organization.destroy({id: req.params.id}).exec(function(err,organization) {
                        console.log(err);
                        console.log(organization);
                        if (err) {
                            return res.status(400).json({
                                err: {error: err}
                            });
                        } else {
                            return res.status(200).json(organization)
                        }
                    })
                };

                // MOC terminate instance
                moc.terminate(organization, callback);
            })
        },
};

