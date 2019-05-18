// const { Command } = require('discord-akairo');
// const Discord = require('discord.js');

// class mutelistCommand extends Command {
// 	constructor() {
// 		super('mutelist', {
// 			aliases: ['mutelist'],
// 			cooldown: 5000,
// 			ratelimit: 1,
// 			category: 'moderation',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Muted users list'

// 			},
// 			clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS']
// 		});
// 	}

// 	exec(message) {
// 		const language = this.client.settings.get(message.guild.id, 'language');

// 		const role = message.guild.roles.find('name', 'Muted') || message.guild.roles.find('name', 'muted');
// 		let i = 0;
// 		let mutelist;
// 		message.guild.members.filter(m => m.roles.has(role.id)).forEach(member => {
// 			i++;
// 			mutelist += `**#${i}** \`-\` <@${member.id}>\n`;
// 		});

// 		let mlistMSG;
// 		if (language === 'arabic') {
// 			mlistMSG = [`لا يــوجد احد يملك كتم كتابي بهذا السيرفر`, `الأشخاص الصامتون :`];
// 		} else if (language === 'english') {
// 			mlistMSG = [`No one is muted in this server`, `Muted users:`];
// 		} else if (language === 'french') {
// 			mlistMSG = [`No one is muted in this server`, `Utilisateurs en sourdine:`];
// 		} else if (language === 'german') {
// 			mlistMSG = [`No one is muted in this server`, `Gedämpfte Nutzer:`];
// 		} else if (language === 'turkish') {
// 			mlistMSG = [`No one is muted in this server`, `Muted kullanıcılar:`];
// 		}
// 		if (!mutelist || mutelist === '') {
// 			[mutelist] = mlistMSG;
// 		}
// 		message.channel.send({
// 			embed: new Discord.RichEmbed()
// 				.setColor('#000000')
// 				.setColor('#36393e')
// 				.setAuthor(message.guild.name, message.guild.iconURL)
// 				.setTitle(mlistMSG[1])
// 				.setDescription(mutelist)
// 				.setFooter(message.author.username, message.author.avatarURL)
// 				.setTimestamp()
// 		});
// 	}
// }


// module.exports = mutelistCommand;
