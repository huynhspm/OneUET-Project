const service = require("./service");

// POST: /
const createTeacher = async (req, res) => {
	const result = await service.createTeacher(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// GET: /
const getAllTeachers = async (req, res) => {
	const result = await service.getAllTeachers(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// GET: /:id
const getTeacherById = async (req, res) => {
	const result = await service.getTeacherById(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// PUT: /:id
const updateTeacher = async (req, res) => {
	const result = await service.updateTeacher(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// DELETE: /:id
const deleteTeacher = async (req, res) => {
	const result = await service.deleteTeacher(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

// GET: /:id/course
const getCourses = async (req, res) => {
	const result = await service.getCourses(req);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

module.exports = {
	createTeacher,
	getAllTeachers,
	getTeacherById,
	updateTeacher,
	deleteTeacher,
	getCourses,
};
