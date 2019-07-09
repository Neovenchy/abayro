const { Listener } = require('discord-akairo');
const moment = require('moment');
const Embed = require('../../util/Embed');

class guildMemberAddEvent extends Listener {
	constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
			eventName: 'guildMemberAdd',
			category: 'client'
		});
	}

	/** @param {import('discord.js').GuildMember} member */
	exec(member) {
		const logs = this.client.settings.get(member.guild, 'logs', undefined) && `${this.client.settings.get(member.guild, 'logsChannel', undefined)}`;
		const autorole = this.client.settings.get(member.guild, 'autorole', undefined) && `${this.client.settings.get(member.guild, 'autoroleRole', undefined)}`;
		const welcome = this.client.settings.get(member.guild, 'wlc') && {
			channel: this.client.settings.get(member.guild, 'wlcChannel', undefined),
			type: this.client.settings.get(member.guild, 'wlcType', 'text'),
			message: this.client.settings.get(member.guild, 'wlcMsg', '[member] Joined the server')
		};

		/** @LOGS */
		if (logs) {
			const logschannel = member.guild.channels.get(logs);
			if (!logschannel) return;
			const embed = new Embed()
				.setColor(0x00FF00)
				.setAuthor('Member Join', 'https://i.imgur.com/BFzLaJV.png')
				.setThumbnail(member.user.displayAvatarURL)
				.setDescription(`**${member.user.tag}** (${member.id}) has **__joined__** the server.`)
				.addField('❯ Bot', `**${member.user.bot ? 'Yes' : 'No'}**`, true)
				.addField('❯ Member Number', `**${member.guild.memberCount}**`, true)
				.setFooter(member.user.tag, member.user.displayAvatarURL)
				.setTimestamp();
		    try {
				logschannel.send(embed);
			} catch {}
		}

		/** @AUTROLE */
		if (autorole) {
			const role = member.guild.roles.get(autorole);
			if (role) {
				setTimeout(() => {
					try {
						member.addRole(role);
					} catch {}
				}, 10000); // To avoid rate limits
			}
		}
		  if (this.client.settings.get(member.guild.id, 'antibotj') === 'on') {
		     if (member.user.bot && member.kickable) member.kick('Abayro protection: Anti-bot joining');
		  }

		/** @WELCOME_MESSAGE */
		if (!welcome) return;
		const wlcchannel = member.guild.channels.get(welcome.channel);
		if (wlcchannel) {
			if (welcome.type === 'text') {
				wlcchannel.send(welcome.message.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			} else if (welcome.type === 'embed') {
				wlcchannel.send(welcome.message.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
				const embed = new Embed()
					.setAuthor('New member joined', member.guild.iconURL)
					.addField('❯ Creation date', `\`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')}\`\n**Created ${moment(member.user.createdAt).fromNow()}**`, true)
					.addField('❯ Member ID', member.id, true)
					.addField('❯ Member number', member.guild.memberCount, true)
					.addField('❯ Member status', member.presence.status, true)
					.setFooter(member.user.tag, member.user.displayAvatarURL)
					.setThumbnail(member.user.displayAvatarURL)
					.setColor('#00ffc0')
					.setTimestamp();
				wlcchannel.send(embed);
			} else if (welcome.type === 'image') {
			// TODO: add canvas welcoming & Captcha system
				wlcchannel.send(welcome.message.replace('[member]', member).replace('[membername]', member.user.username).replace('[server]', member.guild.name));
			}
		}
	}
}

module.exports = guildMemberAddEvent;
