var fs = require('fs');

module.exports = {
    server: function(cert, key, cacert, dh, callback) {

        fs.readFile("script.sh", function read(err, data) {
            var script = data.toString();
            script = script.replace('REPLACE_CACERT', cacert);
            script = script.replace('REPLACE_CERT', cert);
            script = script.replace('REPLACE_KEY', key);
            script = script.replace('REPLACE_DH', dh);
            var user_data = new Buffer(script).toString('base64');
            callback(user_data);
        });
    },
    client: function () {
    }
}