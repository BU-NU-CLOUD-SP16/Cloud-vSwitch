#!/bin/bash
apt-get update
apt-get install openvpn

#Creating Unified OpenVPN Profile for Client Devicesecho
#rename the client.ovpn file location of ca, cert, key
#comment out the current ca, cert and key so we can instead include the certificate and key directly in the client.ovpn file
sed -i '88,90 s/^/#/' client.conf

#store the client configuration file client.ovpn under /etc/openvpn
echo "user nobody
group nogroup
<ca>
`cat $1`
</ca>
<cert>
`cat $2`
</cert>
<key>
`cat $3`
</key>" >> /etc/openvpn/client.ovpn 
