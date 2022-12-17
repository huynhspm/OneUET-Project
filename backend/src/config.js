module.exports = {
	port: process.env.PORT || 2003,
	mysql_host: process.env.MYSQL_SERVER_HOST || process.env.MYSQL_LOCAL_HOST,
	mysql_port: process.env.MYSQL_SERVER_PORT || process.env.MYSQL_LOCAL_PORT,
	mysql_username:
		process.env.MYSQL_USERNAME || process.env.MYSQL_LOCAL_USERNAME,
	mysql_password:
		process.env.MYSQL_PASSWORD || process.env.MYSQL_LOCAL_PASSWORD,
	mysql_database: process.env.MYSQL_DATABASE,
	secret_key: process.env.SECRET_KEY,
	expires_in: process.env.EXPIRES_IN,
	salt: parseInt(process.env.SALT),
	mail_setting: {
		service: "gmail",
		auth: {
			user: process.env.MAIL_EMAIL,
			pass: process.env.MAIL_PASSWORD,
		},
	},
};
