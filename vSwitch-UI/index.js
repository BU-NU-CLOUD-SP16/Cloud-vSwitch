// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var http = require("http")
var port = process.env.PORT || 5000

// configuration =================

app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(express.static(__dirname));                 // set the static files location /public/img will be /img for users

// listen (start app with node server.js) ======================================
var server = http.createServer(app)
server.listen(port);
console.log("http server listening on %d", port)

