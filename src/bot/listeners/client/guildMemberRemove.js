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
		if (this.client.settings.get(member.guild.id, 'gdbstatus') === 'off') return;
		if (this.client.settings.get(member.guild.id, 'gdbstatus') === 'on') {
			const msg = this.client.settings.get(member.guild.id, 'gdbmsg', '[member] Left the server');
			if (!msg || msg === null) return;
			const gdbmc = this.client.settings.get(member.guild.id, 'gdbchannel');
			const gdbmChannel = member.guild.channels.get(gdbmc);
			if (!gdbmChannel) return;
			if (this.client.settings.get(member.guild.id, 'gdbtype') === 'text') {
				gdbmChannel.send(msg.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			} else if (this.client.settings.get(member.guild.id, 'gdbtype') === 'embed') {
				gdbmChannel.send(msg.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
				const embed = new Embed()
					.setAuthor('Member left !', member.guild.iconURL)
					.addField('**❯** Join/Creation date:', `\`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')}\`\n**Created ${moment(member.user.createdAt).fromNow()}**\n\`${moment(member.user.joinedAt).format('D/M/YYYY h:mm a')}\`\n**Joined ${moment(member.user.joinedAt).fromNow()}**`, true)
					.addField('**❯** Member ID:', member.id, true)
					.addField('**❯** Membercount:', `${member.guild.memberCount} **Members**`, true)
					.addField('**❯** Member status:', member.presence.status, true)
					.setFooter(member.user.tag, member.user.displayAvatarURL)
					.setThumbnail(member.user.displayAvatarURL)
					.setColor('#e74c3c')
					.setTimestamp();
				gdbmChannel.send(embed);
			} else if (this.client.settings.get(member.guild.id, 'gdbtype') === 'image') {
				// TODO: add canvas welcoming & Captcha system
				gdbmChannel.send(msg.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			}
		}
	}
}

module.exports = guildMemberRemoveEvent;
