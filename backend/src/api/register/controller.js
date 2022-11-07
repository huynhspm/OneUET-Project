const service = require("./service");

const register = async (req, res) => {
	const result = await service.register(req.body);
	const { data, message, status } = result;
	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

module.exports = { register };
