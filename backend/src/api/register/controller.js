const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /register
const register = async (req, res) => {
	try {
		const result = await service.register(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't register",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = { register };
