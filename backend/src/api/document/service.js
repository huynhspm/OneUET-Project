const { Document } = require("../../database/models");

const createDocument = async (newDocument) => {
	const data = await Document.create(newDocument);

	const message = "Add Document successfully!";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const getDocuments = async () => {
	const data = await Document.findAll();

	const message = "Get Documents successfully";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const updateDocument = async (updatedDocument) => {
	await Document.update(updatedDocument, {
		where: {
			id: updatedDocument.id,
		},
	});

	const message = "Update Document successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

const deleteDocument = async (deletedDocument) => {
	await Document.destroy({
		where: {
			id: deletedDocument.id,
		},
	});

	const message = "Delete Document successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

module.exports = { createDocument, getDocuments, updateDocument, deleteDocument };
