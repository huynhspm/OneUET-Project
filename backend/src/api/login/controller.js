const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /login
const login = async (req, res) => {
	try {
		const result = await service.login(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't login",
			status: ResponseCode.Bad_Request,
		});
	}
};

// POST: /login/verify
const verifyOTP = async (req, res) => {
	try {
		const result = await service.verifyOTP(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't verify OTP",
			status: ResponseCode.Bad_Request,
		});
	}
};

// POST: /login/forget
const sendOTP = async (req, res) => {
	try {
		const result = await service.sendOTP(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't forget password",
			status: ResponseCode.Bad_Request,
		});
	}
};

// POST: /login/forget
const resetPassword = async (req, res) => {
	try {
		const result = await service.resetPassword(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't reset password",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = { login, verifyOTP, sendOTP, resetPassword };
