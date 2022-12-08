const models = require("../database/models");
const courses = require("../database/data/course.json");
const classes = require("../database/data/class.json");
const teachers = require("../database/data/teacher.json");
const teachersClasses = require("../database/data/teacherClass.json");
const students = require("../database/data/student.json");
const studentsClasses = require("../database/data/studentClass.json");
const roles = require("../database/data/role.json");
const users = require("../database/data/user.json");
const files = require("../database/data/file.json");
const documents = require("../database/data/document.json");
const comments = require("../database/data/comment.json");

async function createCourse() {
	for (let course of courses) {
		await models.Course.create(course);
	}
}

async function createClass() {
	for (let cur_class of classes) {
		await models.Class.create(cur_class);
	}
}

async function createTeacher() {
	for (let teacher of teachers) {
		await models.Teacher.create(teacher);
	}
}

async function createTeacherClass() {
	for (let teacherClass of teachersClasses) {
		models.TeacherClass.create(teacherClass);
	}
}

async function createStudent() {
	for (let student of students) {
		const newStudent = await models.Student.create(student);
		await newStudent.addClasses(student.classId);
	}
}

async function createStudentClass() {
	for (let studentClass of studentsClasses) {
		models.StudentClass.create(studentClass);
	}
}

async function createRole() {
	for (let role of roles) {
		await models.Role.create(role);
	}
}

async function createUser() {
	for (let user of users) {
		await models.User.create(user);
	}
}

async function createFile() {
	for (let file of files) {
		await models.File.create(file);
	}
}

async function createDocument() {
	for (let document of documents) {
		await models.Document.create(document);
	}
}

async function createComment() {
	for (let comment of comments) {
		await models.Comment.create(comment);
	}
}

async function createData() {
	await createCourse();
	await createClass();
	await createTeacher();
	await createTeacherClass();
	await createStudent();
	await createStudentClass();
	await createRole();
	await createUser();
	await createFile();
	await createDocument();
	await createComment();
}

module.exports = createData;
