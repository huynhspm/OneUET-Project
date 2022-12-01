const { File } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const createFile = async (req) => {
	const newFile = req.body;
	const data = await File.create(newFile);

	const message = "Create file successfully!";
	const status = ResponseCode.Created;

	return {
		data,
		message,
		status,
	};
};

const getAllFiles = async (req) => {
	const data = await File.findAll();

	const message = "Get all files successfully";
	const status = ResponseCode.OK;

	return {
		data,
		message,
		status,
	};
};

const getFileById = async (req) => {
	const { id } = req.params;
	const data = await File.findByPk(id);

	const message = "Get files successfully";
	const status = ResponseCode.OK;

	return {
		data,
		message,
		status,
	};
};

const updateFile = async (req) => {
	const { id } = req.params;
	const updatedFile = req.body;

	const data = await File.update(updatedFile, {
		where: {
			id,
		},
	});

	const message = "Update file successfully";
	const status = ResponseCode.OK;

	return {
		data,
		message,
		status,
	};
};

const deleteFile = async (req) => {
	const { id } = req.params;
	const data = await File.destroy({
		where: {
			id,
		},
	});

	const message = "Delete file successfully";
	const status = ResponseCode.OK;

	return {
		data,
		message,
		status,
	};
};

const addFile = async (req) => {};

module.exports = {
	createFile,
	getAllFiles,
	getFileById,
	updateFile,
	deleteFile,
	addFile,
};
