// const { Command } = require('discord-akairo');
// const {RichEmbed, Message} = require("discord.js"); //eslint-disable-line
// const { emojis } = require('../../struct/bot');
// const sql = require('sqlite');
// const moment = require('moment');

// class IDCommand extends Command {
// 	constructor() {
// 		super('id', {
// 			aliases: ['id'],
// 			cooldown: 6000,
// 			ratelimit: 5,
// 			category: 'social',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Shows the user ID card.'
// 			},
// 			args: [
// 				{
// 					'id': 'member',
// 					'type': 'member',
// 					'default': message => message.member
// 				}
// 				// {
// 				//     id: "member",
// 				//     type: (arg, msg) => {
// 				//         const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || arg
// 				//         if(member instanceof GuildMember == false) return msg.channel.send(`${emojis.no} | Not a vaild member`)
// 				//         else if(member.user.bot) return msg.channel.send(`${emojis.no} | **Bots don't have identity info.**`)
// 				//         return member
// 				//     },
// 				//     default: (message) => message.member
// 				// }
// 			]
// 		});
// 	}

// 	/**
//      *
//      * @param {Message} message
//      */
// 	exec(message, { member }) {
// 		let roles;
// 		if (member.roles.size === 1) {
// 			roles = '`None`';
// 		} else {
// 			roles = member.roles.map(role => `\`${role.name}\``).slice(1).join(', ');
// 		}
// 		message.member.crea;
// 		sql.get(`SELECT * FROM scores WHERE userId ="${member.id}"`).then(row => {
// 			if (!row) return message.channel.send(`${emojis.yes} | **Your account has been activated**.`);
// 			sql.get(`SELECT 1 + (SELECT count( * ) FROM scores a WHERE a.xp > b.xp AND guildId = ${message.guild.id} ) AS rank FROM
// scores b WHERE guildId = ${message.guild.id} AND userId = ${member.id} ORDER BY rank LIMIT 1`).then(text => {
// 				if (!text) return message.channel.send(`${emojis.no} | **\`${member.user.username}\` Isn't ranked in \`${message.guild.name}\` yet**.`);
// 				if (member.user.bot) return message.channel.send(`${emojis.no} | **Bots does not have Identity**.`);
// 				message.guild.fetchInvites().then(invites => {
// 					const invites1 = invites.filter(i => i.inviter.id === member.user.id);
// 					const invites2 = invites1.reduce((p, v) => v.uses + p, 0);
// 					const embed = new RichEmbed()
// 						.setColor('#000000')
// 						.setColor('#36393e')
// 						.setAuthor(member.user.tag, member.user.displayAvatarURL)
// 						.setThumbnail(member.user.displayAvatarURL)
// 						.setTitle('User identity info')
// 						.addField('Basic info:', `• **Name** : <@${member.id}>\n• **Nickname** : \`${member.nickname === null ? 'None' : member.nickname}\`\n• **JoinedAt** : \`${moment(member.joinedAt).format('D/M/YYYY h:mm a')}\`\n• **CreatedAt** : \`${moment(member.createdAt).format('D/M/YYYY h:mm a')}\`\n• **Roles** : ${roles}\n• **Total invites** : \`${invites2} invites\``)
// 						.addField('Text info:', `• **Text rank** : \`#${text.rank}\`\n• **Text score** : \`${row.xp}\`\n• **Text level** : \`${row.level}\``, true)
// 						.addField('Voice info:', `• **Voice rank** : \`#5216\`\n• **Voice score** : \`${row.vcpoints}\`\n• **Voice level** : \`${row.vclevel}\``, true)
// 						.setFooter(message.author.username, message.author.avatarURL)
// 						.setTimestamp();
// 					message.channel.send(embed);
// 				});
// 			});
// 		});
// 	}
// }


// module.exports = IDCommand;
