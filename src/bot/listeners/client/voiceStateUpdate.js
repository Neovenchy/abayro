// const { Listener } = require('discord-akairo');
// const { resolve } = require('path');
// const dbPath = resolve(__dirname, '../../', 'database', 'sqlite', 'userdata.sqlite');
// const database = require('sqlite');
// const sqlite = database.open(dbPath, { Promise });

// class VoiceEvent extends Listener {
// 	constructor() {
// 		super('voiceStateUpdate', {
// 			emitter: 'client',
// 			eventName: 'voiceStateUpdate',
// 			category: 'client'
// 		});
// 	}

// 	async exec(oldMember, newMember) {
// 		const sql = await sqlite;
// 		setInterval(() => {
// 			sql.get(`SELECT * FROM scores WHERE userId ="${newMember.id}" AND guildId = "${newMember.guild.id}"`).then(row => {
// 				// eslint-disable-next-line no-negated-condition
// 				if (!row) {
// 					sql.run('CREATE TABLE IF NOT EXISTS scores (vcpoints INTEGER, vclevel INTEGER)').then(() => {
// 						sql.run('INSERT INTO scores (vcpoints, vclevel) VALUES (?, ?)', [1, 1]);
// 					});
// 				} else {
// 					const curLevel = row.vclevel * (row.vclevel * 200) / 2.5;
// 					if (row.vcpoints >= curLevel) {
// 						sql.run(`UPDATE scores SET vclevel = ${row.vclevel + 1} WHERE userId = ${newMember.id} AND guildId = "${newMember.guild.id}"`);
// 					} else if (newMember.voiceChannel !== undefined) {
// 						if (!newMember.selfDeaf || !newMember.selfMute) {
// 							sql.run(`UPDATE scores SET vcpoints = ${row.vcpoints + 1} WHERE userId = ${newMember.id} AND guildId = "${newMember.guild.id}"`);
// 						}
// 					}
// 				}
// 			}).catch(err => {
// 				this.client.logger.error(err);
// 				sql.run('CREATE TABLE IF NOT EXISTS scores (vcpoints INTEGER, vclevel INTEGER)').then(() => {
// 					sql.run('INSERT INTO scores (vcpoints, vclevel) VALUES (?, ?)', [1, 1]);
// 				});
// 			});
// 		}, 60 * 6000);
// 	}
// }

// module.exports = VoiceEvent;
