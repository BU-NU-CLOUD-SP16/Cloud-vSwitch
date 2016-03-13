sudo su
apt-get install openssl -y 
cd ~
/usr/lib/ssl/misc/CA.pl -newca
# the public cert is cacert.pem
mv cacert.pem vswitch.pem

# client: generate a key (.key) and a request (.req)
/usr/lib/ssl/misc/CA.pl -newreq
# sign that request with your CA’s key and create a certificate (.crt) that you send to the client:
/usr/lib/ssl/misc/CA.pl -sign
