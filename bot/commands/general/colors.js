const { Command } = require('discord-akairo');
const { assets, emojis } = require('../../struct/bot');
const Canvas = require('canvas');
Canvas.registerFont(assets('fonts/Product-Sans-Regular.ttf'), {
	family: 'PSans'
});
Canvas.registerFont(assets('fonts/Product-Sans-Bold.ttf'), {
	family: 'PSansBold'
});

class ColorsCommand extends Command {
	constructor() {
		super('colors', {
			aliases: ['colors', 'color'],
			cooldown: 3000,
			ratelimit: 1,
			category: 'general',
			channelRestriction: 'guild',
			description: {
				content: 'Show create or remove colors in your server',
				usage: '<add | show | create | remove | removeAll | title> <...args>',
				examples: ['colors show', 'colors add [color-number]', 'colors remove [color-number]', 'colors create [ammount]', 'colors removeAll', 'colors boxtitle MyColorBox']

			},
			args: [{
				id: 'method',
				type: ['add', 'show', 'create', 'remove', 'removeAll', 'title', 'boxtitle']
			}, {
				id: 'name',
				match: 'rest'
			}]
		});
	}

	async exec(message, { method, name }) {
		if (!method || method === 'show') {
			let ch;
			const cc = message.guild.roles.filter(r => !isNaN(r.name));

			if (cc.size > 1 && cc.size <= 10) {
				ch = 150;
			} else if (cc.size >= 1 && cc.size <= 20) {
				ch = 190;
			} else if (cc.size >= 1 && cc.size <= 30) {
				ch = 230;
			} else if (cc.size >= 1 && cc.size <= 40) {
				ch = 270;
			} else if (cc.size >= 1 && cc.size <= 50) {
				ch = 310;
			} else if (cc.size >= 1 && cc.size <= 60) {
				ch = 350;
			} else if (cc.size >= 1 && cc.size <= 70) {
				ch = 390;
			} else if (cc.size >= 1 && cc.size <= 80) {
				ch = 430;
			} else if (cc.size >= 1 && cc.size <= 90) {
				ch = 470;
			} else if (cc.size >= 1 && cc.size <= 100) {
				ch = 510;
			}
			const { Image } = Canvas;
			const canvas = new Canvas(500, ch);
			const ctx = canvas.getContext('2d');

			function roundedImage(x, y, width, height, radius) {
				ctx.beginPath();
				ctx.moveTo(x + radius, y);
				ctx.lineTo(x + width - radius, y);
				ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
				ctx.lineTo(x + width, y + height - radius);
				ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
				ctx.lineTo(x + radius, y + height);
				ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
				ctx.lineTo(x, y + radius);
				ctx.quadraticCurveTo(x, y, x + radius, y);
				ctx.closePath();
			  }
			const ground = new Image();
			ground.src = assets('images/colors-10.png');
			ctx.save();
			roundedImage(0, 0, 500, ch, 30);
			ctx.clip();
			await ctx.drawImage(ground, 0, 0, 500, ch);
			ctx.restore();

			const taken = {};
			let h = 43;
			let w = 110;
			let n = 0;

			const hhexcolor = '#f1f1f1';
			cc.sort((b1, b2) => b1.name - b2.name).forEach(role => {
				if (!role) return message.channel.send(`${emojis.no}**|** No **color roles** was found\ntry \`=colors add [number]\` to add a **color**.`);
				if (taken[role.name]) {
					null;
				} else {
					ctx.shadowColor = '#000';
					ctx.shadowOffsetX = 0;
					ctx.shadowOffsetY = 0;
					ctx.shadowBlur = 15;

					ctx.beginPath();
					ctx.arc(h + 24, w - 8, 19, 0, Math.PI * 2, false);
					ctx.fillStyle = `${role.hexColor.replace('#000000', '#99aab5')}`;
					ctx.fill();

					if (role.name.length >= 1) {
						ctx.font = 'bold 18px PSansBold';
						ctx.fontSize = '18px';
					} else if (role.name.length > 2) {
						ctx.font = 'bold 15px PSansBold';
						ctx.fontSize = '15px';
					}
					// ctx.fontSize = '72px';
					ctx.fillStyle = hhexcolor;
					ctx.beginPath();

					ctx.shadowColor = '#000';
					ctx.shadowBlur = 3;
					ctx.strokeStyle = '#000000';
					 ctx.stroke();
					 ctx.save();
					let x;
					if (role.name.length === 1) {
						x = h - 5;
					} else if (role.name.length === 2) {
						x = h - 8.9;
					} else if (role.name.length === 3) {
						x = h - 12.5;
					}
					ctx.fillText(`${role.name}`, x + 15, w);
					ctx.restore();


					h += 40;
					taken[role.name] = role.name;
					n++;
					if (n === 10) {
						h = 43;
						w += 40;
						n = 0;
					}
				}
			});

			ctx.shadowColor = '#000';
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = -1;
			ctx.shadowBlur = 10;
			ctx.strokeStyle = '#000000';
			ctx.font = '36px PSans';
			ctx.fontSize = '36px';
			ctx.textAlign = 'center';
			ctx.fillStyle = '#fff';
			ctx.fillText(this.client.settings.get(message.guild.id, 'btitle', 'AbayroColors'), 227, 50);


			return message.channel.send({
				files: [{
					attachment: canvas.toBuffer(),
					name: 'colors.png'
				}]
			}).catch(() => message.channel.send(`${emojis.no}**|** No **color roles** was found\ntry \`${this.handler.prefix(message)}colors add [number]\` to add a **color**.`));
		} else if (method === 'add') {
			const [roleName, roleColor = 'RANDOM'] = name.trim().split(/ +/g);
			if (!roleName) return message.channel.send(`${emojis.no}**|** Please enter a **role color number**.`);
			if (isNaN(parseInt(roleName, 10))) return message.channel.send(`${emojis.no}**|** Please enter a **valid role color number**.`);
			message.guild.createRole({
				name: parseInt(roleName, 10),
				color: roleColor
			});
			message.channel.send(`${emojis.yes}**|** Color role \`${roleName}\` has been **created**.`);
		} else if (method === 'remove') {
			if (!name) return message.channel.send(`${emojis.no}**|** Please **enter** the **color role** name or ID.`);
			const irole = this.client.util.resolveRoles(name, message.guild.roles).first();
			if (!irole || isNaN(irole.name)) return message.channel.send(`${emojis.no}**|** The role is either not a role or not a vaild **color role**.`);
			message.guild.roles.get(irole.id).delete();
			message.channel.send(`${emojis.yes}**|** The **color role** \`${irole.name}\` has been **removed**.`);
		} else if (method === 'create') {
			return message.channel.send(`${emojis.no}**|** This **method** is disabled because of **rate limits**.`);
			// const args = message.content.split(' ').slice(1);
			// if (!args[1]) return message.channel.send(`${emojis.no}**|** Please **enter** an **ammount** to create.`);
			// if (!isNaN(args[1])) return message.channel.send(`${emojis.no}**|** Please **enter** valid **numbers**.`);
			// if (args[1].length < 1 || args[1].length >= 50) return message.channel.send(`${emojis.no}**|** I can't **create** more than \`50\` or less than \`1\` **color role**.`);
		} else if (method === 'removeAll') {
			return message.channel.send(`${emojis.no}**|** This **method** is disabled because of **rate limits**.`);
		} else if (method === 'boxtitle' || method === 'title') {
			if (!name) {
				return message.channel.send(`${emojis.no}**|** Please **enter** a new **colors box title**.`);
			}
			 if (name.length >= 15) return message.channel.send(`${emojis.no}**|** The **box title** can't be more than \`15\` characters`);
			 this.client.settings.set(message.guild.id, 'btitle', name);
			 return message.channel.send(`${emojis.yes}**|** The **colors box title** has been changed to **${name}**.`);
		}
	}
}

module.exports = ColorsCommand;
