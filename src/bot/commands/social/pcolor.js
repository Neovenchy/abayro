const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { find, update } = require('../../database/Users');
const HCI = require('hex-colors-info');

class PcolorCommand extends Command {
	constructor() {
		super('pcolor', {
			aliases: ['pcolor', 'pcolour', 'profilecolor'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			description: {
				content: 'Sets your profile theme colour'
			},
			args: [{
				id: 'pcolour',
				type: ['set']
			}, {
				id: 'color',
				type: color => {
					if (!color) return '_';
					if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) return null;
					return color;
				}
			}]
		});
	}

	async exec(message, { pcolour, color }) {
		if (!pcolour) {
			// eslint-disable-next-line new-cap
			const currentColor = await find(message.author.id, 'pcolor', 'black').then(c => HCI(c));
			return message.channel.send(`${emojis.info}** | ${message.author.username}**, Your current **profile color** is: ${currentColor.name}`);
		}
		if (color === '_') return message.channel.send(`${emojis.no} | **${message.author.username}**, Please enter the color you want.`);
		if (!color) return message.channel.send(`${emojis.no}** | ${message.author.username}**, The **color** you entered isn't a **vaild hex color**.`);
		await update(message.author.id, 'pcolor', color);
		// eslint-disable-next-line new-cap
		const getColor = HCI(color);
		return message.channel.send(`${emojis.yes}** | ${message.author.username}**, I **Updated** your profile **color** to **${getColor.name}**.`);
	}
}


module.exports = PcolorCommand;
