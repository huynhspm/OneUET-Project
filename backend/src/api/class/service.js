const { Class } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
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

// ok
const getAllClasses = async (req) => {
	try {
		const data = await Class.findAll();
		const message = "Get all classes successfully";
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
const getClassById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await Class.findByPk(id);

		if (data) {
			message = "Get class successfully";
			status = ResponseCode.OK;
		} else {
			data = null;
			message = "Class not existed";
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
const updateClass = async (req) => {
	try {
		let { data, message, status } = await getClassById(req);

		if (data) {
			const updatedClass = req.body;
			data = await data.update(updatedClass);
			message = "Update class successfully";
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
const deleteClass = async (req) => {
	try {
		let { data, message, status } = await getClassById(req);

		if (data) {
			data = await data.destroy();
			message = "Delete class successfully";
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

const addClass = async (req) => {
	try {
		const { teacherId, courseId, studentId } = req.body;
		let { curClass, message, status } = await getClassById(req);
		let data = null;

		if (curClass) {
			if (teacherId) await curClass.addTeacher(teacherId);
			if (courseId) await curClass.setCourse(courseId);
			if (studentId) await curClass.addStudent(studentId);

			message = "Add class successfully";
			status = ResponseCode.OK;
		}

		data = curClass;

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
const getAllTeachers = async (req) => {
	try {
		let { data, message, status } = await getClassById(req);

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

// ok
const getAllStudents = async (req) => {
	try {
		let { data, message, status } = await getClassById(req);

		if (data) {
			data = await data.getStudents();
			message = "Get all students of class successfully";
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
const getCourse = async (req) => {
	try {
		let { data, message, status } = await getClassById(req);

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
	addClass,
	getAllTeachers,
	getAllStudents,
	getCourse,
};
