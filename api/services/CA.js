var pem = require('pem');
var fs = require('fs');

module.exports = {
    certkey: function(options, callback) {
        csr = this.csr;
        this.ca(function(cakey, cacert, dh) {
                csr(cakey, cacert, dh, options, this.sign, callback)
            }
        )

    },
    csr: function(cakey, cacert, dh,  options, sign, callback) {
        sign = this.sign;
        pem.createPrivateKey(2048, function(error,res) {
            options.clientKey = res.key;
            pem.createCSR(options, function(error, res) {
                sign(cakey, cacert, dh, res.csr, res.clientKey, callback)
            });
        });
    },
    sign: function(cakey, cacert, dh, csr, key, callback) {
        var options = {
            serviceKey: cakey,
            serviceCertificate: cacert,
            selfSigned: false,
            serial: Date.now(),
            csr: csr
        };

        pem.createCertificate(options, function(error, res) {
            callback(res.certificate, key, cacert, dh);
        });
    },
    ca: function(callback) {
        var cacert = process.env.CACERT;
        var dh = process.env.DH;
        var cakey = process.env.CAKEY;
        callback(cakey, cacert, dh);
    }
};
