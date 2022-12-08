const { Document } = require("../../database/models");
const { verifyUser } = require("../user/service");
const ResponseCode = require("../../utils/constant/ResponseCode");

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

const getPublicDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);
		let course, teacher, file, comments;

		if (document) {
			if (document.status === "public") {
				course = await document.getCourse();
				teacher = await document.getTeacher();
				file = await document.getFile();
				comments = await document.getComments();

				message = "Get public document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not public";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = {
			document,
			course,
			teacher,
			file,
			comments,
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

const getMyDocuments = async (req) => {
	try {
		const userId = req.user.id;
		const documents = await Document.findAll({ where: { userId } });

		const message = "Get my documents successfully";
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

const getMyDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);
		let course, teacher, file, comments;

		if (document) {
			if (document.userId === req.user.id) {
				course = await document.getCourse();
				teacher = await document.getTeacher();
				file = await document.getFile();
				comments = await document.getComments();

				message = "Get my document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not belongs to you";
				status = ResponseCode.Unauthorized;
			}
		}

		const data = {
			document,
			course,
			teacher,
			file,
			comments,
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

const updateMyDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			if (document.userId === req.user.id) {
				const updatedDocument = req.body;
				document = await document.update(updatedDocument);
				message = "Update my document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not belongs to you";
				status = ResponseCode.Unauthorized;
			}
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
			if (document.userId === req.user.id) {
				document = await document.destroy();
				message = "Delete my document successfully";
				status = ResponseCode.OK;
			} else {
				document = null;
				message = "Document not belongs to you";
				status = ResponseCode.Unauthorized;
			}
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

const getDocuments = async (req) => {
	try {
		const documents = await Document.findAll();

		const message = "Get documents successfully";
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

const getDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);
		let course, teacher, file, comments;

		if (document) {
			course = await document.getCourse();
			teacher = await document.getTeacher();
			file = await document.getFile();
			comments = await document.getComments();

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

const deleteDocument = async (req) => {
	try {
		let { document, message, status } = await verifyDocument(req);

		if (document) {
			document = await document.destroy();
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

module.exports = {
	createDocument,
	getPublicDocuments,
	getPublicDocument,
	getMyDocuments,
	getMyDocument,
	updateMyDocument,
	deleteMyDocument,
	getDocuments,
	getDocument,
	deleteDocument,
};
