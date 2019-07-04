const { Command } = require('discord-akairo');
const { emojis, assets } = require('../../util/Constants');
const { users, rank } = require('../../database/Users');
// TODO: use request-promise instead of jimp! (https://www.npmjs.com/package/request-promise)
const { read, MIME_PNG } = require('jimp');
const { wrapText, trimString } = require('../../util/Util');
const { createCanvas, registerFont, Image } = require('canvas');
// TODO: use tsubaki (https://www.npmjs.com/package/tsubaki) on fs
const { readFile } = require('fs');


class ProfileCommand extends Command {
	constructor() {
		super('profile', {
			aliases: ['profile'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			description: {
				content: 'Shows your profile card',
				examples: ['', '354716386716811264', '@NourEliden'],
				usage: ['[user]']
			},
			args: [
				{
					'id': 'user',
					'type': 'user',
					'default': message => message.author
				}
			],
			typing: true
		});
	}

	/**
	 * @param {import('discord.js').Message} message
	 */
	async exec(message, { user }) {
		if (user.bot) return message.channel.send(`${emojis.no} | **Bots** doesn't have a **profile card**`);

		/*  Getting User Data  */
		const [_user] = await users.findOrCreate({ where: { id: message.author.id } });
		const ptitle = _user.ptitle || 'I like cheese.';
		const pcolor = _user.pcolor || '#007fff';
		const credits = _user.credits || 0;
		const rep = _user.rep || 0;

		const { rank: textrank } = await rank(user.id, 'textxp', '000');
		const textlevel = _user.textlevel || 0;
		const textxp = _user.textxp || 0;
		const upperBound = Math.ceil((textlevel / 0.115) ** 2);

		/*  CANVAS  */
		registerFont(assets('fonts/Uni-Sans-Heavy.otf'), { family: 'UniSans' });
		registerFont(assets('fonts/Montserrat-Regular.ttf'), { family: 'Montserrat' });
		registerFont(assets('fonts/Montserrat-Light.ttf'), { family: 'MontserratLight' });

		const canvas = createCanvas(500, 600);
		const ctx = canvas.getContext('2d');
		const lines = await wrapText(ctx, ptitle, 110);
		const username = trimString(user.username, 15);
		const avatarURL = user.displayAvatarURL.endsWith('.webp') ? `${user.displayAvatarURL.slice(5, -20)}.png` : user.displayAvatarURL;

		readFile(assets('images/profile.png'), (err, Background) => {
			if (err) throw new Error(`[FS: READING PROIFLE] ${err}`);
			 const base = new Image();
			 base.src = Background;
			 ctx.drawImage(base, 0, 0, 500, 600);
		});


		read(avatarURL, (error, _avatar) => {
			if (error) throw new Error(`[JIMP: READING] ${error}`);
			_avatar.getBuffer(
				MIME_PNG,
				(err, buf) => {
					if (err) throw new Error(`[JIMP: GETTING BUFFER] ${err}`);

					/* NAME */
					ctx.font = '30px Montserrat';
					ctx.fontSize = '30px';
					ctx.fillStyle = '#f5f6fa';
					ctx.textAlign = 'center';
					ctx.fillText(username, 252.4, 359);

					/* INFO DESC */
					ctx.font = '20px MontserratLight';
					ctx.fontSize = '20px';
					ctx.fillStyle = '#f5f6fa';
					ctx.textAlign = 'center';
					lines.forEach((line, i) => {
						ctx.fillText(line, 249, i + 403);
					});

					/* CREDIT */
					ctx.font = '20px UniSans';
					ctx.fontSize = '20px';
					ctx.fillStyle = '#f5f6fa';
					ctx.textAlign = 'center';
					ctx.fillText(`£${credits}`, 408, 581);

					/* TEXT RANK */
					ctx.font = '20px UniSans';
					ctx.fontSize = '20px';
					ctx.fillStyle = '#f5f6fa';
					ctx.textAlign = 'center';
					ctx.fillText(`#${textrank}`, 78, 581);

					/* LEVEL */
					ctx.font = '40px UniSans';
					ctx.fontSize = '40px';
					ctx.fillStyle = '#f5f6fa';
					ctx.textAlign = 'center';
					ctx.fillText(textlevel, 405, 512);

					/* LIKES / REPUTATION */
					ctx.font = '40px UniSans';
					ctx.fontSize = '40px';
					ctx.fillStyle = '#f5f6fa';
					ctx.textAlign = 'center';
					ctx.fillText(`+${rep}`, 71, 512);

					/* XP */
					ctx.font = '20px Montserrat';
					ctx.fontSize = '20px';
					ctx.fillStyle = '#f5f6fa';
					ctx.textAlign = 'center';
					ctx.fillText(`XP: ${textxp} / ${upperBound}`, 239, 581);

					/* XP BAR*/
					ctx.fillStyle = pcolor;
					ctx.fillRect(0, 593, (593 / 100) * textxp / upperBound * 100, 8);

					/* === BADGES CANVAS === */

					/* Badge LVL 10 */
					if (textlevel > 9) {
						ctx.beginPath();
						ctx.arc(210, 460, 27, 0, Math.PI * 2, false);
						ctx.fillStyle = pcolor;
						ctx.fill();
						ctx.lineWidth = 5;
						// ///////////
						ctx.font = '24px UniSans';
						ctx.fontSize = '24px';
						ctx.fillStyle = '#f5f6fa';
						ctx.textAlign = 'center';
						ctx.fillText(`L10`, 209, 469.9);
					}
					/* Badge LVL 20 */
					if (textlevel > 19) {
						ctx.beginPath();
						ctx.arc(275, 460, 27, 0, Math.PI * 2, false);
						ctx.fillStyle = pcolor;
						ctx.fill();
						ctx.lineWidth = 5;
						// ///////////
						ctx.font = '24px UniSans';
						ctx.fontSize = '24px';
						ctx.fillStyle = '#f5f6fa';
						ctx.textAlign = 'center';
						ctx.fillText(`L20`, 275.7, 469.9);
					}

					/* Badge Rep 50 */
					if (rep > 50) {
						ctx.beginPath();
						ctx.arc(210, 525, 27, 0, Math.PI * 2, false);
						ctx.fillStyle = pcolor;
						ctx.fill();
						ctx.lineWidth = 5;
						// ///////////
						ctx.font = '24px UniSans';
						ctx.fontSize = '24px';
						ctx.fillStyle = '#f5f6fa';
						ctx.textAlign = 'center';
						ctx.fillText(`R50`, 209, 535);
					}
					/* Badge Rep 100 */
					if (rep > 100) {
						ctx.beginPath();
						ctx.arc(275, 525, 27, 0, Math.PI * 2, false);
						ctx.fillStyle = pcolor;
						ctx.fill();
						ctx.lineWidth = 5;
						// ///////////
						ctx.font = '20px UniSans';
						ctx.fontSize = '20px';
						ctx.fillStyle = '#f5f6fa';
						ctx.textAlign = 'center';
						ctx.fillText(`R100`, 275.7, 532.5);
					}

					/* === END OF BADGES CANVAS === */


					/* AVATAR BORDER */

					ctx.beginPath();
					ctx.arc(251.5, 158.5, 135.6, 0, Math.PI * 2, true);
					ctx.fillStyle = pcolor;
					ctx.fill();

					/* END OF AVATAR BORDER */

					/* AVATAR */
					const avatar = new Image();
					avatar.src = buf;
					ctx.beginPath();
					ctx.arc(251.5, 158.5, 124, 0, Math.PI * 2, true);
					ctx.closePath();
					ctx.clip();
					ctx.drawImage(avatar, 127, 35, 250, 250);
				}
			);


			return message.channel.send(`📋 | User profile card for **${user.username}**`, { files: [{ attachment: canvas.toBuffer(), name: 'profile.png' }] });
		});
	}
}

module.exports = ProfileCommand;
