const { Teacher } = require("../../database/models");

const createTeacher = async (newTeacher) => {
	const data = await Teacher.create(newTeacher);

	const message = "Add Teacher successfully!";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const getTeachers = async () => {
	const data = await Teacher.findAll();

	const message = "Get Teachers successfully";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const updateTeacher = async (updatedTeacher) => {
	await Teacher.update(updatedTeacher, {
		where: {
			id: updatedTeacher.id,
		},
	});

	const message = "Update Teacher successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

const deleteTeacher = async (deletedTeacher) => {
	await Teacher.destroy({
		where: {
			id: deletedTeacher.id,
		},
	});

	const message = "Delete Teacher successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

module.exports = { createTeacher, getTeachers, updateTeacher, deleteTeacher };
