const { Course } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
const createCourse = async (req) => {
	try {
		const newCourse = req.body;
		const course = await Course.create(newCourse);

		const message = "Create course successfully!";
		const status = ResponseCode.Created;
		const data = { course };

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
		const courses = await Course.findAll();

		const message = "Get all courses successfully";
		const status = ResponseCode.OK;
		const data = { courses };

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
const verifyCourse = async (req) => {
	try {
		const { id } = req.params;
		let course, message, status;
		course = await Course.findByPk(id);

		if (course) {
			message = "Course existed";
			status = ResponseCode.OK;
		} else {
			message = "Course not existed";
			status = ResponseCode.OK;
		}

		return {
			course,
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
		let { course, message, status } = await verifyCourse(req);

		if (course) {
			const updatedCourse = req.body;
			course = await course.update(updatedCourse);
			message = "Update course successfully";
			status = ResponseCode.OK;
		}

		const data = { course };

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
		let { course, message, status } = await verifyCourse(req);

		if (course) {
			course = await course.destroy();
			message = "Delete course successfully";
			status = ResponseCode.OK;
		}

		const data = { course };

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
const getCourse = async (req) => {
	try {
		let { course, message, status } = await verifyCourse(req);
		let classes;

		if (course) {
			classes = await course.getClasses();
			message = "Get course successfully";
			status = ResponseCode.OK;
		}

		const data = {
			course,
			classes,
		};

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const addCourse = async (req) => {};

module.exports = {
	createCourse,
	getAllCourses,
	updateCourse,
	deleteCourse,
	getCourse,
	addCourse,
};
