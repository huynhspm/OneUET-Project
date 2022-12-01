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

// GET: /class
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
			message: "Couldn't get all classes",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /class/:id
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

// POST: class/:id
const addClass = async (req, res) => {
	try {
		const result = await service.addClass(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't add  class",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: class/:id/teacher
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
			data: e.message,
			message: "Couldn't get all teachers of class",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: class/:id/student
const getAllStudents = async (req, res) => {
	try {
		const result = await service.getAllStudents(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get all students of class",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: class/:id/course
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
			data: e.message,
			message: "Couldn't get course of class",
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
	addClass,
	getAllTeachers,
	getAllStudents,
	getCourse,
};
