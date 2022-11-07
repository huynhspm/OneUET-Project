const { Class } = require("../../database/models");

const createClass = async (newClass) => {
	const data = await Class.create(newClass);

	const message = "Add Class successfully!";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const getClasses = async () => {
	const data = await Class.findAll();

	const message = "Get Classes successfully";
	const status = 200;

	return {
		data,
		message,
		status,
	};
};

const updateClass = async (updatedClass) => {
	await Class.update(updatedClass, {
		where: {
			id: updatedClass.id,
		},
	});

	const message = "Update Class successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

const deleteClass = async (deletedClass) => {
	await Class.destroy({
		where: {
			id: deletedClass.id,
		},
	});

	const message = "Delete Class successfully";
	const status = 200;

	return {
		message,
		status,
	};
};

module.exports = { createClass, getClasses, updateClass, deleteClass };
