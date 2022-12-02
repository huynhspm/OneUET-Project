const service = require("./service");
const ResponseCode = require("../../utils/constant/ResponseCode");

// POST: /student
const createStudent = async (req, res) => {
	try {
		const result = await service.createStudent(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't create student",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /student
const getAllStudents = async (req, res) => {
	try {
		const result = await service.getAllStudents(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get all students",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /student/:id
const getStudentById = async (req, res) => {
	try {
		const result = await service.getStudentById(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get student",
			status: ResponseCode.Bad_Request,
		});
	}
};

// PUT: /student/:id
const updateStudent = async (req, res) => {
	try {
		const result = await service.updateStudent(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't update student",
			status: ResponseCode.Bad_Request,
		});
	}
};

// DELETE: /student/:id
const deleteStudent = async (req, res) => {
	try {
		const result = await service.deleteStudent(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't delete student",
			status: ResponseCode.Bad_Request,
		});
	}
};

// GET: /student/:id/class
const getAllClasses = async (req, res) => {
	try {
		const result = await service.getAllClasses(req);
		const { data, message, status } = result;

		res.status(status).json({
			data: data,
			message: message,
			status: status,
		});
	} catch (e) {
		res.status(ResponseCode.Bad_Request).json({
			data: e.message,
			message: "Couldn't get all classes of class",
			status: ResponseCode.Bad_Request,
		});
	}
};

module.exports = {
	createStudent,
	getAllStudents,
	getStudentById,
	updateStudent,
	deleteStudent,
	getAllClasses,
};