var ca = require('../services/CA.js');

module.exports = {
    certificate: function (req, res) {
        var organization = req.body.organization;
        User.findOne({
            id: req.body.user
        }).exec(function (err, user) {

            if (err) {
                return res.status(400).json()
            }
            if (!user) {
                return res.status(404).json()
            }

            // Create certificates here
            var options = {
                country: organization.country,
                state: organization.providence,
                locality: organization.city,
                organization: organization.name,
                organizationUnit: organization.ou,
                commonName: user.email,
                emailAddress: user.email
            };

            ca.certkey(options, function (cert, key, cacert) {
                console.log(cert);
                console.log(key);
                console.log(cacert);
                return res.status(200).json({
                    cert: cert,
                    key: key,
                    cacert: cacert
                });
            })

        })

    }
}

