const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /
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
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /
const getAllCourses = async (req, res) => {
	try {
		const result = await service.getAllCourses(req);
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
const getCourseById = async (req, res) => {
	try {
		const result = await service.getCourseById(req);
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
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /:id
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
			data: e,
			message: "Error",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /:id/class
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

module.exports = {
	createCourse,
	getAllCourses,
	getCourseById,
	updateCourse,
	deleteCourse,
	getAllClasses,
};
