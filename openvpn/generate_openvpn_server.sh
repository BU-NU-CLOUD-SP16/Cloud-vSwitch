## To run
# bash generate_openvpn_server.sh cacert.pem servercert.pem serverkey.pem
#

echo "#!/bin/bash

#Update Ubuntus repository lists.
apt-get update

#Install OpenVPN and Easy-RSA.
apt-get -y install openvpn easy-rsa

# ip forward
echo 1 > /proc/sys/net/ipv4/ip_forward
echo net.ipv4.ip_forward=1 >> /etc/sysctl.conf

## TODO
ufw allow ssh

ufw allow 80/tcp


sed 's/DEFAULT_FORWARD_POLICY=\"DROP\"/DEFAULT_FORWARD_POLICY=\"ACCEPT\"/' /etc/default/ufw


## Not sure this will work!!!

cat >> /etc/ufw/before.rules << EOL

*nat
:POSTROUTING ACCEPT [0:0]
-A POSTROUTING -s 10.8.0.0/8 -o eth0 -j MASQUERADE
COMMIT

EOL

ufw --force enable


#OpenVPN configuration file
cat > /etc/openvpn/server.conf << EOL
#OpenVPN configuration file
port 80
proto tcp
dev tun
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt
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
cs`cat $2`
EOL

cat > /etc/openvpn/server.key << EOL
`cat $3`
EOL

cat > /etc/openvpn/dh2048.pem << EOL
'cat $4'
EOL


# openssl dhparam -out /etc/openvpn/dh2048.pem 2048

service openvpn start

" >> openvpn_server.sh
