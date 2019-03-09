const { Command } = require('discord-akairo');
const Embed = require('../../util/Embed');
const { emojis: { no } } = require('../../struct/bot');
const { users, Op } = require('../../database/Users');

class TopCommand extends Command {
	constructor() {
		super('top', {
			aliases: ['top'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Shows top 10 text & voice leaders in your server!',
				examples: ['', 'text', 'voice'],
				usage: ['[text/voice]']
			},
			args: [{
				'id': 'method',
				'type': ['text', 'voice'],
				'default': 'text'
			}, {
				'id': 'page',
				'type': 'integer',
				'default': 1
			}]
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 */
	async exec(message, { method, page }) {
		if (!page) return message.channel.send(`${no} | Please insert a vaild number.`);
		const type = method === 'voice' ? 'voicexp' : 'textxp';
		const leader = await users.findAll({
			order: [[type, 'DESC']], offset: (page * 10) - 10, limit: 10, attributes: ['id', type], where: {
				[type]: {
					[Op.gt]: 0
				}
			}
		});
		if (leader.length < 1) return message.channel.send(`${no} | Seems that **${message.guild.name}** doesn't have a ${method} leaderboard yet!`);
		const embed = new Embed()
			.setTitle(`**global ${method} leaderboard**`.toUpperCase())
			.setDescription(
				leader.map(user => `**${this.client.users.get(user.id).username || 'User Left'}**  XP: **${user[type]}**xp`)
			);
		return message.channel.send(embed);
	}
}

module.exports = TopCommand;
