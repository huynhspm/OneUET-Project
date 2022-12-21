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
const { trace } = require("../api");

async function createCourse() {
	let cnt = 0;
	let arr = [];
	for (let course of courses) {
		cnt = cnt + 1;
		arr.push(course);
		if (cnt === 200) {
			await models.Course.bulkCreate(arr);
			cnt = 0;
			arr = [];
		}
	}
	if (arr) {
		await models.Course.bulkCreate(arr);
	}
}

async function createClass() {
	let cnt = 0;
	let arr = [];
	for (let cur_class of classes) {
		cnt = cnt + 1;
		arr.push(cur_class);
		if (cnt === 200) {
			await models.Class.bulkCreate(arr);
			cnt = 0;
			arr = [];
		}
	}

	if (arr) {
		await models.Class.bulkCreate(arr);
	}
}

async function createTeacher() {
	let cnt = 0;
	let arr = [];
	for (let teacher of teachers) {
		cnt = cnt + 1;
		arr.push(teacher);
		if (cnt === 200) {
			await models.Teacher.bulkCreate(arr);
			cnt = 0;
			arr = [];
		}
	}
	if (arr) {
		await models.Teacher.bulkCreate(arr);
	}
}

async function createTeacherClass() {
	for (let teacherClass of teachersClasses) {
		if (teacherClass.teacherId) {
			models.TeacherClass.findOrCreate({
				where: {
					teacherId: teacherClass.teacherId,
					classId: teacherClass.classId,
				},
			});
		}
	}
}

async function createStudent() {
	let cnt = 0;
	let arr = [];
	for (let student of students) {
		cnt = cnt + 1;
		arr.push(student);
		if (cnt === 200) {
			await models.Student.bulkCreate(arr);
			cnt = 0;
			arr = [];
		}
	}
	if (arr) {
		await models.Student.bulkCreate(arr);
	}
}

async function createStudentClass() {
	let cnt = 0;
	let arr = [];
	for (let studentClass of studentsClasses) {
		cnt = cnt + 1;
		arr.push(studentClass);
		if (cnt === 200) {
			await models.StudentClass.bulkCreate(arr);
			cnt = 0;
			arr = [];
		}
	}

	if (arr) {
		await models.StudentClass.bulkCreate(arr);
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
			user["avatar"] =
				"https://ui-avatars.com/api/?name=" +
				student.name.replaceAll(" ", "+") +
				"&background=eeeeee";
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
