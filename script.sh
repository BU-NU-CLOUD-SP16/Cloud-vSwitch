#!/bin/bash

#Update Ubuntus repository lists.
apt-get update

#Install OpenVPN and Easy-RSA.
apt-get -y install openvpn easy-rsa

# ip forward
echo 1 > /proc/sys/net/ipv4/ip_forward
echo net.ipv4.ip_forward=1 >> /etc/sysctl.conf


ufw allow ssh

ufw allow 80/tcp


sed 's/DEFAULT_FORWARD_POLICY=\"DROP\"/DEFAULT_FORWARD_POLICY=\"ACCEPT\"/' /etc/default/ufw


#cat >> /etc/ufw/before.rules << EOL

#*nat
#:POSTROUTING ACCEPT [0:0]
#-A POSTROUTING -s 10.8.0.0/8 -o eth0 -j MASQUERADE
#COMMIT

#EOL

#ufw --force enable


## Changes
iptables -A INPUT -i tun+ -j ACCEPT
iptables -A FORWARD -i tun+ -j ACCEPT

iptables -A INPUT -i eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -j ACCEPT
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE

apt-get -y install iptables-persistent
iptables-save > /etc/iptables/rules.v4


#OpenVPN configuration file
cat > /etc/openvpn/server.conf << EOL
#OpenVPN configuration file
port 80
proto tcp
dev tun
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 208.67.222.222"
push "dhcp-option DNS 208.67.220.220"

##
push "route 192.168.1.0 255.255.255.0"

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
REPLACE_CACERT
EOL

cat > /etc/openvpn/server.crt << EOL
REPLACE_CERT
EOL

cat > /etc/openvpn/server.key << EOL
REPLACE_KEY
EOL

cat > /etc/openvpn/dh2048.pem << EOL
REPLACE_DH
EOL

service openvpn start