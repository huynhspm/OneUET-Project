const service = require("./service");

const createClass = async (req, res) => {
	const result = await service.createClass(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const getClasses = async (req, res) => {
	const result = await service.getClasses(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const updateClass = async (req, res) => {
	const result = await service.updateClass(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

const deleteClass = async (req, res) => {
	const result = await service.deleteClass(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

module.exports = { createClass, getClasses, updateClass, deleteClass };
