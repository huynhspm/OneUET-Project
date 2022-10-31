import { Sequelize } from "sequelize";
import config from "../config.js";

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

export default sequelize;
