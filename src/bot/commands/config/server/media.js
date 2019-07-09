const { Command } = require('discord-akairo');
const { emojis } = require('../../../util/Constants');
const Embed = require('../../../util/Embed');

class MediaCommand extends Command {
	constructor() {
		super('media', {
			aliases: ['media'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Shows or set a channel for pictures & videos only.',
				usage: 'turn | channel',
				examples: ['turn on', 'channel #pics']
			},
			args: [{
				id: 'autor',
				type: ['turn', 'channel']
			},
			{
			    id: 'margs',
			    match: 'word',
			    index: 1
			},
			{
				id: 'channel',
				type: 'channelMention',
				index: 1
			}]
		});
	}

	async exec(message, { autor, margs, channel }) {
		const prefix = this.handler.prefix(message);
		if (!autor) {
			await message.channel.send(`${emojis.info}** | ${message.author.username}**, Current **media settings** for **${message.guild.name}** is:`);
			message.channel.send(
				new Embed({})
				 .setAuthor(message.guild.name, message.guild.iconURL)
				 .addField('Status:', `**${this.client.settings.get(message.guild.id, 'media', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Media channel:', `**<#${this.client.settings.get(message.guild.id, 'mediaChannel', '*No channel set.*')}>**

__**[Media usage:](https://abayro.xyz/commands/media/usage)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${prefix}media turn [on/off]
* To turn on/off the media status
# Use ${prefix}media channel [#channel]
* To select the server media channel.
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``)
				 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
				 .setTimestamp()
			);
		} else if (autor === 'turn') {
			if (!margs) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'media', 'on');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **Media** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'media', '');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **Media** has been **deactivated**.`);
			}
		} else if (autor === 'channel') {
			if (!channel) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please **mention** a channel`);
			this.client.settings.set(message.guild.id, 'mediaChannel', channel.id);
			message.channel.send(`${emojis.yes}** | ${message.author.username},** **Media channel** has been set to **${channel}**.`);
		}
	}
}


module.exports = MediaCommand;
