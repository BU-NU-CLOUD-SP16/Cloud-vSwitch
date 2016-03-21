## To run
# bash generate_openvpn_server.sh cacert.pem servercert.pem serverkey.pem

echo "

#!/bin/bash

#Update Ubuntus repository lists.
apt-get update

#Install OpenVPN and Easy-RSA.
apt-get -y install openvpn easy-rsa

# ip forward
echo 1 > /proc/sys/net/ipv4/ip_forward
echo net.ipv4.ip_forward=1 >> /etc/sysctl.conf

## TODO


#OpenVPN configuration file
cat > /etc/openvpn/server.conf << EOL
#OpenVPN configuration file
port 80
proto tcp
dev tun
server 10.8.0.0 255.255.255.0
ifconfig-poolem-persist ipp.txt
push \"redirect-gateway def1 bypass-dhcp\"
push \"dhcp-option DNS 208.67.222.222\"
push \"dhcp-option DNS 208.67.220.220\"
duplicate-cn
keepalive 10 120
comp-lzo
user nobody
group nogroup
persist-key
persist-tun
verb 3
dh dh2048.pem
ca ca.crt
cert server.crt
key server.key
EOL

chmod 755 /etc/openvpn/server.conf


cat > /etc/openvpn/ca.crt << EOL
`cat $1`
EOL

cat > /etc/openvpn/server.crt << EOL
`cat $2`
EOL

cat > /etc/openvpn/server.key << EOL
`cat $3`
EOL



" >> openvpn_server.sh
