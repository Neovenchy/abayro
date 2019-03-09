const { Listener } = require('discord-akairo');
const { increase, find } = require('../../database/Users');
const { randomNumber } = require('../../util/Util');

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


		const userExp = await find(message.author.id, 'textxp', 0);
		const userLvl = await find(message.author.id, 'textlevel', 0);
		const userExpLvl = Math.floor(0.115 * Math.sqrt(userExp)) + 1;

		if (userExpLvl > userLvl) {
			increase(message.author.id, 'textlevel', userExpLvl);
			return message.channel.send(`:up: ${message.author} You've leveld up to ${userExpLvl}!`);
		}


		setTimeout(() => {
			increase(message.author.id, 'textxp', this.addxp());
		}, 30 * 1000);
	}
}

module.exports = MessageInvaildListener;
