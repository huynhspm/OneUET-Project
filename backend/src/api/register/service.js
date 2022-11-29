const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const register = async (req) => {
	const newUser = req.body;
	let data, message, status;

	try {
		console.log(newUser);
		const user = await User.create(newUser);
		console.log(newUser);
		const roles = await user.getRoles();
		const roleIds = roles.map((role) => role.id);

		const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
			expiresIn: config.expires_in,
		});

		data = {
			user,
			token,
		};
		message = "Register successfully!";
		status = ResponseCode.Created;
	} catch (error) {
		data = null;
		message = "Email existed";
		status = ResponseCode.Bad_Request;
	}

	return {
		data,
		message,
		status,
	};
};

module.exports = { register };
