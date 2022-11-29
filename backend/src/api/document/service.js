const { Document } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const createDocument = async (req) => {
	try {
		const newDocument = req.body;
		const data = await Document.create(newDocument);
		const message = "Create document successfully!";
		const status = ResponseCode.Created;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getAllDocuments = async (req) => {
	try {
		const data = await Document.findAll();
		const message = "Get all documents successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getDocumentById = async (req) => {
	try {
		const { id } = req.params;
		data = await Document.findByPk(id);
		const message = "Get document successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const updateDocument = async (req) => {
	try {
		const { id } = req.params;
		const updatedDocument = req.body;
		const data = await Document.update(updatedDocument, { where: { id } });
		const message = "Update document successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const deleteDocument = async (req) => {
	try {
		const { id } = req.params;
		const data = await Document.destroy({ where: { id } });
		const message = "Delete class successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

module.exports = {
	createDocument,
	getAllDocuments,
	getDocumentById,
	updateDocument,
	deleteDocument,
};
