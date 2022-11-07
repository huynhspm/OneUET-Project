const service = require("./service");

const createDocument = async (req, res) => {
	console.log(req.body);
	const result = await service.createDocument(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const getDocuments = async (req, res) => {
	const result = await service.getDocuments(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const updateDocument = async (req, res) => {
	const result = await service.updateDocument(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

const deleteDocument = async (req, res) => {
	const result = await service.deleteDocument(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

module.exports = {
	createDocument,
	getDocuments,
	updateDocument,
	deleteDocument,
};
