const AbayroClient = require('./client/AbayroClient');
const client = new AbayroClient();
// const DBL = require("dblapi.js");
// const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MTI0NjUxNjA2NTk5MjcwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTM3MjY1OTU0fQ.0_yRqi8EI9eS2hr0GFT6xm5tdJKdoyJEFa2kSs9eQMs', client);


client
	.on('error', err => client.logger.error(`[CLIENT Error] ${err.stack}`))
	.on('warn', warn => client.logger.warn(`[CLIENT Warning] ${warn}`));


// dbl.on('posted', () => {
//     client.logger.info(`GC Posted`)
// })

process.on('unhandledRejection', reason => {
	client.logger.warn(reason);
});


client.start();
