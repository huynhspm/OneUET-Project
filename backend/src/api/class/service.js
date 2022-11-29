const { Class, Teacher } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const createClass = async (req) => {
	try {
		const newClass = req.body;
		const data = await Class.create(newClass);
		const message = "Create class successfully!";
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

const getAllClasses = async (req) => {
	try {
		const data = await Class.findAll();
		const message = "Get all classes Successfully";
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

const getClassById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await Class.findByPk(id);

		if (!data) {
			message = "Class not existed";
			status = ResponseCode.Not_Found;
		} else {
			message = "Get class successfully";
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

const updateClass = async (req) => {
	try {
		const { id } = req.params;
		const updatedClass = req.body;
		const data = await Class.update(updatedClass, { where: { id } });
		const message = "Update class successfully";
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

const deleteClass = async (req) => {
	try {
		const { id } = req.params;
		const data = await Class.destroy({ where: { id } });
		const message = "Delete class successfully";
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

const addTeacher = async (req) => {
	try {
		const { teacherId } = req.body;
		let { data, message, status } = await Class.getClassById(req);

		if (data) {
			data = await curClass.addTeacher(teacherId);
			message = "Add teacher to class successfully";
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

const getAllTeachers = async (req) => {
	try {
		let { data, message, status } = await Class.getClassById(req);

		if (data) {
			data = await data.getTeachers();
			message = "Get all teachers of class successfully";
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

const getCourse = async (req) => {
	try {
		let { data, message, status } = await Class.getClassById(req);

		if (data) {
			data = await data.getCourse();
			message = "Get course of class successfully";
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
	createClass,
	getAllClasses,
	getClassById,
	updateClass,
	deleteClass,
	addTeacher,
	getAllTeachers,
	getCourse,
};
