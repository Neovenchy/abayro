const { Command } = require('discord-akairo');
const { emojis } = require('../util/Constants');

class ReloadCommand extends Command {
	constructor() {
		super('reload', {
			aliases: ['reload', 'r'],
			ownerOnly: true,
			quoted: false,
			args: [{
				'id': 'type',
				'match': 'prefix',
				'prefix': ['type:'],
				'type': [
					['command', 'c'],
					['inhibitor', 'i'],
					['listener', 'l']
				],
				'default': 'command'
			},
			{
				id: 'module',
				type: (word, message, {
					type
				}) => {
					if (!word) return null;
					const resolver = this.handler.resolver.type({
						command: 'commandAlias',
						listener: 'listener'
					}[type]);

					return resolver(word);
				}
			}]
		});
	}

	exec(message, {
		type,
		module: mod
	}) {
		if (!mod) {
			this.handler.reloadAll();
			return message.channel.send(`${emojis.yes}** | ${message.author.username}**, Done, I **reloaded** all **commands**.`);
		}
		try {
			mod.reload();
			return message.channel.send(`${emojis.yes}** | ${message.author.username}**, I **reloaded**: \`${mod.id}\` **${type}**.`);
		} catch (err) {
			return message.channel.send(`${emojis.no}** | ${message.author.username}**, Failed to **reload**: ${type} \`${mod.id}\`.`);
		}
	}
}

module.exports = ReloadCommand;
