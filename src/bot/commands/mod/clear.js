const { Command } = require('discord-akairo');
const { emojis } = require('../../util/Constants');

class ClearCommand extends Command {
	constructor() {
		super('clear', {
			aliases: ['clear'],
			cooldown: 6000,
			ratelimit: 1,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'To clear messages from a channel'

			},
			args: [{
				id: 'amount',
				type: 'integer',
				index: 0
			}],
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions(message) {
				return message.member.roles.has(this.client.settings.get(message.guild, 'modrole')) || message.member.hasPermission('MANAGE_MESSAGES');
		   }
		});
	}

	async exec(message, { amount }) {
		if (!amount) {
			message.channel.bulkDelete(100, true).catch(() => message.channel.send(`${emojis.no}** | ${message.author.username}**, I can't **delete** some **messages** that were **older** than **14 days**.`));
		  message.channel.send(`${emojis.yes}** | ${message.author.username}**, I deleted \`100\` **messages**.`).then(msg => {
			 msg.delete(6000);
		 });
	  } else if (amount) {
		 if (isNaN(amount)) return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please enter a **valid number**.`);
		 if (amount > 100) return message.channel.send(`${emojis.no} | **Please supply a number less than \`100\`**.`);
		 await message.delete().catch(() => null);
		 await message.channel.bulkDelete(amount).catch(() => message.channel.send(`${emojis.no}** | ${message.author.username}**, I can't **delete** some **messages** that were **older** than **14 days**.`));
		 message.channel.send(`${emojis.yes}** | ${message.author.username}**, I deleted **\`${amount}\`/\`100\` messages**.`).then(msg => {
			 msg.delete(6000);
		 });
	 }
	}
}


module.exports = ClearCommand;
