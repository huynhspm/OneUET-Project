const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const { sendOTP, createOTP } = require("../../utils/email");

const verifyEmail = async (email) => {
	return await User.findOne({ where: { email } });
};

const register = async (req) => {
	const newUser = req.body;
	let data, message, status;

	const user = await verifyEmail(newUser.email);

	if (user) {
		if (user.active) {
			data = null;
			message = "Email existed";
			status = ResponseCode.Bad_Request;
		} else {
			const otp = createOTP();
			// await sendOTP(user.email, otp);
			console.log("sendOTP");
			newUser["otp"] = otp;
			data = await user.update(newUser);

			data = data.id;
			message = "Register successfully but not active!";
			status = ResponseCode.Created;
		}
	} else {
		const otp = createOTP();
		// await sendOTP(user.email, otp);
		console.log("sendOTP");
		newUser["otp"] = otp;
		data = await User.create(newUser);

		data = data.id;
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
