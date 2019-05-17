const { Command } = require('discord-akairo');
const { emojis: { no } } = require('../../struct/bot');
const { users } = require('../../database/Users');
const Embed = require('../../../util/Embed');
const Sequelize = require('sequelize');

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
					[Sequelize.Op.gt]: 0
				}
			}
		});
		if (leader.length < 1) return message.channel.send(`${no} | Seems that **${message.guild.name}** doesn't have a ${method} leaderboard yet!`);
		const embed = new Embed()
			.setAuthor(`global ${method} leaderboard`.toUpperCase(), message.guild.iconURL)
			.setDescription(`\`\`\`md\n* ━━━━━━━
${leader.map((user, rank) => `#${rank + 1} ${this.client.users.get(user.id) ? this.client.users.get(user.id).username.trimLeft() : `Invaild User (${user.id})`}\n> XP: ${user[type]}xp`).join('\n')}
			\n* ━━━━━━━\`\`\``)
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
			.setTimestamp();
		return message.channel.send(embed);
	}
}

module.exports = TopCommand;
