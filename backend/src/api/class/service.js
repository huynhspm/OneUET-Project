const { Class } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const verifyClass = async (req) => {
	try {
		const { id } = req.params;
		let curClass, message, status;
		curClass = await Class.findByPk(id);

		if (curClass) {
			message = "Get class successfully";
			status = ResponseCode.OK;
		} else {
			message = "Class not existed";
			status = ResponseCode.OK;
		}

		return {
			curClass,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const createClass = async (req) => {
	try {
		const newClass = req.body;
		const curClass = await Class.create(newClass);

		const message = "Create class successfully!";
		const status = ResponseCode.Created;
		const data = { curClass };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getMyClasses = async (req) => {
	try {
		const classes = await Class.findAll();
		const message = "Get my classes successfully";
		const status = ResponseCode.OK;

		const data = { classes };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getMyStudiedClasses = async (req) => {
	try {
		const classes = await Class.findAll({ where: {} });
		const message = "Get classes successfully";
		const status = ResponseCode.OK;

		const data = { classes };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getMyStudyingClasses = async (req) => {
	try {
		const classes = await Class.findAll();
		const message = "Get classes successfully";
		const status = ResponseCode.OK;

		const data = { classes };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getMyClass = async (req) => {
	try {
		let { curClass, message, status } = await verifyClass(req);
		let teachers, students, course;

		if (curClass) {
			teachers = await curClass.getTeachers();
			students = await curClass.getStudents();
			course = await curClass.getCourse();

			message = "Get class successfully";
			status = ResponseCode.OK;
		}

		const data = {
			curClass,
			teachers,
			students,
			course,
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

const getClasses = async (req) => {
	try {
		const classes = await Class.findAll();
		const message = "Get classes successfully";
		const status = ResponseCode.OK;

		const data = { classes };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getClass = async (req) => {
	try {
		let { curClass, message, status } = await verifyClass(req);
		let teachers, students, course;

		if (curClass) {
			teachers = await curClass.getTeachers();
			students = await curClass.getStudents();
			course = await curClass.getCourse();

			message = "Get class successfully";
			status = ResponseCode.OK;
		}

		const data = {
			curClass,
			teachers,
			students,
			course,
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

const updateClass = async (req) => {
	try {
		let { curClass, message, status } = await verifyClass(req);

		if (curClass) {
			const { updatedClass, courseId } = req.body;
			curClass = await curClass.update(updatedClass);

			message = "Update class successfully";
			status = ResponseCode.OK;
		}

		const data = { curClass };

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
		let { curClass, message, status } = await verifyClass(req);

		if (curClass) {
			curClass = await curClass.destroy();
			message = "Delete class successfully";
			status = ResponseCode.OK;
		}

		const data = { curClass };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// const addClass = async (req) => {
// 	try {
// 		const { teacherId, courseId, studentId } = req.body;
// 		let { curClass, message, status } = await getClassById(req);
// 		let data = null;

// 		if (curClass) {
// 			if (teacherId) await curClass.addTeacher(teacherId);
// 			if (courseId) await curClass.setCourse(courseId);
// 			if (studentId) await curClass.addStudent(studentId);

// 			message = "Add class successfully";
// 			status = ResponseCode.OK;
// 		}

// 		data = curClass;

// 		return {
// 			data,
// 			message,
// 			status,
// 		};
// 	} catch (e) {
// 		throw e;
// 	}
// };

module.exports = {
	createClass,
	getMyClasses,
	getMyStudiedClasses,
	getMyStudyingClasses,
	getMyClass,
	getClasses,
	getClass,
	updateClass,
	deleteClass,
};
