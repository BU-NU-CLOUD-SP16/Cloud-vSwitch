#
# Arguments
# $1: userid
# $2: certificate name / common name
# $3: Country
# $4: State
# $5: City
# $6: Organization name
# $7: OU


CAPATH="api/ca"
CERTS="certs"

mkdir -p $CERTS/$1

# A request in __servercert.csr__ and a private key in __serverkey.pem__.
openssl req -config $CAPATH/openssl-server.cnf -batch -newkey rsa:2048 -sha256 -nodes -out $CERTS/$1/$2.csr -keyout $CERTS/$1/$2.key -outform PEM -subj "/C=$3/ST=$4/L=$5/O=$6/OU=$7/CN=$2"

# Create zip
zip -r $CERTS/$1/$2.zip $CERTS/$1/$2.csr $CERTS/$1/$2.key
