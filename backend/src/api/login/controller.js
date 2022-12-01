const service = require("./service");

// POST: /login
const login = async (req, res) => {
	const result = await service.login(req);
	const { data, message, status } = result;
	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

//
const verify = async (req, res) => {
	const result = await service.verify(req);
	const { data, message, status } = result;
	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

module.exports = { login };
