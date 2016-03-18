########################
#
# created by:
#       Shuwen Sun
#       March 1, 2016
#
########################

# get the __openssl-ca.cnf__
#touch openssl-ca.cnf

# this will generate 2 files 
## __cacert.pem__(self-signed certificate of CA)
## and __cakey.pem__(private key of CA)
openssl req -x509 -config openssl-ca.cnf -newkey rsa:4096 -sha256 -nodes -out cacert.pem -outform PEM

# dump the cert to test
openssl x509 -in cacert.pem -text -noout
# test it with purpose
openssl x509 -purpose -in cacert.pem -inform PEM

# now create the __openssl-server.cnf__
#touch openssl-server.cnf

# create server cert 
# A request in __servercert.csr__ and a private key in __serverkey.pem__.
openssl req -config openssl-server.cnf -newkey rsa:2048 -sha256 -nodes -out servercert.csr -outform PEM

# create __index.txt__ and __serial.txt__
touch index.txt
echo '01' > serial.txt

# 
openssl ca -config openssl-ca.cnf -policy signing_policy -extensions signing_req -out servercert.pem -infiles servercert.csr

# a freshly minted server certificate in servercert.pem. The private key was created earlier and is available in serverkey.pem.

# To inspect the minted cert 
openssl x509 -in servercert.pem -text -noout
