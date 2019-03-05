// logger.js
// ===============

const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;
const logformat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

module.exports = {

    logger: createLogger({
        format: combine(
            label({label: 'bank-server-socket'}),
            timestamp(),
            logformat
        ),
        transports: [
            new transports.Console({level: 'debug'}),
            new transports.File({filename: 'log/combined.log'})
        ]
    })

};

