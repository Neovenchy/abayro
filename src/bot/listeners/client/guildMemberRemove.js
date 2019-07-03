const { Listener } = require('discord-akairo');
const moment = require('moment');
const Embed = require('../../util/Embed');

class guildMemberRemoveEvent extends Listener {
	constructor() {
		super('guildMemberRemove', {
			emitter: 'client',
			eventName: 'guildMemberRemove',
			category: 'client'
		});
	}

	exec(member) {
		const goodbye = this.client.settings.get(member.guild, 'gdbstatus') && {
			channel: this.client.settings.get(member.guild, 'gdbchannel', undefined),
			type: this.client.settings.get(member.guild, 'gdbtype', 'text'),
			message: this.client.settings.get(member.guild, 'gdbmsg', '[member] Left the server')
		};
		if (!goodbye) return;
		const goodbyeChannel = member.guild.channels.get(goodbye.channel);
		if (goodbyeChannel) {
			if (goodbye.type === 'text') {
				goodbyeChannel.send(goodbye.message.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			} else if (goodbye.type === 'embed') {
				goodbyeChannel.send(goodbye.message.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
				const embed = new Embed()
					.setAuthor('Member left !', member.guild.iconURL)
					.addField('❯ Join/Creation date:', `\`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')}\`\n**Created ${moment(member.user.createdAt).fromNow()}**\n\`${moment(member.user.joinedAt).format('D/M/YYYY h:mm a')}\`\n**Joined ${moment(member.user.joinedAt).fromNow()}**`, true)
					.addField('❯ Member ID:', member.id, true)
					.addField('❯ Membercount:', `${member.guild.memberCount} **Members**`, true)
					.addField('❯ Member status:', member.presence.status, true)
					.setFooter(member.user.tag, member.user.displayAvatarURL)
					.setThumbnail(member.user.displayAvatarURL)
					.setColor('#e74c3c')
					.setTimestamp();
				goodbyeChannel.send(embed);
			} else if (goodbye.type === 'image') {
				// TODO: add canvas welcoming & Captcha system
				goodbyeChannel.send(goodbye.message.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			}
		}
	}
}

module.exports = guildMemberRemoveEvent;
