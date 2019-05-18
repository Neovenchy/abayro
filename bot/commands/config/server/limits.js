const { Command } = require('discord-akairo');
const { emojis } = require('../../../struct/bot');
const Embed = require('../../../util/Embed');

class LimitsCommand extends Command {
	constructor() {
		super('limits', {
			aliases: ['limits'],
			cooldown: 3000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Show or set ban/kick/mute command usage limit per day.'
			},
			args: [{
				id: 'limit',
				type: ['banlimit', 'kicklimit', 'mutelimit'],
				index: 0
			},
			{
				id: 'limitnum',
				type: 'integer',
				index: 1
			}]
		});
	}

	async exec(message, { limit, limitnum }) {
		const prefix = this.handler.prefix(message);
		if (!limit) {
			await message.channel.send(`${emojis.info}** | ${message.author.username}**, Current **limits settings** for **${message.guild.name}** is:`);
			message.channel.send(
				new Embed()
				 .setAuthor(message.guild.name, message.guild.iconURL)
				 .addField('Bans limit:', `**${this.client.settings.get(message.guild.id, 'banlimit', 20)}** bans per day`, true)
				 .addField('Kicks limit:', `**${this.client.settings.get(message.guild.id, 'kicklimit', 20)}** kicks per day`, true)
				 .addField('Mutes limit:', `**${this.client.settings.get(message.guild.id, 'mutelimit', 20)}** mutes per day

__**[Limits usage:](https://abayro.xyz/commands/media/usage)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${prefix}limits banlimit [1-20]
* To set the bans limit per day
# Use ${prefix}limits kicklimit [1-20]
* To set the kicks limit per day
# Use ${prefix}limits mutelimit [1-20]
* To set the mutes limit per day
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``)
				 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
				 .setTimestamp()
			);
		} else if (limit === 'banlimit') {
			if (!limitnum) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter the **ban limit** to set.`);
			if (limitnum > 20 || limitnum < 1) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter a **limit** between **\`1\` & \`20\`**.`);
			if (isNaN(limitnum)) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter a **valid number**.`);
			await this.client.settings.set(message.guild.id, 'banlimit', parseInt(limitnum, 10));
			return message.channel.send(`${emojis.yes}** | ${message.author.username}**, The **ban limit** for **${message.guild.name}** has been set to \`${limitnum}\`.`);
		} else if (limit === 'kicklimit') {
			if (!limitnum) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter the **kick limit** to set.`);
			if (limitnum > 20 || limitnum < 1) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter a **limit** between **\`1\` & \`20\`**.`);
			if (isNaN(limitnum)) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter a **valid number**.`);
			await this.client.settings.set(message.guild.id, 'kicklimit', parseInt(limitnum, 10));
			return message.channel.send(`${emojis.yes}** | ${message.author.username}**, The **kick limit** for **${message.guild.name}** has been set to \`${limitnum}\`.`);
		} else if (limit === 'mutelimit') {
			if (!limitnum) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter the **mute limit** to set.`);
			if (limitnum > 20 || limitnum < 1) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please enter a **limit** between **\`1\` & \`20\`**.`);
			if (isNaN(limitnum)) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter a **valid number**.`);
			await this.client.settings.set(message.guild.id, 'mutelimit', parseInt(limitnum, 10));
			return message.channel.send(`${emojis.yes}** | ${message.author.username}**, The **mute limit** for **${message.guild.name}** has been set to \`${limitnum}\`.`);
		} else {
			return message.channel.send(`${emojis.no}** | ${message.author.username}**, Invalid **usage**.`);
		}
	}
}


module.exports = LimitsCommand;
