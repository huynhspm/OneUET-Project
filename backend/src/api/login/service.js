const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const sendOTP = require("../../utils/email");

const getOTP = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
		status = ResponseCode.Forbidden;
	} else {
		const verifyPassword = bcrypt.compareSync(
			loginData.password,
			user.password
		);

		if (!verifyPassword) {
			data = null;
			message = "Invalid password!";
			status = ResponseCode.Forbidden;
		} else {
			if (user.active) {
				const roles = await user.getRoles();
				const roleIds = roles.map((role) => role.id);

				const token = jwt.sign(
					{ userId: user.id, roleIds },
					config.secret_key,
					{
						expiresIn: config.expires_in,
					}
				);

				data = {
					user,
					token,
				};
				message = "Login successfully!";
				status = ResponseCode.OK;
			} else {
				const subject = "Verify email with OTP code";
				const otp = getOTP();
				await sendOTP(user.email, subject, otp);
				user.update({ otp });

				data = user.id;
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

const verify = async (req, res) => {
	const { id, otp } = req.body;
	let data, message, status;

	const user = User.findByPk(id);

	if (otp === user.otp) {
		const roles = await user.getRoles();
		const roleIds = roles.map((role) => role.id);

		const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
			expiresIn: config.expires_in,
		});

		data = {
			user,
			token,
		};
		message = "OTP validation Successful!";
		status = ResponseCode.OK;
	} else {
		data = null;
		message = "Invalid OTP";
		status = ResponseCode.Unauthorized;
	}
};

module.exports = { login, verify };
