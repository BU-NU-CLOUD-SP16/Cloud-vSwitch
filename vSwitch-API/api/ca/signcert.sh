CAPATH="api/ca"
CERTS="certs"
mkdir -p $CERTS/$1

openssl ca -config $CAPATH/openssl-ca.cnf -batch -policy signing_policy -extensions signing_req -out $CERTS/$1/$3.crt  -infiles $2

