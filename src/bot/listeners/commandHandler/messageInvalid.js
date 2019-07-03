const { Listener } = require('discord-akairo');
const { increase, find } = require('../../database/Users');
const { randomNumber } = require('../../util/Util');
const nsfw = require('nsfwjs');

class MessageInvaildListener extends Listener {
	constructor() {
		super('messageInvalid', {
			emitter: 'commandHandler',
			eventName: 'messageInvalid',
			category: 'commandHandler'
		});
	}

	addxp() {
		return randomNumber(1, 5);
	  }

	/**
 * @param { import('discord.js').Message } message
 */
	async exec(message) {
		if (!message.guild || message.author.bot) return;

		if (this.client.settings.get(message.guild.id, 'antinsfw', 'on')) {
			const model = await nsfwjs.load();
			if (message.attachment.size > 0 && message.attachment.width > 1) {
				const predictions = await model.classify(message.attachment);
				message.channel.send(predictions)
			}
		}
		const userExp = await find(message.author.id, 'textxp', 0);
		const userLvl = await find(message.author.id, 'textlevel', 0);
		const userExpLvl = Math.floor(0.115 * Math.sqrt(userExp)) + 1;

		if (userExpLvl > userLvl) {
			increase(message.author.id, 'textlevel', userExpLvl);
			if (this.client.settings.get(message.guild.id, 'lvlup-msg') === 'enabled') {
				return message.channel.send(`:up: ${message.author} You've leveld up to ${userExpLvl}!`);
			}
		}


		setTimeout(() => {
			increase(message.author.id, 'textxp', this.addxp());
		}, 30 * 1000);
	}
}

module.exports = MessageInvaildListener;
