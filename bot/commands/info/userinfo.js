const { Command } = require('discord-akairo');
const moment = require('moment');
const Embed = require('../../util/Embed');
const { emojis } = require('../../struct/bot');

class UserInfoCommand extends Command {
	constructor() {
		super('userinfo', {
			aliases: ['userinfo'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'info',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Shows informations about the user.'
			},
			args: [{
				'id': 'member',
				'type': 'member',
				'default': message => message.member
			}]
		});
	}

	exec(message, { member }) {
		const gmember = message.guild.member(member);

		let game;
		if (member.presence.game === null) {
			game = 'No presence status';
		} else {
			game = member.presence.game.name;
		}

		let status;
		if (member.presence.status === 'online') {
			status = '<:online:525094410460069928> `Online`';
		} else if (member.presence.status === 'dnd') {
			status = '<:dnd:525094410300686357> `DND`';
		} else if (member.presence.status === 'idle') {
			status = '<:idle:525094411130896420> `Idle`';
		} else if (member.presence.status === 'offline') {
			status = '<:offline:525094410485235712> `Invisible`';
		}

		let roles;
		if (message.member.roles.size === 1) {
			roles = '`None`';
		} else {
			roles = message.member.roles.map(role => `\`${role.name}\``).slice(1).join(', ');
		}

		if (member.user.bot) return message.channel.send(`${emojis.no} | **This is \`userInfo\` command, no bots please**.`);

		const embed = new Embed()
			.setColor('#307FFF')
			.setAuthor(member.user.tag, member.user.displayAvatarURL)
			.setThumbnail(member.user.displayAvatarURL)
			.setTitle('User info:')
			.setDescription(`
• **Name** : <@${member.id}>
• **Displayname** : \`${member.user.tag}\`
• **Nickname** : \`${gmember.nickname === null ? 'None' : member.nickname}\`
• **ID** : \`${member.id}\`
• **Discrim** : \`#${member.user.discriminator}\`
• **Playing status** : \`${game}\`
• **Status** : ${status}
• **CreatedAt** : \`${moment(member.createdAt).format('D/M/YYYY h:mm a')}\`
• **Roles** : ${roles}
`)
			.setFooter(message.author.username, message.author.avatarURL)
			.setTimestamp();
		message.channel.send(embed);
	}
}


module.exports = UserInfoCommand;
