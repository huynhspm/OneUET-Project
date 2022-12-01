const { Student } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

const createStudent = async (req) => {
	try {
		const newStudent = req.body;
		data = await Student.create(newStudent);
		const message = "Create Student successfully!";
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

const getAllStudents = async (req) => {
	try {
		const data = await Student.findAll();
		const message = "Get all students successfully";
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

const getStudentById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await Student.findByPk(id);

		if (data) {
			message = "Get student successfully";
			status = ResponseCode.OK;
		} else {
			message = "Student not existed";
			status = ResponseCode.Not_Found;
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

const updateStudent = async (req) => {
	try {
		const { id } = req.params;
		const updatedStudent = req.body;
		const data = await Student.update(updatedStudent, { where: { id } });
		const message = "Update student successfully";
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

const deleteStudent = async (req) => {
	try {
		const { id } = req.params;
		const data = await Student.destroy({ where: { id } });
		const message = "Delete student successfully";
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

const addStudent = async (req) => {};

const getAllClasses = async (req) => {
	try {
		let { data, message, status } = await getStudentById(req);

		if (data) {
			data = await data.getClasses();
			message = "Get all classes of student successfully";
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
	createStudent,
	getAllStudents,
	getStudentById,
	updateStudent,
	deleteStudent,
	addStudent,
	getAllClasses,
};
