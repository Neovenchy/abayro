const { Listener } = require('discord-akairo');
const moment = require('moment');
const { RichEmbed } = require('discord.js');
class guildMemberAddEvent extends Listener {
	constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
			eventName: 'guildMemberAdd',
			category: 'client'
		});
	}

	exec(member) {
		 if (this.client.settings.get(member.guild.id, 'autorole') === 'on') {
		    const role = member.guild.roles.find(r => r.name === this.client.settings.get(member.guild.id, 'autorolest'));
			setTimeout(() => {
				member.addRole(role);
			}, 10000); // To avoid rate limits
		}
		 if (this.client.settings.get(member.guild.id, 'antibotj') === 'on') {
		    if (member.user.bot) return member.kick();
		 }
		if (this.client.settings.get(member.guild.id, 'wlcstatus') === 'off') return;
		if (this.client.settings.get(member.guild.id, 'wlcstatus') === 'on') {
			const msg = this.client.settings.get(member.guild.id, 'wlcmsg');
			if (!msg || msg === null) return;
			const wlcmc = this.client.settings.get(member.guild.id, 'wlcchannel');
			const wlcmChannel = member.guild.channels.get(wlcmc);
			if (!wlcmChannel) return;
			if (this.client.settings.get(member.guild.id, 'wlctype') === 'text') {
				wlcmChannel.send(msg.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			} else if (this.client.settings.get(member.guild.id, 'wlctype') === 'embed') {
				wlcmChannel.send(msg.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
				const embed = new RichEmbed()
					.setAuthor('New member joined !', member.guild.iconURL)
					.addField('**❯** Creation date:', `\`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')}\`\n**Created ${moment(member.user.createdAt).fromNow()}**`, true)
					.addField('**❯** Member ID:', member.id, true)
					.addField('**❯** Member number:', member.guild.memberCount, true)
					.addField('**❯** Member status:', member.presence.status, true)
					.setFooter(member.user.tag, member.user.displayAvatarURL)
					.setThumbnail(member.user.displayAvatarURL)
					.setColor('#2ecc71')
					.setTimestamp();
				wlcmChannel.send(embed);
			} else if (this.client.settings.get(member.guild.id, 'wlctype') === 'image') {
				// TODO: add canvas welcoming & Captcha system
				wlcmChannel.send(msg.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			}
		}
	}
}

module.exports = guildMemberAddEvent;
