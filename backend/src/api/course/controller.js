const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /course
const createCourse = async (req, res) => {
	try {
		const result = await service.createCourse(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't create course",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /course
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
			message: "Couldn't get all courses",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /course/:id
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
			message: "Couldn't get course",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /course/:id
const updateCourse = async (req, res) => {
	try {
		const result = await service.updateCourse(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't update course",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /course/:id
const deleteCourse = async (req, res) => {
	try {
		const result = await service.deleteCourse(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete course",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createCourse,
	getCourses,
	getCourse,
	updateCourse,
	deleteCourse,
};
