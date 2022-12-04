const { Student } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
const createStudent = async (req) => {
	try {
		const newStudent = req.body;
		const student = await Student.create(newStudent);

		const message = "Create Student successfully!";
		const status = ResponseCode.Created;
		const data = { student };

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
		const students = await Student.findAll();

		const message = "Get all students successfully";
		const status = ResponseCode.OK;
		const data = { students };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const verifyStudent = async (req) => {
	try {
		const { id } = req.params;
		let student, message, status;
		student = await Student.findByPk(id);

		if (student) {
			message = "Get student successfully";
			status = ResponseCode.OK;
		} else {
			message = "Student not existed";
			status = ResponseCode.Not_Found;
		}

		return {
			student,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

// ok
const updateStudent = async (req) => {
	try {
		let { student, message, status } = await verifyStudent(req);

		if (student) {
			const updatedStudent = req.body;
			student = await student.update(updatedStudent);
			message = "Update student successfully";
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
const deleteStudent = async (req) => {
	try {
		let { data, message, status } = await verifyStudent(req);

		if (data) {
			data = await data.destroy();
			message = "Delete student successfully";
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
const getStudent = async (req) => {
	try {
		let { student, message, status } = await verifyStudent(req);
		let classes;

		if (student) {
			classes = await student.getClasses();
			message = "Get student successfully";
			status = ResponseCode.OK;
		}

		const data = {
			student,
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

const addStudent = async (req) => {};

module.exports = {
	createStudent,
	getAllStudents,
	updateStudent,
	deleteStudent,
	getStudent,
	addStudent,
};
