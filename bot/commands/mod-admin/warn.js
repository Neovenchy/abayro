// const { Command } = require('discord-akairo');
// const fs = require('fs');
// const { emojis } = require('../../struct/bot');
// const { resolve } = require('path');
// const dbPath = resolve(__dirname, '../..', 'database', 'json', 'wlimit.json');
// const wlimit = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// class WarnCommand extends Command {
// 	constructor() {
// 		super('warn', {
// 			aliases: ['warn'],
// 			cooldown: 5000,
// 			ratelimit: 1,
// 			category: 'moderation',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Warns a member',
// 				usage: '@user',
// 				examples: [`mute @Abady`, `mute 171259176029257728`, 'mute Abady']
// 			},
// 			args: [
// 				{
// 					id: 'member',
// 					type: (arg, msg) => {
// 						if (!arg) return ' ';
// 						const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || arg;
// 						return member;
// 					}
// 				}
// 			],
// 			clientPermissions: ['KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_ROLES'],
// 			userPermissions: ['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_ROLES']
// 		});
// 	}

// 	exec(message, { member }) {
// 		const args = message.content.split(' ').slice(1);
// 		if (member === ' ') {
// 			return message.channel.send(`${emojis.no} **Correct usage**:
// \`=warn [user] [reason]\`.`);
// 		}
// 		const wReason = args.join(' ').slice(22);
// 		message.delete().catch(err => {
// 			this.client.logger.error(err);
// 		});

// 		if (!wlimit[message.author.id]) {
// 			wlimit[message.author.id] = {
// 				warns: 0,
// 				lastWarn: null
// 			};
// 		}

// 		member.send(`**${member} You have been warned in \`${message.guild.name}\` for \`${wReason}\`**`).then(() => {
// 			message.channel.send(`${emojis.yes} | **I warned ${member}**.`);
// 			wlimit[message.author.id].warns += 1;
// 		});
// 	}
// }

// module.exports = WarnCommand;
