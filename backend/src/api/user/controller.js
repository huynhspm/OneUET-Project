const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// GET: /user/me
const getMyUser = async (req, res) => {
	try {
		const result = await service.getMyUser(req);
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

// PUT: /user/me
const updateMyUser = async (req, res) => {
	try {
		const result = await service.updateMyUser(req);
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

// GET: /user
const getUsers = async (req, res) => {
	try {
		const result = await service.getUsers(req);
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

module.exports = {
	getMyUser,
	updateMyUser,
	getUsers,
	getUser,
	deleteUser,
};
