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

// PUT: /user/me
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

// GET: /user/:id
const getUser = async (req, res) => {
	try {
		const result = await service.getUser(req);
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

const addUser = async (req, res) => {};

module.exports = {
	getAllUsers,
	updateUser,
	deleteUser,
	getUser,
	addUser,
};
