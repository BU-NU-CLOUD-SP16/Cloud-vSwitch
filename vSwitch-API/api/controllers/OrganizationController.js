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
            organization = req.body;
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
            }

            // TODO:
            // Create certificates here
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
                    //moc.create(organization, user_data, callback)
                  callback(null, organization);
                })

            });

        }
};

