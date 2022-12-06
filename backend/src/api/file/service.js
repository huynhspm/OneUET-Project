const { File } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
const createFile = async (req) => {
	try {
		const newFile = req.body;
		const file = await File.create(newFile);

		const message = "Create file successfully!";
		const status = ResponseCode.Created;
		const data = { file };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const getAllFiles = async (req) => {
	try {
		const files = await File.findAll();

		const message = "Get all files successfully";
		const status = ResponseCode.OK;
		const data = { files };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};
// ok
const verifyFile = async (req) => {
	try {
		const { id } = req.params;
		let file, message, status;
		file = await File.findByPk(id);

		if (file) {
			message = "Get file successfully";
			status = ResponseCode.OK;
		} else {
			message = "File not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			file,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const updateFile = async (req) => {
	try {
		let { file, message, status } = await verifyFile(req);

		if (file) {
			const updatedFile = req.body;
			file = await file.update(updatedFile);
			message = "Update file successfully";
			status = ResponseCode.OK;
		}

		const data = { file };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const deleteFile = async (req) => {
	try {
		let { file, message, status } = await verifyFile(req);

		if (file) {
			file = file.destroy();
			message = "Delete file successfully";
			status = ResponseCode.OK;
		}

		const data = { file };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const getFile = async (req) => {
	try {
		let { file, message, status } = await verifyFile(req);

		const data = { file };

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
	createFile,
	getAllFiles,
	updateFile,
	deleteFile,
	getFile,
};
