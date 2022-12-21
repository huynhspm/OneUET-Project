const { User, Student } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const RoleCode = require("../../utils/constant/RoleCode");
const { sendEmailOTP, createOTP } = require("../../utils/email");
const { hashPassword } = require("../../utils/password");

const verifyEmail = async (email) => {
	return await User.findOne({ where: { email } });
};

const register = async (req) => {
	const newUser = req.body;
	let data, message, status;

	const user = await verifyEmail(newUser.email);

	if (user) {
		if (user.active) {
			message = "Email existed";
			status = ResponseCode.Bad_Request;
		} else {
			const { otp, expiredTime } = createOTP();
			sendEmailOTP(user.email, otp);
			newUser["otp"] = otp;
			newUser["expiredTime"] = expiredTime;
			newUser["password"] = hashPassword(newUser.password);
			data = await user.update(newUser);

			message = "Register successfully but not active!";
			status = ResponseCode.Created;
		}
	} else {
		const code = newUser.email.split("@")[0];
		const student = await Student.findOne({ where: { code } });

		if (student) {
			const { otp, expiredTime } = createOTP();
			sendEmailOTP(newUser.email, otp);
			newUser["otp"] = otp;
			newUser["expiredTime"] = expiredTime;
			newUser["studentId"] = student.id;
			newUser["roleId"] = RoleCode.User;
			newUser["password"] = hashPassword(newUser.password);
			await User.create(newUser);

			message = "Register successfully but not active";
			status = ResponseCode.Created;
		} else {
			message = "Code not existed, student not existed";
			status = ResponseCode.Created;
		}
	}

	return {
		message,
		status,
	};
};

module.exports = { register };
