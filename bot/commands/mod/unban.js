// const { Command } = require('discord-akairo');
// const { emojis } = require('../../struct/bot');

// class unbanCommand extends Command {
// 	constructor() {
// 		super('unban', {
// 			aliases: ['unban'],
// 			cooldown: 5000,
// 			ratelimit: 1,
// 			category: 'moderation',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Unban member by id'

// 			},
// 			clientPermissions: ['BAN_MEMBERS'],
// 			userPermissions: ['BAN_MEMBERS']
// 		});
// 	}

// 	exec(message) {
// 		const language = this.client.settings.get(message.guild.id, 'language');

// 		const args = message.content.split(' ').slice(1);
// 		const id = args.join(' ');
// 		this.client.fetchUser(id).then(user => {
// 			message.guild.unban(user.id)
// 				.then(() => {
// 					let Msg1;
// 					if (language === 'arabic') {
// 						Msg1 = `${emojis.yes} | **تـمت ازالــة الحظر من ${user}**.`;
// 					} else if (language === 'english') {
// 						Msg1 = `${emojis.yes} | ${user} **Has been unbanned**.`;
// 					} else if (language === 'french') {
// 						Msg1 = `${emojis.yes} | ${user} **a été non banni**.`;
// 					} else if (language === 'german') {
// 						Msg1 = `${emojis.yes} | ${user} **wurde nicht verboten**.`;
// 					} else if (language === 'turkish') {
// 						Msg1 = `${emojis.yes} | ${user} **unbanned olmuştur**.`;
// 					}
// 					message.channel.send(Msg1);
// 				}).catch(err => {
// 					let Msg2;
// 					if (language === 'arabic') {
// 						Msg2 = `${emojis.no} | **لــم استـطع ازالـة الحظر من ${user}**.`;
// 					} else if (language === 'english') {
// 						Msg2 = `${emojis.no} | **Failed to unban ${user}**.`;
// 					} else if (language === 'french') {
// 						Msg2 = `${emojis.no} | **Impossible de débannir ${user}**.`;
// 					} else if (language === 'german') {
// 						Msg2 = `${emojis.no} | **${user} nicht zu entsperren**.`;
// 					} else if (language === 'turkish') {
// 						Msg2 = `${emojis.no} | **Unban ${user} için başarısız**.`;
// 					}
// 					message.channel.send(Msg2);
// 					this.client.logger.error(err);
// 				});
// 		}).catch(() => {
// 			let Msg3;
// 			if (language === 'arabic') {
// 				Msg3 = ':mag_right: | **لـم استـطع ايجاد هذا المستخدم**.';
// 			} else if (language === 'english') {
// 				Msg3 = ':mag_right: | **Cannot find this user**.';
// 			} else if (language === 'french') {
// 				Msg3 = ':mag_right: | **Impossible de trouver cet utilisateur**.';
// 			} else if (language === 'german') {
// 				Msg3 = ':mag_right: | **Kann diesen Nutzer nicht finden**.';
// 			} else if (language === 'turkish') {
// 				Msg3 = ':mag_right: | **Bu Kullanıcı bulunamıyor**.';
// 			}
// 			message.channel.send(Msg3);
// 		});
// 	}
// }


// module.exports = unbanCommand;
