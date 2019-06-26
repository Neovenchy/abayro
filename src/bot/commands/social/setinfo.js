const { Command } = require('discord-akairo');
const { emojis: { no, yes } } = require('../../util/Constants');
const { update } = require('../../database/Users');

class SinfoCommand extends Command {
	constructor() {
		super('setinfo', {
			aliases: ['setinfo', 'title', 'set-info'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			description: {
				content: 'Sets your profile info title'
			},
			args: [
				{
					id: 'info',
					match: 'text',
					type: stringTirm => stringTirm.replace(/ +/g, ' ') // < To remove white space between words!
				}
			]
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 * @param {string} [info]
 */
	async exec(message, { info }) {
		if (!info) return message.channel.send(`${no} | Info text not provided!`);
		if (info.length > 30) return message.channel.send(`${no} | The profile info characters limit is **30** only!`);
		try {
			await update(message.author.id, 'ptitle', info);
		} catch (e) {
			throw new Error(e);
		}
		return message.channel.send(`${yes} | **Updated your profile info!**`);
	}
}


module.exports = SinfoCommand;
