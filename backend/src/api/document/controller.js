const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /document
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
			data: e.message,
			message: "Couldn't create document",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /document
const getPublicDocuments = async (req, res) => {
	try {
		const result = await service.getPublicDocuments(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get public documents",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /document/me
const getMyDocuments = async (req, res) => {
	try {
		const result = await service.getMyDocuments(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get my documents",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /document/:id
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
			data: e.message,
			message: "Couldn't update document",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /document/:id
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
			data: e.message,
			message: "Couldn't delete document",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /document/:id
const getDocument = async (req, res) => {
	try {
		const result = await service.getDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get document",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createDocument,
	getPublicDocuments,
	getMyDocuments,
	updateDocument,
	deleteDocument,
	getDocument,
};
