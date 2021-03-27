require('dotenv').config();
const { staff } = require('./bot/util/Constants');
const AbayroClient = require('./bot/client/AbayroClient');
const client = new AbayroClient({ staff });

// if (process.env.NODE_ENV === 'production') {
// 	const DBL = require('dblapi.js');
// 	const dbl = new DBL('', client);

// 	dbl.on('posted', () => {
// 		client.logger.info(`GC Posted`);
// 	});
// }

client
	.on('error', err => client.logger.error(`[CLIENT Error] ${err.stack}`))
	.on('warn', warn => client.logger.warn(`[CLIENT Warning] ${warn}`));

process.on('unhandledRejection', err => {
	client.logger.error(`[UNHANDLED REJECTION] ${err.message}`, err.stack);
});


client.start(process.env.TOKEN);
