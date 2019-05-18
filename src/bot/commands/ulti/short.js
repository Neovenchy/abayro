const { Command } = require('discord-akairo');
const short = require('isgd');
const { emojis } = require('../../struct/bot');

class ShortCommand extends Command {
	constructor() {
		super('short', {
			aliases: ['short'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'util',
			channelRestriction: 'guild',
			description: {
				content: 'Shorten the url provided',
				usage: '<url> [custom]',
				examples: ['https://google.com', 'https://twitter.com/ii_abady mytwitter']
			},
			args: [{
				id: 'link',
				type: 'url'
			},
			{
				id: 'custom',
				type: 'string'
			}]
		});
	}

	exec(message, { link, custom }) {
		if (custom) {
			short.custom(link, custom, url => {
				if (url.startsWith('Error:')) return message.channel.send(`${emojis.no} | **There was an error while getting information from the \`API\`**.`);
				return message.channel.send(`:link: | **Here is your shorted URL :\n[ ${url} ]**`);
			});
		} else {
			short.shorten(link, url => {
				if (url.startsWith('Error:')) return message.channel.send(`${emojis.no} | **There was an error while getting information from the \`API\`**.`);
				return message.channel.send(`:link: | **Here is your shorted URL :\n[ ${url} ]**`);
			});
		}
	}
}
module.exports = ShortCommand;
