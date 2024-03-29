const { Command } = require('discord-akairo');
const { emojis } = require('../../../util/Constants');
const Embed = require('../../../util/Embed');

class GoodbyeCommand extends Command {
	constructor() {
		super('goodbye', {
			aliases: ['goodbye', 'leaving', 'goodbyer'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD', 'EMBED_LINKS'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Shows or edit and view leaving/goodbye settings.',
				usage: 'turn | setchannel | type | setmsg',
				examples: ['turn on","setchannel #welcome-goodbye', 'type embed', 'setmsg [member] left the server :(']
			},
			args: [{
				id: 'goodbye',
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
				id: 'gdbmsg',
				match: 'rest',
				index: 2
			}]
		});
	}

	async exec(message, { goodbye, margs, gdbmsg, channel }) {
		const prefix = this.handler.prefix(message);
		if (!goodbye) {
			  await message.channel.send(`${emojis.info} **|** Current **goodbyer settings** for **${message.guild.name}** is:`);
			  const embed = new Embed()
			 .setAuthor(message.guild.name, message.guild.iconURL)
			 .addField('Status:', `**${this.client.settings.get(message.guild.id, 'gdbstatus', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
			 .addField('Channel:', `**<#${this.client.settings.get(message.guild.id, 'gdbchannel', 404)}>**`, true)
			 .addField('Type:', `**${this.client.settings.get(message.guild.id, 'gdbtype', 'text')}**`, true)
			 .addField('Message:', `\`\`\`${this.client.settings.get(message.guild.id, 'gdbmsg', '[member] Left the server')}\`\`\`
__**[Goodbyer usage:](https://abayro.xyz/commands/goodbyer/usage)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${prefix}goodbye turn [on/off]
* To turn on/off the goodbye status
# Use ${prefix}goodbye setchannel [#channel]
* To change the goodbye channel
# Use ${prefix}goodbye type [text/embed/image]
* To change the goodbye type
# Use ${prefix}goodbye setmsg [goodbyeMessage]
* To set the goodbye message.
> ━━━━━━━━━━━━━━━━━━━━━
# Goodbye message placeholders:
+ [member] → Mentions the member
+ [membername] → The name of the member
+ [server] → The name of this server
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``, true)
			 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
			 .setTimestamp();
			message.channel.send(embed);
		} else if (goodbye === 'turn') {
			if (!margs) return message.channel.send(`${emojis.no} **|** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'gdbstatus', 'on');
				message.channel.send(`${emojis.yes} **|** **goodbye** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'gdbstatus', 'off');
				message.channel.send(`${emojis.yes} **|** **goodbye** has been **deactivated**.`);
			}
		} else if (goodbye === 'setchannel') {
			this.client.settings.set(message.guild.id, 'gdbchannel', channel.id);
			message.channel.send(`${emojis.yes} **|** **goodbye channel** has been **set** to **${channel}**`);
		} else if (goodbye === 'type') {
			if (!margs) return message.channel.send(`${emojis.no} **|** Please enter a **goodbye type**.`);
			if (margs === 'text') {
				this.client.settings.set(message.guild.id, 'gdbtype', 'text');
				message.channel.send(`${emojis.yes} **| goodbye type** has been **set** to **TEXT**.`);
			} else if (margs === 'embed') {
				this.client.settings.set(message.guild.id, 'gdbtype', 'embed');
				message.channel.send(`${emojis.yes} **| goodbye type** has been **set** to **EMBED**.`);
			} else if (margs === 'image') {
				this.client.settings.set(message.guild.id, 'gdbtype', 'image');
				message.channel.send(`${emojis.yes} **| goodbye type** has been **set** to **IMAGE**.`);
			}
		} else if (goodbye === 'setmsg') {
			const msg = gdbmsg;
			if (!msg) {
				message.channel.send(`${emojis.no} **|** Please enter a **goodbye message**.`);
			} else if (msg) {
				if (msg.length >= 1500) return message.channel.send(`${emojis.no}** | goodbye message** cannot be more than \`1500\` **characters**.`);
				this.client.settings.set(message.guild.id, 'gdbmsg', msg);
				message.channel.send(`${emojis.yes} **| goodbye message** has been **set** to:\n\`\`\`text\n${msg}\`\`\``);
			}
		}
	}
}


module.exports = GoodbyeCommand;
