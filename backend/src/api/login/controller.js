const service = require("./service");

// GET: /login
const login = async (req, res) => {
	const result = await service.login(req);
	const { data, message, status } = result;
	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

module.exports = { login };
