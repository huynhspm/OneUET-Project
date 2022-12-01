const service = require("./service");

// POST: /teacher
const createTeacher = async (req, res) => {
	try {
		const result = await service.createTeacher(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't create teacher",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /teacher
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
			message: "Couldn't get all teachers",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /teacher/:id
const getTeacherById = async (req, res) => {
	try {
		const result = await service.getTeacherById(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get teacher",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /teacher/:id
const updateTeacher = async (req, res) => {
	try {
		const result = await service.updateTeacher(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't update teacher",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /:id
const deleteTeacher = async (req, res) => {
	try {
		const result = await service.deleteTeacher(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete teacher",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /:id/course
const getCourses = async (req, res) => {
	try {
		const result = await service.getCourses(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get all courses of teacher",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createTeacher,
	getAllTeachers,
	getTeacherById,
	updateTeacher,
	deleteTeacher,
	getCourses,
};
