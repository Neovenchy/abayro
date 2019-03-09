const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');
const { staff, tokens } = require('./bot.js');
const { createLogger, transports, format } = require('winston');
const { join } = require('path');
const moment = require('moment');
const database = require('./Database');
const SettingsProvider = require('./SettingsProvider');

class AbayroClient extends AkairoClient {
	constructor() {
		super({
			ownerID: staff,
			messageCacheMaxSize: 1000,
			disableEveryone: true,
			disableEvents: ['TYPING_START']
		}, {
			disableEveryone: true
		});

		this.logger = createLogger({
			format: format.combine(
				format.colorize({
					all: true
				}),
				format.timestamp({
					format: moment().utcOffset('+03:00').format('YYYY/MM/DD HH:mm:ss')
				}),
				format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
			),
			transports: [new transports.Console()]
		});

		this.db = database;

		this.settings = new SettingsProvider(database.model('settings'));
	}

	async _init() {
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
		await this.loadAll();
		await this.logger.info(`[DATABASE] Syncing modules to database...`);
		await this.settings.init();
		this.logger.info('[DATABASE] Synced modules!');
	}

	async start() {
		await this._init();
		return this.login(tokens.discord);
	}
}

module.exports = AbayroClient;
