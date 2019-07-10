const { Listener } = require('discord-akairo');
const { users } = require('../../database/Users');
const { randomNumber } = require('../../util/Util');
// const nsfw = require('nsfwjs');

class MessageInvaildListener extends Listener {
	constructor() {
		super('messageInvalid', {
			emitter: 'commandHandler',
			eventName: 'messageInvalid',
			category: 'commandHandler'
		});
	}

	/**
 * @param { import('discord.js').Message } message
 */
	async exec(message) {
		if (!message.guild || message.author.bot) return;

		/* if (this.client.settings.get(message.guild.id, 'antinsfw', 'on')) {
			const model = await nsfw.load();
			if (message.attachment.width) {
				const predictions = await model.classify(message.attachment);
				message.channel.send(predictions)
			}
		} */

		const [user] = await users.findOrCreate({
			where: {
				id: message.author.id
			}
		});

		const eligible = Date.now() > (new Date(user.textupdatedAt).getTime() + 30e3);

		if (eligible) {
			const xp = randomNumber(1, 5);
			const userExpLvl = Math.floor(0.115 * Math.sqrt(user.textxp)) + 1;
			const now = new Date();

			await user.increment('textxp', { by: xp });

			if (userExpLvl > user.textlevel) {
				await users.increment('textlevel');
				if (this.client.settings.get(message.guild.id, 'lvlup-msg') === 'enabled') {
					return message.channel.send(`:up: ${message.author} You've leveld up to ${userExpLvl}!`);
				}
			}

		   user.update({ textupdatedAt: now });
		}
	}
}

module.exports = MessageInvaildListener;
