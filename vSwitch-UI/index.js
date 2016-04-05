// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var http = require("http")
var port = process.env.PORT || 5000

// configuration =================

app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(express.static(__dirname));                 // set the static files location /public/img will be /img for users
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// listen (start app with node server.js) ======================================
var server = http.createServer(app);
server.listen(port);
var io = require('socket.io')(server, {origins:'*'});

console.log("http server listening on %d", port)

