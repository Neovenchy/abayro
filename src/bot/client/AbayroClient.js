const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');
const { join } = require('path');
const { Client: Lavaqueue } = require('lavaqueue');
const { default: Storage, ReferenceType } = require('rejects');
const logger = require('../util/Logger');
const database = require('../structures/Database');
const SettingsProvider = require('../structures/SettingsProvider');

class AbayroClient extends AkairoClient {
	constructor({ staff }) {
		super({ ownerID: staff }, {
			messageCacheMaxSize: 1000,
			disableEveryone: true,
			disabledEvents: [
				'TYPING_START',
				'GUILD_SYNC',
				'USER_NOTE_UPDATE',
				'RELATIONSHIP_ADD',
				'RELATIONSHIP_REMOVE',
				'CHANNEL_PINS_UPDATE',
				'VOICE_STATE_UPDATE',
				'VOICE_SERVER_UPDATE',
				'PRESENCE_UPDATE',
				'USER_SETTINGS_UPDATE'
			]
		});

		this.logger = logger;

		this.settings = new SettingsProvider(database.model('settings'));

		this.music = new Lavaqueue({
			userID: process.env.ID ? process.env.ID : this.user.id,
			password: process.env.LAVALINK_PASSWORD,
			hosts: {
				rest: process.env.LAVALINK_REST,
				ws: process.env.LAVALINK_WS,
				// eslint-disable-next-line multiline-ternary
				redis: process.env.REDIS ? {
					port: 6379,
					host: process.env.REDIS,
					db: 0,
					password: process.env.REDIS_PASSWORD
				} : ''
			},
			send: async (guild, packet) => {
				const shardGuild = this.guilds.get(guild);
				if (shardGuild) return shardGuild.shard.send(packet);
				return Promise.resolve();
			},
			advanceBy: queue => {
				const repeatGuild = this.settings.get(queue.guildID, 'repeat');
				if (repeatGuild === 'on') return 0;
			}
		});

		this.redis = this.music.queues.redis;

		this.storage = new Storage(this.redis);

		this.on('raw', async packet => {
			switch (packet.t) {
				case 'VOICE_STATE_UPDATE':
					if (packet.d.user_id !== process.env.ID) return;
					this.music.voiceStateUpdate(packet.d);
					const players = await this.storage.get('players', { type: ReferenceType.ARRAY }); // eslint-disable-line no-case-declarations
					let index; // eslint-disable-line no-case-declarations
					if (Array.isArray(players)) index = players.findIndex(player => player.guild_id === packet.d.guild_id);
					if (((!players && !index) || index < 0) && packet.d.channel_id) {
						await this.storage.upsert('players', [{ guild_id: packet.d.guild_id, channel_id: packet.d.channel_id }]);
					} else if (players && typeof index !== 'undefined' && index >= 0 && !packet.d.channel_id) {
						players.splice(index, 1);
						await this.storage.delete('players');
						if (players.length) await this.storage.set('players', players);
					}
					break;
				case 'VOICE_SERVER_UPDATE':
					this.music.voiceServerUpdate(packet.d);
					break;
				default:
					break;
			}
		});

		this.commandHandler = new CommandHandler(this, {
			commandDirectory: join(__dirname, '..', 'commands'),
			allowMention: true,
			defaultCooldown: 3000,
			aliasReplacement: /-/g,
			prefix: message => this.settings.get(message.guild.id, 'prefix', 'a!'),
			blockBots: true,
			blockClient: true
		});

		this.inhibitorHandler = new InhibitorHandler(this, { inhibitorDirectory: join(__dirname, '..', 'inhibitors') });
		this.listenerHandler = new ListenerHandler(this, { listenerDirectory: join(__dirname, '..', 'listeners') });
	}

	async _init() {
		await this.loadAll();
		await this.logger.info(`[DATABASE] Syncing modules to database...`);
		await this.settings.init();
		await database.sync();
		this.logger.info('[DATABASE] Synced modules!');
	}

	async start(token) {
		await this._init();
		return this.login(token);
	}
}

module.exports = AbayroClient;
