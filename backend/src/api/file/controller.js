const service = require("./service");

// POST: /
const createFile = async (req, res) => {
	const result = await service.createFile(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// GET: /
const getAllFiles = async (req, res) => {
	const result = await service.getAllFiles(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// GET: /:id
const getFileById = async (req, res) => {
	const result = await service.getFileById(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};
// PUT: /:id

const updateFile = async (req, res) => {
	const result = await service.updateFile(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// DELETE: /:id
const deleteFile = async (req, res) => {
	const result = await service.deleteFile(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

module.exports = {
	createFile,
	getAllFiles,
	getFileById,
	updateFile,
	deleteFile,
};
