const { Sequelize } = require("sequelize");

const config = require("../config");

console.log("Connecting to database.");

const sequelize = new Sequelize(
	config.mysql_database,
	config.mysql_username,
	config.mysql_password,
	{
		host: config.mysql_host,
		dialect: "mysql",
	}
);

const test_connection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

test_connection();

module.exports = sequelize;
