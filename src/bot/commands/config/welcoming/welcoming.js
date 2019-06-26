const { Command } = require('discord-akairo');
const { emojis } = require('../../../util/Constants');
const Embed = require('../../../util/Embed');

class WlcmCommand extends Command {
	constructor() {
		super('welcoming', {
			aliases: ['welcoming', 'welcome', 'welcomer'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD', 'EMBED_LINKS'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'To edit and view welcoming settings.',
				usage: 'turn | setchannel | type | setmsg',
				examples: ['turn on', 'setchannel welcome', 'type embed', 'setmsg مرحبا بك في سيرفرنا']
			},
			args: [{
				id: 'welcoming',
				type: ['turn', 'setchannel', 'type', 'setmsg']
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
			},
			{
				id: 'wlcmsg',
				match: 'rest'
			}]
		});
	}

	async exec(message, { welcoming, margs, wlcmsg, channel }) {
		const prefix = this.handler.prefix(message);
		if (!welcoming) {
			await message.channel.send(`${emojis.info} **|** Current **welcomer settings** for **${message.guild.name}** is:`);
			const embed = new Embed()
			 .setColor('#FB542B')
			 .setAuthor(message.guild.name, message.guild.iconURL)
			 .addField('Status:', `**${this.client.settings.get(message.guild.id, 'wlcstatus', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
			 .addField('Channel:', `**<#${this.client.settings.get(message.guild.id, 'wlcchannel', 404)}>**`, true)
			 .addField('Type:', `**${this.client.settings.get(message.guild.id, 'wlctype', 'text')}**`, true)
			 .addField('Message:', `\`\`\`${this.client.settings.get(message.guild.id, 'wlcmsg', '[member] Joined the server')}\`\`\`
__**[Welcomer usage:](https://abayro.xyz/commands/welcoming/usage)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${prefix}welcoming turn [on/off]
* To turn on/off the welcoming status
# Use ${prefix}welcoming setchannel [#channel]
* To change the welcoming channel
# Use ${prefix}welcoming type [text/embed/image]
* To change the welcoming type
# Use ${prefix}welcoming setmsg [message]
* To set the welcoming message.
> ━━━━━━━━━━━━━━━━━━━━━
# Welcoming message placeholders:
+ [member] → Mentions the member
+ [membername] → The name of the member
+ [server] → The name of this server
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``, true)
			 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
			 .setTimestamp();
			message.channel.send(embed);
		} else if (welcoming === 'turn') {
			if (!margs) return message.channel.send(`${emojis.no} **|** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'wlcstatus', 'on');
				message.channel.send(`${emojis.yes} **|** **Welcoming** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'wlcstatus', 'off');
				message.channel.send(`${emojis.yes} **|** **Welcoming** has been **deactivated**.`);
			}
		} else if (welcoming === 'setchannel') {
			if (!channel) return message.channel.send(`${emojis.no} **|** Please **mention** a channel`);
			this.client.settings.set(message.guild.id, 'wlcchannel', channel.id);
			message.channel.send(`${emojis.yes} **|** **Welcoming channel** has been **set** to **${channel}**`);
		} else if (welcoming === 'type') {
			if (!margs) return message.channel.send(`${emojis.no} **|** Please enter a **welcoming type**.`);
			if (margs === 'text') {
				this.client.settings.set(message.guild.id, 'wlctype', 'text');
				message.channel.send(`${emojis.yes} **| Welcoming type** has been **set** to **TEXT**.`);
			} else if (margs === 'embed') {
				this.client.settings.set(message.guild.id, 'wlctype', 'embed');
				message.channel.send(`${emojis.yes} **| Welcoming type** has been **set** to **EMBED**.`);
			} else if (margs === 'image') {
				this.client.settings.set(message.guild.id, 'wlctype', 'image');
				message.channel.send(`${emojis.yes} **| Welcoming type** has been **set** to **IMAGE**.`);
			}
		} else if (welcoming === 'setmsg') {
			if (!wlcmsg) {
				message.channel.send(`${emojis.no} **|** Please enter a **welcoming message**.`);
			} else if (wlcmsg) {
				if (wlcmsg.length >= 1500) return message.channel.send(`${emojis.no}**| Welcoming message** cannot be more than \`1500\` **characters**.`);
				this.client.settings.set(message.guild.id, 'wlcmsg', wlcmsg);
				message.channel.send(`${emojis.yes} **| Welcoming message** has been **set** to:\n\`\`\`text\n${wlcmsg}\`\`\``);
			}
		}
	}
}

module.exports = WlcmCommand;
