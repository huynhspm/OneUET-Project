const service = require("./service");

const createCourse = async (req, res) => {
	console.log(req.body);
	const result = await service.createCourse(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const getCourses = async (req, res) => {
	const result = await service.getCourses(req.body);
	const { data, message, status } = result;

	res.status(status).json({
		data: data,
		message: message,
		status: status,
	});
};

const updateCourse = async (req, res) => {
	const result = await service.updateCourse(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

const deleteCourse = async (req, res) => {
	const result = await service.deleteCourse(req.body);
	const { message, status } = result;

	res.status(status).json({
		message: message,
		status: status,
	});
};

module.exports = {
	createCourse,
	getCourses,
	updateCourse,
	deleteCourse,
};
