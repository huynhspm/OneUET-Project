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

// GET: /document/public
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

// GET: /document/public/:id
const getPublicDocument = async (req, res) => {
	try {
		const result = await service.getPublicDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get public document",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /document/me/:id
const getMyDocument = async (req, res) => {
	try {
		const result = await service.getMyDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get my document",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /document/me/:id
const updateMyDocument = async (req, res) => {
	try {
		console.log(req.user);
		const result = await service.updateMyDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't update my document",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /document/me/:id
const deleteMyDocument = async (req, res) => {
	try {
		const result = await service.deleteMyDocument(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete my document",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /document/
const getDocuments = async (req, res) => {
	try {
		const result = await service.getDocuments(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get documents",
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

module.exports = {
	createDocument,
	getPublicDocuments,
	getPublicDocument,
	getMyDocument,
	updateMyDocument,
	deleteMyDocument,
	getDocuments,
	getDocument,
	deleteDocument,
};
