const { Command } = require('discord-akairo');
const Embed = require('../../util/Embed');
const moment = require('moment');

class ServerInfoCommand extends Command {
	constructor() {
		super('serverinfo', {
			aliases: ['serverinfo'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'info',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Shows informations about the server.'
			}
		});
	}

	async exec(message) {
		const verifLevels = ['None', 'Low', 'Medium', 'Hard', 'Extreme'];
		const region = {
			'brazil': ':earth_americas: `Brazil`',
			'eu-central': ':earth_africa: `Central Europe`',
			'singapore': ':earth_asia: `Singapore`',
			'us-central': ':earth_americas: `U.S. Central`',
			'sydney': ':earth_asia: `Sydney`',
			'us-east': ' :earth_americas: `U.S. East`',
			'us-south': ':earth_americas: `U.S. South`',
			'us-west': ':earth_americas: `U.S. West`',
			'eu-west': ':earth_africa: `Western Europe`',
			'vip-us-east': ':star: `VIP U.S. East`',
			'london': ':earth_africa: `London`',
			'amsterdam': ':earth_asia: `Amsterdam`',
			'hongkong': ':earth_asia: `Hong Kong`',
			'russia': ':earth_asia: `Russia`'
		};

		let emojis;
		if (message.guild.emojis.size === 0) {
			emojis = 'None';
		} else {
			emojis = message.channel.guild.emojis.map(e => e).join(' ');
		}

		const embed = new Embed({})
			.setThumbnail(message.guild.iconURL)
			.setAuthor(message.guild.name, message.guild.iconURL)
			.setTitle('Server info:')
			.setDescription(`
• **Server name** : \`${message.guild.name}\`
• **Created at** : \`${moment(message.guild.createdAt).format('D/M/YYYY h:mm a')}\`
• **Joined at** : \`${moment(message.member.joinedAt).format('D/M/YYYY h:mm a')}\`
• **Total members** : \`${message.guild.memberCount}\`
• **Last member **: ${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`)
		.splice(0, 1)}
• **Server Owner** : \`${message.guild.owner.user.username}\`
• **Rooms** : \`${message.guild.channels.filter(m => m.type === 'text').size} Text | ${message.guild.channels.filter(m => m.type === 'voice').size} Voice\`
• **Categories** : \`${message.guild.channels.filter(m => m.type === 'category').size}\`
• **Roles** : \`${message.guild.roles.size}\`
• **Region** : ${region[message.guild.region]}
• **Guild ID** : \`${message.guild.id}\`
• **Verification Level** : \`${verifLevels[message.guild.verificationLevel]}\`
`)
			.setFooter(message.author.username, message.author.avatarURL)
			.setTimestamp()
			.setColor('#307FFF');
		await message.channel.send(embed);
		message.channel.send(new Embed({}).setDescription(`• **Emojis** : ${emojis}`));
	}
}


module.exports = ServerInfoCommand;
