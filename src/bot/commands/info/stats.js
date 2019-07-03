const { Command } = require('discord-akairo');
const Embed = require('../../util/Embed');
const { library: { version: botversion, node: nodeversion } } = require('../../util/Constants');
const moment = require('moment');
require('moment-duration-format');

class StatsCommand extends Command {
	constructor() {
		super('stats', {
			aliases: ['stats'],
			description: {
				content: 'Displays statistics about the bot.'
			},
			category: 'info',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2
		});
	}

	exec(message) {
		const embed = new Embed()
			.setColor('#307FFF')
			.setAuthor(`${this.client.user.username} Statistics`, this.client.user.avatarURL)
			.addField('Uptime', `• ${moment.duration(this.client.uptime).format('d[d ]h[h ]m[m ]s[s]')}`, true)
			.addField('Memory Usage', `• ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}**MB**`, true)
			.addField(`General Stats`, `• **Guilds**: ${this.client.guilds.size}\n• **Channels**: ${this.client.channels.size}\n• **Users**: ${this.client.users.size}`, true)
			.addField(
				`Versions`,
				`• **Abayro**: v${botversion}\n• **Node**: ${nodeversion}`,
				true
			)
			.addField(
				'Libs',
				`• **[discord.js](https://www.npmjs.com/package/discord.js)**\n• **[discord-akairo](https://www.npmjs.com/package/discord-akairo)**`,
				true
			)
			.addField(
				'Developers',
				`${this.client.ownerID.map(m => `• **${this.client.users.get(m).tag}**`).join('\n')}`,
				true
			)
			.setThumbnail(this.client.user.avatarURL)
			.setFooter(`© 2018-2019 ${this.client.user.tag}`);

		return message.channel.send(embed);
	}
}

module.exports = StatsCommand;
