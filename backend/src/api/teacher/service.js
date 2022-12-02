const { Teacher, Course, Class } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

// ok
const createTeacher = async (req) => {
	try {
		const newTeacher = req.body;
		const data = await Teacher.create(newTeacher);
		const message = "Create teacher successfully!";
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
const getAllTeachers = async (req) => {
	try {
		const data = await Teacher.findAll();
		const message = "Get all teachers successfully";
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
const getTeacherById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await Teacher.findByPk(id);

		if (data) {
			message = "Get teacher successfully";
			status = ResponseCode.OK;
		} else {
			message = "Teacher not existed";
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

// ok
const updateTeacher = async (req) => {
	try {
		let { data, message, status } = await getTeacherById(req);

		if (data) {
			const updatedTeacher = req.body;
			data = await data.update(updatedTeacher);
			message = "Update teacher successfully";
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
const deleteTeacher = async (req) => {
	try {
		let { data, message, status } = await getTeacherById(req);

		if (data) {
			data = await data.destroy();
			message = "Delete teacher successfully";
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

const addTeacher = async (req) => {};

function unique(value, index, self) {
	const firstId = self.map((element) => element.id).indexOf(value.id);
	return firstId === index;
}

// ok
const getCourses = async (req) => {
	try {
		let { data, message, status } = await getTeacherById(req);

		if (data) {
			data = await Teacher.findByPk(req.params.id, {
				include: {
					model: Class,
					include: {
						model: Course,
					},
				},
			});

			// data = await data.getClasses({
			// 	include: Course,
			// });

			data = data.classes.map((curClass) => curClass.course).filter(unique);

			message = "Get course successfully";
			status = 200;
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
	createTeacher,
	getAllTeachers,
	getTeacherById,
	updateTeacher,
	deleteTeacher,
	addTeacher,
	getCourses,
};
