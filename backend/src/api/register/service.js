const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../../database/models");

const register = async (newUser) => {
	await User.destroy({
		where: {
			email: "abc",
		},
	});

	const user = await User.create(newUser);
	const roles = await user.getRoles();
	const roleIds = roles.map((role) => role.id);

	const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
		expiresIn: config.expires_in,
	});

	const data = {
		user,
		token,
	};
	const message = "Register successfully!";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

module.exports = { register };
