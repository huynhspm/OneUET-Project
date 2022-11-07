const service = require("./service");

const createTeacher = async (req, res) => {
	const result = await service.createTeacher(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const getTeachers = async (req, res) => {
	const result = await service.getTeachers(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const updateTeacher = async (req, res) => {
	const result = await service.updateTeacher(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

const deleteTeacher = async (req, res) => {
	const result = await service.deleteTeacher(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

module.exports = { createTeacher, getTeachers, updateTeacher, deleteTeacher };
