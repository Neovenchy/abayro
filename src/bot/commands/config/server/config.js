const { Command } = require('discord-akairo');
const { emojis } = require('../../../struct/bot');
const Embed = require('../../../util/Embed');

class ConfigsCommand extends Command {
	constructor() {
		super('config', {
			aliases: ['config', 'configs', 'settings'],
			cooldown: 3000,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Show or enable/disable server config.',
				usage: 'enable | disable',
				examples: ['enable lvlup-msg']
			},
			args: [{
				id: 'mhandler',
				type: ['enable', 'disable']
			},
			{
				id: 'margs',
				type: ['lvlup-msg'],
				index: 1
			}]
		});
	}

	async exec(message, { mhandler, margs }) {
		const prefix = this.handler.prefix(message);
		if (!mhandler) {
			await message.channel.send(`${emojis.info}** | ${message.author.username}**, Current **config** for **${message.guild.name}** is:`);
			message.channel.send(
				new Embed()
					.setAuthor(message.guild.name, message.guild.iconURL)
					.addField('LevelUP Message:', `**${this.client.settings.get(message.guild.id, 'lvlup-msg', 'disabled')}**

__**[Config usage:](https://abayro.xyz/commands/serverlogs/usage)**__
\`\`\`md
> ━━━━━━
# Use ${prefix}config <enable/disable> lvlup-msg
* To disable/enable level-up-message
> ━━━━━━
\`\`\``)
					.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
					.setTimestamp()
			);
		} else if (mhandler === 'enable') {
			if (!margs) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please type the config feature to enable.`);
			if (margs === 'lvlup-msg') {
				this.client.settings.set(message.guild.id, 'lvlup-msg', 'enabled');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **Level up messages** has been **enabled**.`);
			}
		} else if (mhandler === 'disable') {
			if (!margs) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please type the config feature to disable.`);
			if (margs === 'lvlup-msg') {
				this.client.settings.set(message.guild.id, 'lvlup-msg', 'disabled');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **Level up messages** has been **disabled**.`);
			}
		}
	}
}


module.exports = ConfigsCommand;
