const jwt = require("jsonwebtoken");
const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const verifyEmail = async (email) => {
	return await User.findOne({ where: { email } });
};

const register = async (req) => {
	const newUser = req.body;
	let data, message, status;

	const user = await verifyEmail(newUser.email);

	console.log(user, "...................");

	if (user) {
		if (user.active) {
			data = null;
			message = "Email existed";
			status = ResponseCode.Bad_Request;
		} else {
			await user.update(newUser);
			message = "Register successfully but not active!";
			status = ResponseCode.Created;
		}
	} else {
		data = await User.create(newUser);
		message = "Register successfully but not active!";
		status = ResponseCode.Created;
	}

	return {
		data,
		message,
		status,
	};
};

module.exports = { register };
