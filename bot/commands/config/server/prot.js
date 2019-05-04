const { Command } = require('discord-akairo');
const { emojis } = require('../../../struct/bot');
const { RichEmbed } = require('discord.js');

class PROTCommand extends Command {
	constructor() {
		super('protection', {
			aliases: ['protection', 'prot'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'to edit server-protection features',
				usage: 'antibotjoin | antiadv | antispam || on/off',
				examples: ['protection antibotjoin on', 'prot antiadv on', 'prot antispam on']
			},
			args: [{
				id: 'mhandler',
				type: 'string'
			},
			{
			    id: 'margs',
			    match: 'word',
			    index: 1
			}]
		});
	}

	async exec(message, {
		mhandler, margs
	}) {
		if (!mhandler) {
			await message.channel.send(`${emojis.info}**| ${message.author.username}**, Current **protection settings** for **${message.guild.name}** is:`);
			message.channel.send(
				new RichEmbed()
				 .setColor('#FB542B')
				 .setAuthor(message.guild.name, message.guild.iconURL)
				 .addField('Anti Bot join:', `**${this.client.settings.get(message.guild.id, 'antibotj', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Anti advertise:', `**${this.client.settings.get(message.guild.id, 'antiadv', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Anti spam:', `**${this.client.settings.get(message.guild.id, 'antispam', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**

__**[Protection usage:](https://abayro.xyz/commands/media/usage)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${this.client.commandHandler.prefix(message)}protection antibotjoin [on/off]
* To turn on/off the antiBotJoin status
# Use ${this.client.commandHandler.prefix(message)}protection antiadv [on/off]
* To turn on/off the antiAdvertise status
# Use ${this.client.commandHandler.prefix(message)}protection antispam [on/off]
* To turn on/off the antiSpam status
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``)
				 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
				 .setTimestamp()
			);
		} else if (mhandler === 'antibotjoin') {
			if (!margs) return message.channel.send(`${emojis.no}**| ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'antibotj', 'on');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Antibotjoin** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'antibotj', 'off');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Antibotjoin** has been **deactivated**.`);
			}
		} else if (mhandler === 'antiadv') {
			if (!margs) return message.channel.send(`${emojis.no}**| ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'antiadv', 'on');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Antiadvertise** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'antiadv', 'off');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Antiadvertise** has been **deactivated**.`);
			}
		} else if (mhandler === 'antispam') {
			if (!margs) return message.channel.send(`${emojis.no}**| ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'antispam', 'on');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Antispam** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'antispam', 'off');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Antispam** has been **deactivated**.`);
			}
		}
	}
}


module.exports = PROTCommand;
