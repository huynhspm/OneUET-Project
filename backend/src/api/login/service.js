const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const verifyEmail = async (email) => {
	return await User.findOne({ where: { email } });
};

const login = async (req) => {
	const loginData = req.body;
	let data, message, status;

	const user = await verifyEmail(loginData.email);

	if (!user) {
		data = null;
		message = "Invalid email";
		status = ResponseCode.Not_Found;
	} else {
		const verifyPassword = bcrypt.compareSync(
			loginData.password,
			user.password
		);
		if (!verifyPassword) {
			data = null;
			message = "Invalid password!";
			status = ResponseCode.Unauthorized;
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
			status = ResponseCode.OK;
		}
	}

	return {
		data,
		message,
		status,
	};
};

module.exports = { login };
