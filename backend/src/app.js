const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./database");
const models = require("./database/models");
const router = require("./api");

const app = express();
var cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

async function testSendEmail() {
	const sendOTP = require("./utils/email");
	const email = "20020054@vnu.edu.vn";
	const subject = "Chicken";
	const otp = 123456;
	await sendOTP(email, subject, otp);
}

testSendEmail();

async function createData() {
	// // create course
	// await models.Course.bulkCreate([
	// 	{ name: "Web", code: "int3306" },
	// 	{ name: "Lịch sử đảng", code: "his1007" },
	// 	{ name: "AI", code: "int1404" },
	// 	{ name: "Đại số", code: "mat1000" },
	// 	{ name: "Xác suất thống kê", code: "mat1101" },
	// ]);
	// // create class
	// await models.Class.bulkCreate([
	// 	{ code: "int3306_01", courseId: "1" },
	// 	{ code: "int3306_02", courseId: "1" },
	// 	{ code: "int1404_03", courseId: "1" },
	// 	{ code: "mat1101_01", courseId: "5" },
	// 	{ code: "mat1102_02", courseId: "5" },
	// ]);
	// // create teacher
	// await models.Teacher.bulkCreate([
	// 	{ email: "a", name: "a" },
	// 	{ email: "b", name: "b" },
	// 	{ email: "c", name: "c" },
	// 	{ email: "d", name: "d" },
	// 	{ email: "e", name: "e" },
	// ]);
	// // create teacher_class
	// await models.TeacherClass.bulkCreate([
	// 	{ teacherId: "1", classId: "2" },
	// 	{ teacherId: "1", classId: "3" },
	// 	{ teacherId: "2", classId: "3" },
	// 	{ teacherId: "2", classId: "4" },
	// 	{ teacherId: "3", classId: "4" },
	// 	{ teacherId: "3", classId: "5" },
	// 	{ teacherId: "4", classId: "5" },
	// 	{ teacherId: "4", classId: "4" },
	// 	{ teacherId: "5", classId: "4" },
	// 	{ teacherId: "5", classId: "3" },
	// ]);
	// create role
	await models.Role.findOrCreate({ where: { name: "admin" } });
	await models.Role.findOrCreate({ where: { name: "user" } });
	// // create user
	// await models.User.bulkCreate([
	// 	{ email: "orange", password: "1234" },
	// 	{ email: "apple", password: "12345" },
	// 	{ email: "mango", password: "123456" },
	// 	{ email: "grape", password: "1234567" },
	// 	{ email: "lemon", password: "12345678" },
	// ]);
	// //create document
	// await models.Document.bulkCreate([
	// 	{ year: 2022, category: "Giáo trình" },
	// 	{ year: 2021, category: "Đề thi" },
	// 	{ year: 2020, category: "Đề thi" },
	// 	{ year: 2022, category: "Đề thi" },
	// 	{ year: 2021, category: "Giáo trình" },
	// ]);
}

const init = async () => {
	await sequelize.sync();
	console.log("Finish load database.");
	app.use(router);

	createData();
};

init();

module.exports = app;
