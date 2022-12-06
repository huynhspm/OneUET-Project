const { Document } = require("../../database/models");
const { verifyUser } = require("../user/service");
const ResponseCode = require("../../utils/constant/ResponseCode");

const createDocument = async (req) => {
	try {
		const newDocument = req.body;
		const document = await Document.create(newDocument);

		const message = "Create document successfully!";
		const status = ResponseCode.Created;
		const data = { document };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getPublicDocuments = async (req) => {
	try {
		const documents = await Document.findAll({ where: { status: "public" } });

		const message = "Get public documents successfully";
		const status = ResponseCode.OK;
		const data = { documents };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getMyDocuments = async (req) => {
	try {
		let { user, message, status } = await verifyUser(req.user.id);
		if (user) {
			const documents = await user.getDocuments();

			message = "Get my documents successfully";
			status = ResponseCode.OK;
			data = { documents };
		}
		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const verifyDocument = async (req) => {
	try {
		const { id } = req.params;
		let document, message, status;
		document = await Document.findByPk(id);

		if (document) {
			message = "Get document successfully";
			status = ResponseCode.OK;
		} else {
			message = "Document not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			document,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const updateDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			const updatedDocument = req.body;
			document = await document.update(updatedDocument);
			message = "Update document successfully";
			status = ResponseCode.OK;
		}

		const data = { document };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const deleteMyDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			document = document.destroy();
			message = "Delete document successfully";
			status = ResponseCode.OK;
		}

		const data = { document };

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
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			document = document.destroy();
			message = "Delete document successfully";
			status = ResponseCode.OK;
		}

		const data = { document };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);
		let course, teacher, file;

		if (document) {
			course = await document.getCourse();
			teacher = await document.getTeacher();
			file = await document.getFile();

			message = "Get document successfully";
			status = ResponseCode.OK;
		}

		const data = {
			document,
			course,
			teacher,
			file,
		};

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
	getPublicDocuments,
	getMyDocuments,
	updateDocument,
	// deleteMyDocument,
	// getMyDocument,
	deleteDocument,
	getDocument,
};
