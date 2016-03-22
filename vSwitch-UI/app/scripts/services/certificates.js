angular.module('vSwitchUiApp')
    .service('CertificateService', function($http, $location, toastr, endpoint) {
        /*
         ** Service Request CSR
         **/
        this.csr = function(org) {
            var token = localStorage.getItem("token")
            id = localStorage.getItem("current")
            url = endpoint + '/certificate/csr/'+id;
            $http({
                method: 'POST',
                url: endpoint + '/certificate/csr/'+id,
                headers: {
                    'Authorization': "Bearer " + token
                },
                data: org,
                responseType:'arraybuffer'
            }).then(function successCallback(response) {
                console.log(response.data);
                var blob = new Blob([response.data], {type: 'application/zip'});
                var url = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = id + ".zip";
                a.click();
                window.URL.revokeObjectURL(url);
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });

        }

        this.sign = function(file) {
            var token = localStorage.getItem("token");
            id = localStorage.getItem("current");
            var fd = new FormData();
            fd.append('csr', file);
            fd.append('id', id);
            url = endpoint + '/certificate/sign/';
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(response){
                var blob = new Blob([response], {type: 'application/x-x509-ca-cert'});
                var url = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = id + ".crt";
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .error(function(){
                toastr.error("There was an error");
            });
        }
    }
)
