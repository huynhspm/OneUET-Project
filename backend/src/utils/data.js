const models = require("../database/models");
const courses = require("../database/data/course.json");
const classes = require("../database/data/class.json");
const teachers = require("../database/data/teacher.json");
const teachersClasses = require("../database/data/teacherClass.json");
const students = require("../database/data/student.json");
const studentsClasses = require("../database/data/studentClass.json");
const roles = require("../database/data/role.json");
const clubs = require("../database/data/club.json");
const users = require("../database/data/user.json");
const usersClubs = require("../database/data/userClub.json");
const documents = require("../database/data/document.json");
const comments = require("../database/data/comment.json");
const grades = require("../database/data/grade.json");

const { hashPassword } = require("../utils/password");

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

async function createClub() {
	for (let club of clubs) {
		await models.Club.create(club);
	}
}

async function createUser() {
	for (let user of users) {
		const code = user.email.slice(0, 8);
		const student = await models.Student.findOne({ where: { code } });

		user["password"] = hashPassword(user["password"]);

		if (student) {
			user["studentId"] = student.id;
			await models.User.create(user);
		}
	}
}

async function createUserClub() {
	for (let userClub of usersClubs) {
		await models.UserClub.create(userClub);
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

async function createGrade() {
	for (let grade of grades) {
		await models.Grade.create(grade);
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
	await createClub();
	await createUser();
	await createUserClub();
	await createDocument();
	await createComment();

	await createGrade();
}

module.exports = createData;
