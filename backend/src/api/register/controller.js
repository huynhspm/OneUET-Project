const service = require("./service");

// POST: /register
const register = async (req, res) => {
	const result = await service.register(req);
	const { data, message, status } = result;
	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

module.exports = { register };
