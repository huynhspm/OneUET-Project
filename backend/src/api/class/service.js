const {
	Class,
	Student,
	StudentClass,
	Grade,
} = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");
const { sendEmailGrade } = require("../../utils/email");

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
		const query = req.query;
		const classes = await Class.findAll({ where: query });
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

const addStudent = async (req) => {
	try {
		let curClass, message, status;
		const { code, semester, grades } = req.body;
		curClass = await Class.findOne({
			where: { code, semester },
		});

		if (curClass) {
			for (let index in grades) {
				let grade = grades[index];
				grade["id"] = undefined;

				let student = await Student.findOne({
					where: { code: grade.studentCode },
				});

				curClass.addStudent(student, { through: grade });
			}

			message = "Add student successfully";
			status = ResponseCode.OK;
		} else {
			message = "Class not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const updateGrade = async (req) => {
	try {
		let curClasses, message, status;
		const { code, semester, grades, linkPDF } = req.body;
		curClasses = await Class.findAll({
			where: { code, semester },
		});

		if (curClasses.length) {
			for (let index in curClasses) {
				let curClass = curClasses[index];

				await curClass.update({ finish: true });
				for (let index in grades) {
					let grade = grades[index];
					grade["id"] = undefined;

					let student = await Student.findOne({
						where: { code: grade.studentCode },
					});

					let studentClass = await StudentClass.findOne({
						where: { studentId: student.id, classId: curClass.id },
					});

					if (studentClass) {
						await studentClass.update(grade);
						let email = student.code + "@vnu.edu.vn";
						let subject = "Your score in class " + curClass.code;
						// sendEmailGrade(email, grade, subject);
					}
				}
			}

			await Grade.destroy({ where: { linkPDF } });

			message = "Update grade successfully";
			status = ResponseCode.OK;
		} else {
			message = "Class not existed";
			status = ResponseCode.Not_Found;
		}

		return {
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
	addStudent,
	updateGrade,
};
