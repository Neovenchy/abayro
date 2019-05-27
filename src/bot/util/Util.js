/* eslint-disable no-negated-condition */
exports.wrapText = (ctx, text, maxWidth) => new Promise(resolve => {
	const words = text.split(' ');
	const lines = [];
	let line = '';

	if (ctx.measureText(text).width < maxWidth) {
		return resolve([text]);
	}

	while (words.length > 0) {
		let split = false;
		while (ctx.measureText(words[0]).width >= maxWidth) {
			const tmp = words[0];
			words[0] = tmp.slice(0, -1);

			if (!split) {
				split = true;
				words.splice(1, 0, tmp.slice(-1));
			} else {
				words[1] = tmp.slice(-1) + words[1];
			}
		}

		if (ctx.measureText(line + words[0]).width < maxWidth) {
			line += `${words.shift()} `;
		} else {
			lines.push(line);
			line = '';
		}

		if (words.length === 0) {
			lines.push(line);
		}
	}

	return resolve(lines);
});

exports.trimString = (string, maxSize) => {
	if (string.length > maxSize) {
		const len = string.slice(0, maxSize - 1);
		return `${len}...`;
	}
	return string;
};

exports.splitMessage = (text, { maxLength = 2000, char = '\n', prepend = '', append = '' } = {}) => {
	if (text.length <= maxLength) return text;
	const splitText = text.split(char);
	if (splitText.some(chunk => chunk.length > maxLength)) throw new RangeError('SPLIT_MAX_LEN');
	const messages = [];
	let msg = '';
	for (const chunk of splitText) {
		if (msg && (msg + char + chunk + append).length > maxLength) {
			messages.push(msg + append);
			msg = prepend;
		}
		msg += (msg && msg !== prepend ? char : '') + chunk;
	}
	return messages.concat(msg).filter(m => m);
};

/**
 * @param max the max amount
 * @param min the min amount
 */
exports.randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const { RichEmbed, User } = require('discord.js');
const { stripIndents, oneLine } = require('common-tags');
const ms = require('@abayro/ms');

const ACTIONS = {
	1: 'ban',
	2: 'unban',
	3: 'kick',
	4: 'kick',
	5: 'mute',
	6: 'restriction',
	7: 'restriction',
	8: 'restriction',
	9: 'warn'
};

exports.mod = {
	CONSTANTS: {
		ACTIONS: {
			BAN: 1,
			UNBAN: 2,
			SOFTBAN: 3,
			KICK: 4,
			MUTE: 5,
			EMBED: 6,
			EMOJI: 7,
			REACTION: 8,
			WARN: 9
		},
		COLORS: {
			BAN: 16718080,
			UNBAN: 8450847,
			KICK: 16745216,
			MUTE: 16763904,
			WARN: 16776960
		}
	},
	logEmbed: ({ message = null, member, action, duration = null, caseNum, reason, ref = null }) => {
		const embed = new RichEmbed();
		if (message) {
			embed.setAuthor(`${member instanceof User ? member.tag : member.user.tag} (${member.id})`, member instanceof User ? member.avatarURL : member.user.avatarURL);
		}
		embed.setDescription(stripIndents`
				**Action:** ${action}${action === 'Mute' && duration ? `\n**Length:** ${ms(duration, { 'long': true })}` : ''}
				**Reason:** ${reason}${ref ? `\n**Ref case:** ${ref}` : ''}
				**Case:** ${caseNum}
			`)
			.setFooter(message.author.tag, message.author.avatarURL)
			.setTimestamp(new Date());

		return embed;
	},
	historyEmbed: (member, cases) => {
		const footer = cases.reduce((count, c) => {
			const action = ACTIONS[c.action];
			count[action] = (count[action] || 0) + 1;
			return count;
		}, {});
		const colors = [8450847, 10870283, 13091073, 14917123, 16152591, 16667430, 16462404];
		const values = [footer.warn || 0, footer.restriction || 0, footer.mute || 0, footer.kick || 0, footer.ban || 0];
		const [warn, restriction, mute, kick, ban] = values;
		const colorIndex = Math.min(values.reduce((a, b) => a + b), colors.length - 1);

		return new RichEmbed()
			.setAuthor(`${member.user.tag} (${member.id})`, member.user.avatarURL)
			.setColor(colors[colorIndex])
			.setFooter(oneLine`${warn} warning${warn > 1 || warn === 0 ? 's' : ''},
				${restriction} restriction${restriction > 1 || restriction === 0 ? 's' : ''},
				${mute} mute${mute > 1 || mute === 0 ? 's' : ''},
				${kick} kick${kick > 1 || kick === 0 ? 's' : ''},
				and ${ban} ban${ban > 1 || ban === 0 ? 's' : ''}.
			`);
	}
};
