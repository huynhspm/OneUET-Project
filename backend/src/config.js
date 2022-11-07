module.exports = {
	port: process.env.PORT || 2003,
	mysql_host: process.env.MYSQL_HOST,
	mysql_port: process.env.MYSQL_PORT,
	mysql_username: process.env.MYSQL_USERNAME,
	mysql_password: process.env.MYSQL_PASSWORD,
	mysql_database: process.env.MYSQL_DATABASE,
	secret_key: process.env.SECRET_KEY,
	expires_in: process.env.EXPIRES_IN,
};
