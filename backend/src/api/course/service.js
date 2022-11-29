const { Course } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

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

const getCourseById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await Course.findByPk(id);

		if (!data) {
			message = "Course not existed";
			status = ResponseCode.Not_Found;
		} else {
			message = "Get course successfully";
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

const updateCourse = async (req) => {
	try {
		const { id } = req.params;
		const updatedCourse = req.body;
		const data = await Course.update(updatedCourse, { where: { id } });
		const message = "Update course successfully";
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

const deleteCourse = async (req) => {
	try {
		const { id } = req.params;
		const data = await Course.destroy({ where: { id } });
		const message = "Delete course successfully";
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
	getAllClasses,
};
