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
				const otp = createOTP();
				// await sendOTP(user.email, otp);
				console.log("sendOTP");
				await user.update({ otp });

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

	const user = await User.findByPk(id);

	if (parseInt(otp) === user.otp) {
		await user.update({ active: true });
		const roles = await user.getRoles();
		const roleIds = roles.map((role) => role.id);

		const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
			expiresIn: config.expires_in,
		});

		data = {
			user,
			token,
		};
		message = "OTP validation successful!";
		status = ResponseCode.OK;
	} else {
		data = null;
		message = "Invalid OTP";
		status = ResponseCode.Unauthorized;
	}

	return {
		data,
		message,
		status,
	};
};

module.exports = { login, verify };
