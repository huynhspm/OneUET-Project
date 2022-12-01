const { Teacher, Class, Course } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

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

const getTeacherById = async (req) => {
	try {
		const { id } = req.params;
		let data, message, status;
		data = await Teacher.findByPk(id);

		if (!data) {
			message = "Teacher not existed";
			status = ResponseCode.Not_Found;
		} else {
			message = "Get teacher successfully";
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

const updateTeacher = async (req) => {
	try {
		const { id } = req.params;
		const updatedTeacher = req.body;
		const data = await Teacher.update(updatedTeacher, { where: { id } });
		const message = "Update teacher successfully";
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

const deleteTeacher = async (req) => {
	try {
		const { id } = req.params;
		const data = await Teacher.destroy({ where: { id } });
		const message = "Delete teacher successfully";
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

const addTeacher = async (req) => {};

function unique(value, index, self) {
	const firstId = self.map((element) => element.id).indexOf(value.id);
	return firstId === index;
}

const getCourses = async (req) => {
	try {
		const id = req.params.id;
		const teacher = await Teacher.findByPk(id, {
			include: {
				model: Class,
				include: {
					model: Course,
				},
			},
		});

		const data = teacher.classes
			.map((curClass) => curClass.course)
			.filter(unique);

		const message = "Get course successfully";
		const status = 200;

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
