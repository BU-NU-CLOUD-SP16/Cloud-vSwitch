/**
 * OrganizationController
 *
 * @description :: Server-side logic for managing organizations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moc = require('../services/MOC.js');
var ca = require('../services/CA.js');
var script = require('../services/ConfigScript.js');

module.exports = {
    create:
        function(req, res) {
            var organization = req.body;
            organization.code = organization.name + "-" + organization.owner.substr(organization.owner.length - 5) + Math.floor((Math.random() * 100) + 1);


            var callback = function(err, organization) {
                if (err) {
                    return res.status(400).json();
                }
                Organization.create(organization).exec(function(err,organization) {
                    if (err) {
                        return res.json(err.status, {
                            err: err
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
                    moc.create(organization, user_data, callback)
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
    }
};

