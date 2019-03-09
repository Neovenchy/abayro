const { toSeconds, parse } = require('iso8601-duration');
const { tokens } = require('../struct/bot');
const fetch = require('node-fetch');

module.exports = async id => {
	const url = encodeURI(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${tokens.youtube}&part=contentDetails`);
	try {
		const fetched = await fetch(url);
		const res = await fetched.json();
		const duration = toSeconds(parse(res.items[0].contentDetails.duration)) || 0;
		return duration;
	} catch (error) {
		this.client.logger.error(error);
	}
};
