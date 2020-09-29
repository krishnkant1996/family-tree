var Sequelize = require('sequelize');
// sequelize connect
exports.getSqlConnection = () => {
	let seqInstance = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
		timezone: process.env.TIME_ZONE, //Default `+00:00` to manage data as per timezone
		freezeTableName: true,
		benchmark: false,
		// logging: (...msg) => console.log(msg),
		pool: {
			max: 5,
			min: 0,
			idle: 10000,
			acquire: 30000
		}
	});
	console.log(process.env.DEBUG)
	if (process.env.DEBUG === 'true') {
		seqInstance
			.authenticate()
			.then(() => {
				console.log('Connection has been established successfully.');
			})
			.catch((error) => {
				console.log('Unable to connect to the database:', error);
				throw error;
			});
	}

	seqInstance = {
		Sequelize: Sequelize,
		seqInstance: seqInstance,
		Family: seqInstance.import('../api/family/family.model'),
		FamilyMembers: seqInstance.import('../api/family-members/family-members.model'),
	};
	return seqInstance;
};