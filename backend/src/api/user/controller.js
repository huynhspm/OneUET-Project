const service = require("./service");

// GET: /
const getAllUsers = async (req, res) => {
	try {
		const result = await service.getAllUsers(req);
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
const getUserById = async (req, res) => {
	try {
		const result = await service.getUserById(req);
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
const updateUser = async (req, res) => {
	try {
		const result = await service.updateUser(req);
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

const deleteUser = async (req, res) => {
	try {
		const result = await service.deleteUser(req);
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

const getAllClasses = async (req, res) => {
	try {
		const result = await service.getAllClasses(req);
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

module.exports = {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	getAllClasses,
	getAllDocuments,
};
