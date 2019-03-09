// const { Command } = require('discord-akairo');
// const { emojis } = require('../../struct/bot');
// class unmutecCommand extends Command {
// 	constructor() {
// 		super('unmutec', {
// 			aliases: ['unmutec'],
// 			cooldown: 5000,
// 			ratelimit: 1,
// 			category: 'moderation',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Unlock the message channel!'

// 			},
// 			clientPermissions: ['MANAGE_CHANNELS'],
// 			userPermissions: ['MANAGE_CHANNELS']
// 		});
// 	}

// 	exec(message) {
// 		message.channel.overwritePermissions(message.guild.id, {
// 			SEND_MESSAGES: true

// 		}).then(() => {
// 			message.channel.send(`${emojis.yes} | **Channel has been unlocked**.`);
// 		});
// 	}
// }


// module.exports = unmutecCommand;
