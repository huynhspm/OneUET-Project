const { Teacher, Course, Class } = require("../../database/models");
const ResponseCode = require("../../utils/constant/ResponseCode");

function unique(value, index, self) {
	const firstId = self.map((element) => element.id).indexOf(value.id);
	return firstId === index;
}

const verifyTeacher = async (req) => {
	try {
		const { id } = req.params;
		let teacher, message, status;
		teacher = await Teacher.findByPk(id);

		if (teacher) {
			message = "Get teacher successfully";
			status = ResponseCode.OK;
		} else {
			message = "Teacher not existed";
			status = ResponseCode.OK;
		}

		return {
			teacher,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const createTeacher = async (req) => {
	try {
		const newTeacher = req.body;
		const teacher = await Teacher.create(newTeacher);

		const message = "Create teacher successfully!";
		const status = ResponseCode.Created;
		const data = { teacher };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getTeachers = async (req) => {
	try {
		const teachers = await Teacher.findAll();

		const message = "Get teachers successfully";
		const status = ResponseCode.OK;
		const data = { teachers };

		return {
			data,
			message,
			status,
		};
	} catch (e) {
		throw e;
	}
};

const getTeacher = async (req) => {
	try {
		let { teacher, message, status } = await verifyTeacher(req);
		let courses, classes;

		if (teacher) {
			classes = await teacher.getClasses();
			courses = await Promise.all(
				classes
					.map(async (curClass) => await curClass.getCourse())
					.filter(unique)
			);

			message = "Get Teacher successfully";
			status = ResponseCode.OK;
		}

		const data = {
			teacher,
			courses,
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

const updateTeacher = async (req) => {
	try {
		let { teacher, message, status } = await verifyTeacher(req);

		if (teacher) {
			const updatedTeacher = req.body;
			teacher = await teacher.update(updatedTeacher);
			message = "Update teacher successfully";
			status = ResponseCode.OK;
		}

		const data = { teacher };

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
		let { teacher, message, status } = await verifyTeacher(req);

		if (teacher) {
			teacher = await teacher.destroy();
			message = "Delete teacher successfully";
			status = ResponseCode.OK;
		}

		const data = { teacher };

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
	getTeachers,
	getTeacher,
	updateTeacher,
	deleteTeacher,
};
