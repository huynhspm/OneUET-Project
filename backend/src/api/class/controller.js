const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /class
const createClass = async (req, res) => {
	try {
		const result = await service.createClass(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't create class",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /class/
const getClasses = async (req, res) => {
	try {
		const result = await service.getClasses(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get classes",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /class/:id
const getClass = async (req, res) => {
	try {
		const result = await service.getClass(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get class",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /class/:id
const updateClass = async (req, res) => {
	try {
		const result = await service.updateClass(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't update class",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /class/:id
const deleteClass = async (req, res) => {
	try {
		const result = await service.deleteClass(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete class",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createClass,
	getClasses,
	getClass,
	updateClass,
	deleteClass,
};
