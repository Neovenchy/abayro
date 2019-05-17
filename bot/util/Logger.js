const { createLogger, transports, format } = require('winston');
const moment = require('moment');

module.exports = createLogger({
	format: format.combine(
		format.colorize({
			all: true
		}),
		format.timestamp({
			format: moment().utcOffset('+03:00').format('YYYY/MM/DD HH:mm:ss')
		}),
		format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
	transports: [new transports.Console()]
});
