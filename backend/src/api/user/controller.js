const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// GET: /user
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

// GET: /user/:id
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
			data: e.message,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /user/:id
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

// DELETE: /user/:id
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

// GET: /user/:id/class
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
			data: e.message,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /user/:id/document
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

// GET: /user/:id/grade

module.exports = {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	getAllClasses,
	getAllDocuments,
};
