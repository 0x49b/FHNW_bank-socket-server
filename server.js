const net = require('net');
const util = require('util');
const helper = require('./helper');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;

const HOST = '127.0.0.1';
const PORT = 1337;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};

const logformat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({label: 'bank-server-socket'}),
        timestamp(),
        logformat
    ),
    transports: [
        new transports.Console({level: 'debug'}),
        new transports.File({filename: 'combined.log'})
    ]
});



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

