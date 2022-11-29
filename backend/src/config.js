module.exports = {
	port: process.env.PORT || 2003,
	mysql_host: process.env.MYSQL_SERVER_HOST,
	mysql_port: process.env.MYSQL_SERVER_PORT,
	mysql_username: process.env.MYSQL_USERNAME,
	mysql_password: process.env.MYSQL_PASSWORD,
	mysql_database: process.env.MYSQL_DATABASE,
	secret_key: process.env.SECRET_KEY,
	expires_in: process.env.EXPIRES_IN,
	mail_setting: {
		service: "gmail",
		auth: {
			user: process.env.MAIL_EMAIL,
			pass: process.env.MAIL_PASSWORD,
		},
	},
};
