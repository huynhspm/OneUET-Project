const service = require("./service");

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
const verify = async (req, res) => {
	try {
		const result = await service.verify(req);
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

module.exports = { login, verify };
