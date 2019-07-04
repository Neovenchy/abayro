// const { Listener } = require('discord-akairo');
// const { users } = require('../../database/Users');
// const { randomNumber } = require('../../util/Util');

// class voiceStateUpdate extends Listener {
// 	constructor() {
// 		super('voiceStateUpdate', {
// 			emitter: 'client',
// 			eventName: 'voiceStateUpdate',
// 			category: 'client'
// 		});
// 	}

// 	/**
//      * @param {import('discord.js').GuildMember} oldMember
//      * @param {import('discord.js').GuildMember} newMember
//      */
// 	async exec(_, newMember) {
// 		const [user] = await users.findOrCreate({
// 			where: {
// 				id: newMember.id
// 			}
// 		});

// 		if (!newMember.voiceChannel || newMember.selfDeaf) return;

// 		setInterval(() => {
// 			const xp = randomNumber(1, 5);
// 			const now = new Date();

// 			this.client.logger.info(`...`);

// 			if (newMember.voiceChannel && !newMember.selfDeaf) {
// 				this.client.logger.info(`...`);
// 				user.increment('voicexp', { by: xp });
// 				user.update({ voiceupdatedAt: now });
// 			}
// 		}, 10e3);
// 	}
// }

// module.exports = voiceStateUpdate;
