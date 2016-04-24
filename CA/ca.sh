########################
#
# created by:
#       Shuwen Sun
#       March 1, 2016
#
########################

## and __cakey.pem__(private key of CA)
openssl req -x509 -config openssl-ca.cnf -newkey rsa:4096 -sha256 -nodes -out cacert.pem -outform PEM

# dump the cert to test
openssl x509 -in cacert.pem -text -noout
# test it with purpose
openssl x509 -purpose -in cacert.pem -inform PEM

openssl dhparam -out ./dh 2048

