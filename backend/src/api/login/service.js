const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const { sendOTP, createOTP } = require("../../utils/email");

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
		const verifyPassword = bcrypt.compareSync(password, user.password);
		if (!verifyPassword) {
			message = "Invalid password!";
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
				message = "Login successfully!";
				status = ResponseCode.OK;
			} else {
				const { otp, expiredTime } = createOTP();
				// sendOTP(user.email, otp);
				console.log("sendOTP");
				await user.update({ otp, expiredTime });

				message = "Login successfully but not active!";
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
		data = null;
		message = "Invalid email";
		status = ResponseCode.Forbidden;
	} else {
		if (parseInt(otp) === user.otp) {
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
			message = "OTP validation successful!";
			status = ResponseCode.OK;
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

const forgetPassword = async (req, res) => {
	const { email } = req.body;
	const user = await verifyEmail(email);
	let data, message, status;

	if (!user) {
		message = "Invalid email";
		status = ResponseCode.Forbidden;
	} else {
		const { otp, expiredTime } = createOTP();
		// sendOTP(user.email, otp);
		console.log("sendOTP");
		await user.update({ otp, expiredTime });

		message = "Forget password successfully";
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
			const hashPassword = bcrypt.hashSync(password, config.salt);
			await user.update({ password: hashPassword });

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

module.exports = { login, verifyOTP, forgetPassword, resetPassword };
