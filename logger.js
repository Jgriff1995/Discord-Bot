const winston = require('winston');

const errorPath = 'logs';
const format = winston.format;
const customFormatter = format((info) => {
    return Object.assign({
        timestamp: info.timestamp
    }, info);
});

const settings = {
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new (winston.transports.File)({
            filename: errorPath + '/error.log',
            level: 'error',
            handleExceptions: true,
            stack: true,
            format: format.combine(
                format.timestamp(),
                customFormatter(),
                format.json()
            )
        }),
        new (winston.transports.File)({
            filename: errorPath + '/general.log',
            format: format.combine(
                format.timestamp(),
                customFormatter(),
                format.json()
            )
        })
    ]
};

settings.transports.push(new (winston.transports.Console)());
module.exports = new winston.createLogger(settings);