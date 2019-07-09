const { Command } = require('discord-akairo');
const { emojis } = require('../../../util/Constants');
const Embed = require('../../../util/Embed');

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
				content: 'Shows or edit server-protection features.',
				usage: 'anti-nsfw | anti-bj | anti-adv | anti-spam || on/off',
				examples: ['antibotjoin on', 'antiadv on', 'antispam on']
			},
			args: [{
				id: 'mhandler',
				type: ['anti-nsfw', 'anti-bj', 'anti-adv', 'anti-spam']
			},
			{
			    id: 'margs',
			    index: 1
			}]
		});
	}

	async exec(message, { mhandler, margs }) {
		const prefix = this.handler.prefix(message);
		if (!mhandler) {
			await message.channel.send(`${emojis.info}** | ${message.author.username}**, Current **protection settings** for **${message.guild.name}** is:`);
			message.channel.send(
				new Embed()
				 .setAuthor(message.guild.name, message.guild.iconURL)
				 .addField('Anti-NSFW:', `**${this.client.settings.get(message.guild.id, 'antinsfw', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Anti-bot joining:', `**${this.client.settings.get(message.guild.id, 'antibotj', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Anti-advertise:', `**${this.client.settings.get(message.guild.id, 'antiadv', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Anti-spam:', `**${this.client.settings.get(message.guild.id, 'antispam', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**

__**[Protection usage:](https://abayro.xyz/commands/)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${prefix}protection anti-nsfw [on/off]
* To turn on/off the anti-nsfw status
# Use ${prefix}protection anti-bj [on/off]
* To turn on/off the anti-bot joining status
# Use ${prefix}protection anti-adv [on/off]
* To turn on/off the anti-advertise status
# Use ${prefix}protection anti-spam [on/off]
* To turn on/off the anti-spam status
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``)
				 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
				 .setTimestamp()
			);
		} else if (mhandler === 'anti-nsfw') {
			if (!margs) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'antinsfw', 'on');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-NSFW** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'antinsfw', 'off');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-NSFW** has been **deactivated**.`);
			}
		} else if (mhandler === 'anti-bj') {
			if (!margs) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'antibotj', 'on');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-BJ** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'antibotj', 'off');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-BJ** has been **deactivated**.`);
			}
		} else if (mhandler === 'anti-adv') {
			if (!margs) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'antiadv', 'on');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-ADV** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'antiadv', 'off');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-ADV** has been **deactivated**.`);
			}
		} else if (mhandler === 'anti-spam') {
			if (!margs) return message.channel.send(`${emojis.no}** | ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'antispam', 'on');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-SPAM** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'antispam', 'off');
				message.channel.send(`${emojis.yes}** | ${message.author.username},** **ANTI-SPAM** has been **deactivated**.`);
			}
		}
	}
}


module.exports = PROTCommand;
