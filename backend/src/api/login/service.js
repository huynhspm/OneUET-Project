const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../../database/models");

const verifyEmail = async (email) => {
	const user = await User.findOne({
		where: {
			email: email,
		},
	});
	return user;
};

const login = async (loginData) => {
	let data;
	let message;
	let status;
	const user = await verifyEmail(loginData.email);
	if (!user) {
		data = null;
		message = "Invalid email";
		status = 401;
	} else {
		const verifyPassword = bcrypt.compareSync(
			loginData.password,
			user.password
		);
		if (!verifyPassword) {
			data = null;
			message = "Invalid password!";
			status = 401;
		} else {
			const roles = await user.getRoles();
			const roleIds = roles.map((role) => role.id);

			const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
				expiresIn: config.expires_in,
			});

			data = {
				user,
				token,
			};
			message = "Login successfully!";
			status = 200;
		}
	}

	return {
		data,
		message,
		status,
	};
};

module.exports = { login };
