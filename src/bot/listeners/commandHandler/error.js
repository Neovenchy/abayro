const { Listener } = require('discord-akairo');
const { channels } = require('../../util/Constants');
const Embed = require('../../util/Embed');

class ErrorListner extends Listener {
	constructor() {
		super('error', {
			emitter: 'commandHandler',
			eventName: 'error',
			category: 'commandHandler'
		});
	}

	// TODO: instead of this way, use sentry(raven) for better error tracking!
	exec(error, message, command) {
		if (command) {
            const errorMessage = error.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''); //eslint-disable-line
			const id = command.id + errorMessage.length + command.id.length;
			this.client.logger.error(error);
			message.client.channels.get(channels.error).send(new Embed()
				.setTitle(`**Error ${command.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())}** \`\`${id}\`\``)
				.setURL('https://abayro.xyz/command-error/')
				.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)
				.addField('Command', `id: ${command.id}\naliases: ${command.aliases}\ncategory: ${command.category}`, true)
				.addField('User', `id: ${message.author.id}\nusername: ${message.author.username}`, true)
				.addField('Guild', `id: ${message.guild.id}\nname: ${message.guild.name}`, true)
				.addField('Message', `id: ${message.id}\ncontent: ${message.content}`, true)
				.setTimestamp()
				.setFooter(id)
				.setThumbnail('https://image.flaticon.com/icons/png/512/559/559347.png')
				.setColor('RED'));
		}
		this.client.logger.error(error, error.stack);
	}
}
module.exports = ErrorListner;
