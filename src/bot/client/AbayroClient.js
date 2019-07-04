const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');
const { staff, tokens } = require('../util/Constants');
const { join } = require('path');
// const { createServer } = require('http');
// const { parse } = require('url');
// const MuteScheduler = require('../structures/MuteScheduler');
const logger = require('../util/Logger');
const database = require('../structures/Database');
const SettingsProvider = require('../structures/SettingsProvider');

class AbayroClient extends AkairoClient {
	constructor() {
		super({
			ownerID: staff
		}, {
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

		this.db = database;

		this.settings = new SettingsProvider(database.model('settings'));

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
		// this.muteScheduler = new MuteScheduler(this, this.db.models.cases);

		// this.cmds = createServer((req, res) => {
		// 	if (parse(req.url).pathname === '/cmds') {
		// 		res.writeHead(200, { 'Content-Type': 'application/json' });
		// 		const cmds = this.commandHandler.modules.filter(cmd => cmd.category !== 'default').map(command => ({ command: command.id, desc: command.description, aliases: command.aliases, category: command.category.id }));
		// 		res.write(JSON.stringify(cmds));
		// 	}
		// 	res.end();
		// });
	}

	async _init() {
		await this.loadAll();
		await this.logger.info(`[DATABASE] Syncing modules to database...`);
		await this.settings.init();
		await this.db.sync();
		this.logger.info('[DATABASE] Synced modules!');
	}

	async start() {
		await this._init();
		return this.login(tokens.discord);
	}
}

module.exports = AbayroClient;
