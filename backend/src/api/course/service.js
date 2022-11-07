const { Course } = require("../../database/models");

const createCourse = async (newCourse) => {
	const data = await Course.create(newCourse);

	const message = "Add Course successfully!";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const getCourses = async () => {
	const data = await Course.findAll();

	const message = "Get Courses successfully";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const updateCourse = async (updatedCourse) => {
	await Course.update(updatedCourse, {
		where: {
			id: updatedCourse.id,
		},
	});

	const message = "Update Course successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

const deleteCourse = async (deletedCourse) => {
	await Course.destroy({
		where: {
			id: deletedCourse.id,
		},
	});

	const message = "Delete Course successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
