const { File } = require("../../database/models");

const createFile = async (newFile) => {
	const data = await File.create(newFile);

	const message = "Add File successfully!";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const getFiles = async () => {
	const data = await File.findAll();

	const message = "Get Files successfully";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const updateFile = async (updatedFile) => {
	await File.update(updatedFile, {
		where: {
			id: updatedFile.id,
		},
	});

	const message = "Update File successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

const deleteFile = async (deletedFile) => {
	await File.destroy({
		where: {
			id: deletedFile.id,
		},
	});

	const message = "Delete File successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

module.exports = { createFile, getFiles, updateFile, deleteFile };
