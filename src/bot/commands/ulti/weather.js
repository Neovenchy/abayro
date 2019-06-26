const { Command } = require('discord-akairo');
const { emojis } = require('../../util/Constants');
const weather = require('weather-js');

class WeatherCommand extends Command {
	constructor() {
		super('weather', {
			aliases: ['weather', 'wt'],
			cooldown: 2000,
			ratelimit: 1,
			category: 'util',
			channelRestriction: 'guild',
			description: {
				content: 'Shows you the weather of any city',
				usage: '<city name>',
				examples: ['Cairo', 'Jeddah']
			}
		});
	}

	exec(message) {
		const cityname = message.content.split(' ').slice(1);
		weather.find({
			search: cityname.join(' '),
			degreeType: 'C'
		}, (err, result) => {
			if (err) this.client.logger.error(err);
			if (result === undefined || result.length === 0) {
				message.channel.send(`${emojis.no} | **Please enter a city name**.`);
				return;
			}
			const [city] = result;
			message.channel.send(city.current.skytext);
		});
	}
}
module.exports = WeatherCommand;
