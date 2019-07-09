require('dotenv').config();
const { staff } = require('./bot/util/Constants');
const AbayroClient = require('./bot/client/AbayroClient');
const client = new AbayroClient({ owners: staff });

// if (process.env.NODE_ENV === 'production') {
// 	const DBL = require('dblapi.js');
// 	const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MTI0NjUxNjA2NTk5MjcwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTM3MjY1OTU0fQ.0_yRqi8EI9eS2hr0GFT6xm5tdJKdoyJEFa2kSs9eQMs', client);

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
