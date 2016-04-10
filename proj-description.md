# Cloud vSwitch

<!--![vswitch-instance](doc/img/vswitch-instance.png)-->
<!--img src="doc/img/cv-arch.png" alt="arch" width="650"-->


TODO: logo and pic

# Introduction

Cloud vSwitch seeks to provide a secure and streamlined IT independent VPN as a service in the cloud.

# Features

## Architecture

- **vSwitch Portal**   
Cloud vSwitch portal is a key point in architecture. It allows users to easily create an organization and setup a VPN environment with a few clicks.

<img src="doc/img/vswitch-portal.png" alt="portal" width="350">


- **Cloud environment and Clients**   

<img src="doc/img/cv-arch.png" alt="arch" width="650">


## Key Designs

- **vSwitch API**  
vSwitch API is a **RESTful API** to support all Cloud vSwitch operations. We took advantage of [Sails.js](https://github.com/balderdashy/sails), a framework that makes it easy to build custom Node.js apps.

- **OpenVPN**   
To provide a stable VPN service, we choose to adopt [OpenVPN]() as our choice of VPN service provider. Why build a VPN tool from ground when we have open source solutions?

- **Instances and vSwitch instance**   
Difference between these two terms are "vSwitch instance" is actually the instance that provide the service in the cloud. In this release, "instance" is just simple virtual machine and later it can support any local senstive service such as NFS.

**Users and Organizations**   
<img src="doc/img/organization.png" alt="Organization" width="650">


- **Cross-platform applications**   
Usage of the VPN as a Service is cross-platform, which means you can access from any main distribution of OS, Mac OS, Linux, and Windows.

<img src="doc/img/different-distro.png" alt="dif-distro" width="800">



# Installation

**Prerequisies**

Before you start the default install process, make sure you have access to ```npm```, ```git``` and ```bower```.

The deployment of Cloud vSwitch requires a cloud environment and a portal to place your own vSwitch portal. After the deployment, you can earily and directly get access to the virtual LAN in the cloud! 



## Default installation

By default, we use the MOC to hold the cloud side. However, Amazon EC2, Microsoft Azure, and similiar service by other providers should also be able to setup this VPN as a Service.

1. **Setup the vSwitch API** 
```sh 
$ git clone https://github.com/BU-NU-CLOUD-SP16/Cloud-vSwitch.git
$ cd vSwitch-API
$ npm install
$ bower install

# setup environment variables
##  CA
$ export CACERT='...'
$ export CAKEY='...'
$ export DH='...'
## Mongo
$ export MONGO_URI='...'
## MOC
$ export MOC_USER='...'
$ export MOC_PASSWORD='...'
## Email
$ export SENDGRID_API='...'
$ export SENGRID_FROM='...'
## App
$ export TOKEN_SECRET='...'
$ export UI_ENDPOINT='...'
```

TODO: a easier way to config, i.e. user can create a config file to do it.   

To generate the API, run:
```sh
sails lift
```

2. **Setup and configure the vSwitch Portal, aka UI**
```sh 
$ git clone https://github.com/BU-NU-CLOUD-SP16/Cloud-vSwitch.git
$ cd vSwitch-UI
$ npm install
$ bower install
```
 
To run:
```sh
$ grunt serve or node index.js
```


TODO: Describe the installation process


# Usage

TODO: Write usage instructions

# Contributors

**Cloud vSwitch Team**:

Javier Arguello jas91@bu.edu   
Shuwen Sun shwsun@bu.edu   
Xuanyi Chen troychen@bu.edu   
Varshith Hakkithimmanahalli Anilkumar varshith@bu.edu   


**Mentors**:

Karl Redgate

# License

The license is GPLv3.

TODO: Write license
