const { createLogger, format, transports } = require('winston');

const {
  timestamp: ts,
  printf,
} = format;

const myFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
  level: 'info',
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

const formatDate = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: 'debug',
    format: format.combine(
      format.colorize(),
      format.simple(),
      ts({
        format: () => formatDate(),
      }),
      myFormat,
    ),
  }));
}

const debug = (...args) => {
  logger.log('debug', ...args);
};

const info = (...args) => {
  logger.log('info', ...args);
};

const warning = (...args) => {
  logger.log('warning', ...args);
};

const error = (...args) => {
  logger.log('error', ...args);
};

module.exports = {
  debug,
  info,
  warning,
  error,
  logger,
};
