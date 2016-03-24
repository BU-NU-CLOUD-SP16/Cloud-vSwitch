var pem = require('pem');
var fs = require('fs');

module.exports = {
    cacert: "",
    cakey: "",
    dh: "",
    certkey: function(options, callback) {

        this.ca(
            this.csr(options, this.sign, callback)
        )

    },
    csr: function(options, sign, callback) {
        pem.createPrivateKey(2048, function(error,res) {
            options.clientKey = res.key;
            console.log(res.key);
            pem.createCSR(options, function(error, res) {
                sign(res.csr, res.clientKey, callback)
            });
        });
    },
    sign: function(csr, key, callback) {
        console.log(key);
        var options = {
            serviceKey: this.cakey,
            serviceCertificate: this.cacert,
            selfSigned: false,
            serial: Date.now(),
            csr: csr
        };

        pem.createCertificate(options, function(error, res) {
            console.log(res.certificate);
            callback(res.certificate, key, this.cacert, this.dh);
            //dh(res.certificate, key, callback)
        });
    },
    ca: function(callback) {
        fs.readFile(sails.config.ca.cert, function read(err, data) {
            this.cacert = data.toString();
            fs.readFile(sails.config.ca.key, function read(err, data) {
                this.cakey = data.toString();
                fs.readFile(sails.config.ca.dh, function read(err, data) {
                    this.dh = data.toString();
                    callback;
                })
            })
        })
    }
};
