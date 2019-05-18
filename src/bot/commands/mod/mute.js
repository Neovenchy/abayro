// const { Command } = require('discord-akairo');
// const fs = require('fs');
// const { resolve } = require('path');
// const dbPath = resolve(__dirname, '../..', 'database', 'json', 'mlimit.json');
// const mlimit = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
// const sql = require('sqlite');
// const { emojis } = require('../../struct/bot');
// class MuteCommand extends Command {
// 	constructor() {
// 		super('mute', {
// 			aliases: ['mute'],
// 			cooldown: 5000,
// 			ratelimit: 1,
// 			category: 'moderation',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Mutes a member',
// 				usage: '@user',
// 				examples: [`mute @Abady`, `mute 171259176029257728`, 'mute Abady']
// 			},
// 			args: [{
// 				id: 'member',
// 				type: (arg, msg) => {
// 					if (!arg) return ' ';
// 					const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || arg;
// 					return member;
// 				}
// 			}],
// 			clientPermissions: ['MANAGE_ROLES', 'MANAGE_GUILD'],
// 			userPermissions: ['MANAGE_ROLES']
// 		});
// 	}

// 	exec(message, { member }) {
// 		const language = this.client.settings.get(message.guild.id, 'language');

// 		let msgS;
// 		if (language === 'arabic') {
// 			msgS = [`${emojis.no} | **الأستخدام الصحيح للأمر**:\n\`=mute [@user/user/userID]\``, `${emojis.no} | **لا يمكنك اعطاء كتم لعضو من ادارة السيرفر**.`, `**تم اعطاء كتم كتابي الى**.`];
// 		} else if (language === 'english') {
// 			msgS = [`${emojis.no} | **Correct usage**:\n\`=mute [@user/user/userID]\``, `${emojis.no} | **You can't mute a staff member**.`, `**Has been muted**.`];
// 		} else if (language === 'french') {
// 			msgS = [`${emojis.no} | **Utilisation correcte**:\n=mute [@user/user/userID]\``, `${emojis.no} | **Vous ne pouvez pas couper un membre du personnel**.`, `**a été muet**.`];
// 		} else if (language === 'german') {
// 			msgS = [`${emojis.no} | **Richtige Nutzung**:\n\`=mute [@user/user/userID]\``, `${emojis.no} | **Man kann einen Mitarbeiter nicht stumm machen**.`, `**Wurde gedämpft**.`];
// 		} else if (language === 'turkish') {
// 			msgS = [`${emojis.no} | **Doğru kullanım**:\n\`=mute [@user/user/userID]\``, `${emojis.no} | **Bir personel sesini kapatamazsınız.**.`, `**Sessiz oldu**.`];
// 		}

// 		let notFound;
// 		if (language === 'arabic') {
// 			notFound = `\`${member}\` **لم يتم العثور على**.`;
// 		} else if (language === 'english') {
// 			notFound = `\`${member}\` **was not found**.`;
// 		} else if (language === 'french') {
// 			notFound = `\`${member}\` **n'a pas été trouvé**.`;
// 		} else if (language === 'german') {
// 			notFound = `\`${member}\` **Nicht gefunden**.`;
// 		} else if (language === 'turkish') {
// 			notFound = `\`${member}\` **bulunamadı**.`;
// 		}

// 		let alrdM;
// 		if (language === 'arabic') {
// 			alrdM = `هـذا الـشـخـص لديه كتم كتابي بالفعل`;
// 		} else if (language === 'english') {
// 			alrdM = `This user is already muted`;
// 		} else if (language === 'french') {
// 			alrdM = `Cet utilisateur est déjà en sourdine`;
// 		} else if (language === 'german') {
// 			alrdM = `Dieser Benutzer ist bereits gedämpft`;
// 		} else if (language === 'turkish') {
// 			alrdM = `Bu Kullanıcı zaten sessiz`;
// 		}

// 		const muteRole = message.guild.roles.find(r => r.name === 'Muted');
// 		if (!muteRole) {
// 			message.guild.createRole({
// 				name: 'Muted',
// 				color: 'BLACK',
// 				mentionable: false
// 			});
// 		}
// 		if (member === ' ') return message.channel.send(msgS[0]);
// 		if (!member.id) return message.channel.send(`${emojis.no} | ${notFound}`);
// 		if (member.hasPermission('MANAGE_GUILD')) return message.channel.send(msgS[1]);
// 		if (message.guild.member(member).roles.has(muteRole.id)) return message.channel.send(`${emojis.no} | **${alrdM}**.`);

// 		let muteMsg2;
// 		if (language === 'arabic') {
// 			muteMsg2 = `${emojis.no} | **لا يمكنك اعطاء كتم الى نفسك**.`;
// 		} else if (language === 'english') {
// 			muteMsg2 = `${emojis.no} | **You cannot mute yourself**.`;
// 		} else if (language === 'french') {
// 			muteMsg2 = `${emojis.no} | **Vous ne pouvez pas vous couper**.`;
// 		} else if (language === 'german') {
// 			muteMsg2 = `${emojis.no} | **Du kannst dich nicht stumm machen**.`;
// 		} else if (language === 'turkish') {
// 			muteMsg2 = `${emojis.no} | **Kendinizi susturamazsınız**.`;
// 		}

// 		if (member.id === message.author.id) return message.channel.send(muteMsg2);
// 		if (!mlimit[message.author.id]) {
// 			mlimit[message.author.id] = {
// 				mutes: 0,
// 				lastMute: null
// 			};
// 		}
// 		if (mlimit[message.author.id].mutes >= this.client.settings.get(message.guild.id, 'mutelimit')) {
// 			if (message.author.id === message.guild.ownerID || message.guild.member(message.author).hasPermission('MANAGE_GUILD') || message.guild.member(message.author).roles.has(bypsrole)) return;
// 			message.channel.send(`:stopwatch: | **You have reached your max kick limits, you can kick again tommorow**.`);
// 		} else {
// 			message.guild.member(member).addRole(muteRole).then(() => {
// 				if (language === 'arabic') {
// 					message.channel.send(`:zipper_mouth: | ${msgS[2]} \`${member.user.username}\``);
// 				} else {
// 					message.channel.send(`:zipper_mouth: | \`${member.user.username}\` ${msgS[2]}`);
// 				}
// 				mlimit[message.author.id].mutes += 1;
// 			});
// 		}
// 	}
// }

// module.exports = MuteCommand;
