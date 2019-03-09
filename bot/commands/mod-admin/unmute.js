// const { Command } = require('discord-akairo');
// const { emojis } = require('../../struct/bot');
// class UnMuteCommand extends Command {
// 	constructor() {
// 		super('unmute', {
// 			aliases: ['unmute'],
// 			cooldown: 5000,
// 			ratelimit: 1,
// 			category: 'moderation',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Unmutes a member',
// 				usage: '@user',
// 				examples: [`unmute @Abady`, `unmute 171259176029257728`, 'unmute Abady']
// 			},
// 			args: [{
// 				id: 'member',
// 				type: (arg, msg) => {
// 					if (!arg) return ' ';
// 					const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || arg;
// 					return member;
// 				}
// 			}],
// 			clientPermissions: ['MANAGE_ROLES'],
// 			userPermissions: ['MANAGE_ROLES']
// 		});
// 	}

// 	exec(message, { member }) {
// 		const language = this.client.settings.get(message.guild.id, 'language');

// 		const muteRole = message.guild.roles.find(r => r.name === 'Muted');
// 		let msgS;
// 		if (language === 'arabic') {
// 			msgS = [`${emojis.no} | **الأستخدام الصحيح للأمر**:\n\`=unmute [@user/user/userID]\``, 'هذا الشخص ليس لديه كتم كتابي', `**تم فك الكتم الكتابي من**.`];
// 		} else if (language === 'english') {
// 			msgS = [`${emojis.no} | **Correct usage**:\n\`=unmute [@user/user/userID]\``, 'This user is already unmuted', `**Has been unmuted**.`];
// 		} else if (language === 'french') {
// 			msgS = [`${emojis.no} | **Utilisation correcte**:\n\`=unmute [@user/user/userID]\``, 'Cet utilisateur est déjà sans sourdine', `**a été sans sourdine**.`];
// 		} else if (language === 'german') {
// 			msgS = [`${emojis.no} | **Richtige Nutzung**:\n\`=unmute [@user/user/userID]\``, 'Dieser Benutzer ist bereits unmutbar', `**ist entmutigt**.`];
// 		} else if (language === 'turkish') {
// 			msgS = [`${emojis.no} | **Doğru kullanım**:\n\`=unmute [@user/user/userID]\``, 'Bu Kullanıcı zaten Unmuted', `**Unmuted oldu**.`];
// 		}
// 		if (member === ' ') return message.channel.send(msgS[0]);
// 		if (!message.guild.member(member).roles.has(muteRole.id)) return message.channel.send(`${emojis.no} | **${msgS[1]}**.`);
// 		message.guild.member(member).removeRole(muteRole);
// 		if (language === 'arabic') {
// 			message.channel.send(`:hushed: | ${msgS[2]} \`${member.user.username}\``);
// 		} else {
// 			message.channel.send(`:hushed: | \`${member.user.username}\` ${msgS[2]}`);
// 		}
// 	}
// }

// module.exports = UnMuteCommand;
