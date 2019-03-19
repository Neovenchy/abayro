const { Command } = require('discord-akairo');
const Embed = require('../util/Embed');
const { emojis } = require('../struct/bot');
const categoriesEmojis = [{
	id: 'moderation',
	emoji: '🔧'
},
{
	id: 'ulti',
	emoji: '🔆'
},
{
	id: 'config',
	emoji: '⚙'
},
{
	id: 'game',
	emoji: '🎮'
},
{
	id: 'social',
	emoji: '👥'
},
{
	id: 'general',
	emoji: '🌐'
},
{
	id: 'info',
	emoji: 'ℹ'
}];

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help'],
			cooldown: 5000,
			ratelimit: 3,
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Shows the bot help list.'
			},
			args: [{
				id: 'command',
				type: cmd => {
					if (!cmd) return ' ';
					const command = this.handler.modules.filter(modulex => !modulex.ownerOnly).find(commando => commando.aliases.includes(cmd));
					if (!command) return cmd;
					return command;
				}
			}]
		});
	}

	async exec(message, { command }) {
		const prefix = this.handler.prefix(message);
		if (command === ' ') {
			try {
				await message.author.send(`**Abayro's Help:**\n**~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~**`);
				message.channel.send(`${emojis.yes}**| ${message.author.username}**, I've sent you my **commands list**.`);
			} catch (error) {
				return message.channel.send(`${emojis.no}**| ${message.author.username}**, You are blocking **direct messages**.`);
			}
			const allhelplist = [];
			this.handler.categories.filter(c => c.id !== 'default').forEach(category => {
				const categoryEmoji = categoriesEmojis.find(m => m.id === category.id.toLowerCase()) || {
					emoji: ''
				};
				return allhelplist.push(`**${categoryEmoji.emoji} ${category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())} Commands**:\n\n**${category.filter(cmd => cmd.aliases.length).map(cmd => `❯ \`${this.handler.prefix(message)}${cmd.aliases[0]}\` → ${cmd.description.content}`).join('\n')}\n**\n**~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~~~━~~**\n`);
			});
			// TODO: if you want less message sents just do sort() in allhelplist.
			allhelplist.sort((a, b) => a.length - b.length);
			const store = [];
			allhelplist.forEach(categroy => {
				if (categroy.length >= 1998 || categroy.length + store.join('').length >= 1998) {
					message.author.send(categroy);
				} else if (store.join('').length + categroy.length <= 1998) {
					store.push(categroy);
				}
			});
			return message.author.send(store.join('').toString());
		}
		if (command.id === 'welcoming') {
			return message.channel.send(`\`\`\`md
# Use ${prefix}welcoming turn [on/off]
To turn on/off the welcoming status
# Use ${prefix}welcoming setchannel [#channel]
To change the welcoming channel
# Use ${prefix}welcoming type [text/embed/image]
To change the welcoming type
# Use ${prefix}welcoming setmsg [message]
To set the welcoming message.
> Welcoming message placeholders:
+ [member] → Mentions the joined member
+ [membername] → Sends the joined member username
+ [guild] → Sends the name of the guild
\`\`\``);
		}
		if (!command.aliases) return message.channel.send(`${emojis.no} | No command with the name **${command}** was found.`);
		const embed = new Embed()
			.setAuthor(`${command.aliases[0].replace(/(\b\w)/gi, lc => lc.toUpperCase())} Command Help`, 'https://cdn.discordapp.com/emojis/520644584632745994.png?v=1')
			.addField('• Description:', command.description.content || '\u200b');
		if (command.aliases.length > 1) embed.addField('• Aliases:', `\`${command.aliases.join('` `')}\``, true);
		if (command.description.examples && command.description.examples.length) embed.addField('• Examples:', `\`${prefix}${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``, true);
		if (command.description.usage) embed.addField('• Usage:', `\`${prefix}${command.aliases[0]} ${command.description.usage}\``, true);
		if (command.userPermissions && command.userPermissions > 1) embed.addField(`• Required Permission`, command.userPermissions.join(' ,'));

		return message.channel.send(embed);
	}
}

module.exports = HelpCommand;
