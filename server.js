const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

let port = process.env.PORT || 5050

let server = http.createServer(app)

module.exports.io= socketIO(server)
require("./socket")


server.listen(port, () =>{
    console.log("Listen on: "+port)
})