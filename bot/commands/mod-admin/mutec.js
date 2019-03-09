// const { Command } = require('discord-akairo');
// const { emojis } = require('../../struct/bot');
// class mutecCommand extends Command {
// 	constructor() {
// 		super('mutec', {
// 			aliases: ['mutec'],
// 			cooldown: 5000,
// 			ratelimit: 1,
// 			category: 'moderation',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Lock the message channel'

// 			},
// 			clientPermissions: ['MANAGE_CHANNELS'],
// 			userPermissions: ['MANAGE_CHANNELS']
// 		});
// 	}

// 	exec(message) {
// 		const language = this.client.settings.get(message.guild.id, 'language');

// 		let lockMsg;
// 		if (language === 'arabic') {
// 			lockMsg = `${emojis.yes} | **تــم قفل القناة**.`;
// 		} else if (language === 'english') {
// 			lockMsg = `${emojis.yes} | **Channel has been locked**.`;
// 		} else if (language === 'french') {
// 			lockMsg = `${emojis.yes} | **Channel a été verrouillé**.`;
// 		} else if (language === 'german') {
// 			lockMsg = `${emojis.yes} | **Kanal wurde gesperrt**.`;
// 		} else if (language === 'turkish') {
// 			lockMsg = `${emojis.yes} | **Kanal kilitlendi**.`;
// 		}
// 		message.channel.overwritePermissions(message.guild.id, {
// 			SEND_MESSAGES: false

// 		}).then(() => {
// 			message.channel.send(lockMsg);
// 		});
// 	}
// }


// module.exports = mutecCommand;
