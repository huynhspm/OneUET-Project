const { Class, StudentClass } = require("../../database/models");
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

const addStudent = async (req) => {
	try {
		let curClass, message, status;
		const { codeClass, semester, codeStudent, midterm, final, total } =
			req.body;
		curClass = await Class.findOne({
			where: { code: codeClass, semester: semester },
		});

		if (curClass) {
			message = "Add student successfully";
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
		let teachers, students, course;

		if (curClass) {
			const updatedClass = req.body;
			const { teacherIds, studentIds } = req.body;

			teachers = await curClass.setTeachers(teacherIds);
			students = await curClass.setStudents(studentIds);
			course = await curClass.setCourse();
			await curClass.update(updatedClass);

			message = "Update class successfully";
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

module.exports = {
	createClass,
	getClasses,
	getClass,
	updateClass,
	deleteClass,
};
