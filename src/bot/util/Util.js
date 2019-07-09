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

exports.paginate = (items, page = 1, pageLength = 10) => {
	const maxPage = Math.ceil(items.length / pageLength);
	if (page < 1) page = 1;
	if (page > maxPage) page = maxPage;
	const startIndex = (page - 1) * pageLength;

	return {
		items: items.length > pageLength ? items.slice(startIndex, startIndex + pageLength) : items,
		page,
		maxPage,
		pageLength
	};
};

exports.timeString = (seconds, forceHours = false, ms = true) => {
	if (ms) seconds /= 1000;
	if (seconds > 86400000) return '\\🔴 **LIVE**';

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor(seconds % 3600 / 60);

	return `${forceHours || hours >= 1 ? `${hours}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
};
