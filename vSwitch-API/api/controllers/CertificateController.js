require('shelljs/global');
const exec = require('child_process').exec;
module.exports = {
    sign:
        function(req, res) {
            var id = req.params.id;
            req.file('csr').upload(function (err, files){
                  if (err) return res.serverError(err);
                    csr = files[0].fd;
                    console.log(csr);
                    sig = exec('api/ca/signcert.sh ' + id + ' ' + csr + ' server');
                    sig.stderr.on('data', function (data) {
                        console.log('stdout: ' + data);
                    });
                    sig.on('close', function (code)  {
                        return res.download('certs/'+id+'/server.crt', 'server.crt');
                    });
                    sig.on('error', function (err)  {
                        return res.status(500).json(err);
                    });

            })
        },
    createCsr:
        function(req, res) {
            var id = req.params.id;
            console.log(req.body);
            country = req.body.country;
            state = req.body.providence;
            city = req.body.city;
            name = req.body.name;
            ou = req.body.ou;

            csr = exec('api/ca/csr.sh ' + id + ' server ' + ' ' + country + ' ' + state + ' ' + city + ' ' + name + ' ' + ou);
            csr.stderr.on('data', function (data) {
                  console.log('stdout: ' + data);
                  console.log(req.body);
            });
            csr.on('close', function (code)  {
                return res.download('certs/'+id+'/server.zip', 'server.zip');
            });
            csr.on('error', function (err)  {
                    return res.status(500).json(err);
            });
    }
}

