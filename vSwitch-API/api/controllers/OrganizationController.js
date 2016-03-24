/**
 * OrganizationController
 *
 * @description :: Server-side logic for managing organizations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create:
        function(req, res) {
            organization = req.body
            organization.code = organization.name + "-" + organization.owner.substr(organization.owner.length - 5) + Math.floor((Math.random() * 100) + 1);
            Organization.create(organization).exec(function(err,organization) {
                if (err) {
                    if (err.ValidationError) {
                        return helper.convertWaterlineError(err, res);
                    }
                    return res.json(err.status, {
                        err: err
                    });
                }
                return res.status(200).json(organization)
            })

        }
};

