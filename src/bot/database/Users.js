const sequelize = require('../structures/Database');
const { models: { users } } = sequelize;
/**
 * @param {String} id - The id for the user or member
 * @param {String} item - The item you looking for , example: 'credits' or leave it if you are looking for all things!
 * @param {String} defaultValue - the thing you want to return if there's no data!
*/
exports.find = async (id, item, defaultValue) => {
	if (!id) throw new Error(`[Users Helpful Database Tool] You didn't set id!`);
	try {
		const user = await users.findByPk(id, { attributes: [item] });
		return user[item];
	} catch {
		return defaultValue;
	}
};

/**
 * @param {String} id - The id for the	 user or member
 * @param {String} item - The item you looking for , example: 'credits'
 * @param {String} value - The new value for your item
*/
exports.update = async (id, item, value) => {
	if (!id) throw new Error(`[Users Helpful Database Tool] You didn't set id!`);
	if (!item) throw new Error(`[Users Helpful Database Tool] You didn't set an item!`);
	const [user] = await users.findOrCreate({ where: { id } });
	user.set(item, value);
	return user.save();
};

exports.increase = async (id, item, newValue) => {
	if (!id) throw new Error(`[Users Helpful Database Tool] You didn't set id!`);
	if (!item) throw new Error(`[Users Helpful Database Tool] You didn't set an item!`);
	const [user] = await users.findOrCreate({ where: { id } });
	return user.increment(item, { by: newValue });
};

exports.decrease = async (id, item, newValue) => {
	if (!id) throw new Error(`[Users Helpful Database Tool] You didn't set id!`);
	if (!item) throw new Error(`[Users Helpful Database Tool] You didn't set an item!`);
	const [user] = await users.findOrCreate({ where: { id } });
	return user.decrement(item, { by: newValue });
};
/**
 * @param {string} id - The user id
 * @param {string} method - the method: 'textxp' 'voicexp' 'credits'
 * @param {string} defaultValue - default value if user is not on database
 */
exports.rank = async (id, method) => {
	if (!id) throw new Error(`[Users Helpful Database Tool] You didn't set id!`);
	const [rank] = await sequelize.query(`SELECT ranks.rank FROM ( SELECT id, DENSE_RANK() OVER (ORDER BY ${method} DESC) AS rank FROM users ) ranks WHERE id='${id}' LIMIT 1;`, { type: sequelize.QueryTypes.SELECT });
	return rank;
};
/**
 * @description ONLY USE THIS IF YOU KNOW WHAT YOU ARE DOING!
 */
exports.users = users;
