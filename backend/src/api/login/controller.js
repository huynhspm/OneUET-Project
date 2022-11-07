const service = require("./service");

const login = async (req, res) => {
	const result = await service.login(req.body);
	const { data, message, status } = result;
	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

module.exports = { login };