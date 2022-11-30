const models = require("../database/models");
const courses = require("../database/data/course.json");
const classes = require("../database/data/class.json");
const teachers = require("../database/data/teacher.json");
const students = require("../database/data/student.json");
const roles = require("../database/data/role.json");
const users = require("../database/data/user.json");
const files = require("../database/data/file.json");
const documents = require("../database/data/document.json");

async function createCourse() {
	courses.forEach(async (course) => {
		await models.Course.create(course);
	});
	// await models.Course.findOrCreate({
	// 	where: { code: course.code },
	// 	defaults: { ...course },
	// });
}

async function createClass() {
	classes.forEach(async (cur_class) => {
		await models.Class.create(cur_class);
	});
}

async function createTeacher() {
	teachers.forEach(async (teacher) => {
		const newTeacher = await models.Teacher.create(teacher);
		newTeacher.addClasses(teacher.classId);
	});
}

async function createStudent() {
	students.forEach(async (student) => {
		const newStudent = await models.Student.create(student);
		newStudent.addClasses(student.classId);
	});
}

async function createRole() {
	roles.forEach(async (role) => {
		await models.Role.create(role);
	});
}

async function createUser() {
	users.forEach(async (user) => {
		await models.User.create(user);
	});
}

async function createFile() {
	files.forEach(async (file) => {
		await models.File.create(file);
	});
}

async function createDocument() {
	documents.forEach(async (document) => {
		await models.Document.create(document);
	});
}

async function createData() {
	// await createCourse();
	// await createClass();
	// await createTeacher();
	// await createStudent();
	// await createRole();
	// await createUser();
	// await createFile();
	// await createDocument();
}

module.exports = createData;
