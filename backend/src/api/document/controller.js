const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /
const createDocument = async (req, res) => {
	try {
		const result = await service.createDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /
const getAllDocuments = async (req, res) => {
	try {
		const result = await service.getAllDocuments(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /:id
const getDocumentById = async (req, res) => {
	try {
		const result = await service.getDocumentById(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /:id
const updateDocument = async (req, res) => {
	try {
		const result = await service.updateDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /:id
const deleteDocument = async (req, res) => {
	try {
		const result = await service.deleteDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createDocument,
	getAllDocuments,
	getDocumentById,
	updateDocument,
	deleteDocument,
};
