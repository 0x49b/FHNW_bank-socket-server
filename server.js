const net = require('net');
const util = require('util');
const helper = require('./helper/helper');
const loggerHelper = require('./helper/logger');

const logger = loggerHelper.logger;

const HOST = 'localhost';
const PORT = 1337;

net.createServer(function (sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    logger.debug(util.format('New Client Connected: %s:%d', sock.remoteAddress, sock.remotePort));

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function (data) {

        logger.debug(util.format("Client %s sent data %s", sock.remoteAddress, data));
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write(data);

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function (data) {
        logger.debug(util.format("Client %s:%i closed the connection", sock.remoteAddress, sock.remotePort));
    });

}).listen(PORT, HOST);

helper.printHead();
logger.info(util.format("Server is listening on %s:%i", HOST, PORT));

