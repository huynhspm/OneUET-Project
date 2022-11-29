const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /
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
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /
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

// GET: /:id
const getClassById = async (req, res) => {
	try {
		const result = await service.getClassById(req);
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
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /:id
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
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// POST: /:id/teacher
const addTeacher = async (req, res) => {
	try {
		const result = await service.addTeacher(req);
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

// GET: /:id/teacher
const getAllTeachers = async (req, res) => {
	try {
		const result = await service.getAllTeachers(req);
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

// GET: /:id/course
const getCourse = async (req, res) => {
	try {
		const result = await service.getCourse(req);
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
	createClass,
	getAllClasses,
	getClassById,
	updateClass,
	deleteClass,
	addTeacher,
	getAllTeachers,
	getCourse,
};
