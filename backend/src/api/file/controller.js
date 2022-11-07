const service = require("./service");

const createFile = async (req, res) => {
	console.log(req.body);
	const result = await service.createFile(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const getFiles = async (req, res) => {
	const result = await service.getFiles(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const updateFile = async (req, res) => {
	const result = await service.updateFile(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

const deleteFile = async (req, res) => {
	const result = await service.deleteFile(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

module.exports = {
	createFile,
	getFiles,
	updateFile,
	deleteFile,
};
