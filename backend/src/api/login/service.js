const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const { sendEmailOTP, createOTP } = require("../../utils/email");
const { hashPassword, comparePassword } = require("../../utils/password");

const verifyEmail = async (email) => {
	return await User.findOne({ where: { email } });
};

const login = async (req) => {
	const { email, password } = req.body;
	let data, message, status;

	const user = await verifyEmail(email);

	if (!user) {
		message = "Invalid email";
		status = ResponseCode.Forbidden;
	} else {
		const verifyPassword = comparePassword(password, user.password);
		
		if (!verifyPassword) {
			message = "Invalid password";
			status = ResponseCode.Forbidden;
		} else {
			if (user.active) {
				const role = await user.getRole();

				const token = jwt.sign(
					{ id: user.id, roleId: role.id },
					config.secret_key,
					{
						expiresIn: config.expires_in,
					}
				);

				data = { token };
				message = "Login successfully";
				status = ResponseCode.OK;
			} else {
				const { otp, expiredTime } = createOTP();
				// sendOTP(user.email, otp);
				console.log("sendOTP");
				await user.update({ otp, expiredTime });

				message = "Login successfully but not active";
				status = ResponseCode.Unauthorized;
			}
		}
	}

	return {
		data,
		message,
		status,
	};
};

const verifyOTP = async (req, res) => {
	const { email, otp } = req.body;
	const user = await verifyEmail(email);
	let data, message, status;

	if (!user) {
		message = "Invalid email";
		status = ResponseCode.Forbidden;
	} else {
		if (parseInt(otp) === user.otp) {
			if (new Date(Date.now()) > user.expiredTime) {
				message = "OTP expired, please click resend";
				status = ResponseCode.OK;
			} else {
				await user.update({ active: true });
				const role = await user.getRole();
				const token = jwt.sign(
					{ id: user.id, roleId: role.id },
					config.secret_key,
					{
						expiresIn: config.expires_in,
					}
				);

				data = { token };
				message = "OTP validation successful";
				status = ResponseCode.OK;
			}
		} else {
			message = "Invalid OTP";
			status = ResponseCode.Unauthorized;
		}
	}

	return {
		data,
		message,
		status,
	};
};

const sendOTP = async (req, res) => {
	const { email } = req.body;
	const user = await verifyEmail(email);
	let data, message, status;

	if (!user) {
		message = "Invalid email";
		status = ResponseCode.Forbidden;
	} else {
		const { otp, expiredTime } = createOTP();
		// sendEmailOTP(user.email, otp);
		console.log("sendEmailOTP");
		await user.update({ otp, expiredTime });

		message = "Send OTP successfully";
		status = ResponseCode.OK;
	}

	return {
		data,
		message,
		status,
	};
};

const resetPassword = async (req, res) => {
	const { email, password, otp } = req.body;
	const user = await verifyEmail(email);
	let data, message, status;

	if (!user) {
		data = null;
		message = "Invalid email";
		status = ResponseCode.Forbidden;
	} else {
		if (parseInt(otp) === user.otp) {
			if (new Date(Date.now()) > user.expiredTime) {
				message = "OTP expired, please click resend";
				status = ResponseCode.OK;
			} else {
				await user.update({ password: hashPassword(password) });

				const role = await user.getRole();
				const token = jwt.sign(
					{ id: user.id, roleId: role.id },
					config.secret_key,
					{
						expiresIn: config.expires_in,
					}
				);

				data = { token };
				message = "Reset password successfully";
				status = ResponseCode.OK;
			}
		} else {
			message = "Invalid OTP";
			status = ResponseCode.Unauthorized;
		}
	}

	return {
		data,
		message,
		status,
	};
};

module.exports = { login, verifyOTP, sendOTP, resetPassword };
