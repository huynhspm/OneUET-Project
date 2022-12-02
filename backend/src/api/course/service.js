const { Course } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
const createCourse = async (req) => {
	try {
		const newCourse = req.body;
		data = await Course.create(newCourse);
		const message = "Create course successfully!";
		const status = ResponseCode.Created;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const getAllCourses = async (req) => {
	try {
		const data = await Course.findAll();
		const message = "Get all courses successfully";
		const status = ResponseCode.OK;

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const getCourseById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await Course.findByPk(id);

		if (data) {
			message = "Get course successfully";
			status = ResponseCode.OK;
		} else {
			message = "Course not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const updateCourse = async (req) => {
	try {
		let { data, message, status } = await getCourseById(req);

		if (data) {
			const updatedCourse = req.body;
			data = await data.update(updatedCourse);
			message = "Update course successfully";
			status = ResponseCode.OK;
		}

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const deleteCourse = async (req) => {
	try {
		let { data, message, status } = await getCourseById(req);

		if (data) {
			data = await data.destroy();
			message = "Delete course successfully";
			status = ResponseCode.OK;
		}

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};
// ok
const addCourse = async (req) => {};

const getAllClasses = async (req) => {
	try {
		let { data, message, status } = await getCourseById(req);

		if (data) {
			data = await data.getClasses();
			message = "Get all classes of course successfully";
			status = ResponseCode.OK;
		}

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

module.exports = {
	createCourse,
	getAllCourses,
	getCourseById,
	updateCourse,
	deleteCourse,
	addCourse,
	getAllClasses,
};
