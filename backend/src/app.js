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

const createData = require("./utils/data");

const init = async () => {
	await sequelize.sync();
	console.log("Finish load database.");
	app.use(router);
	createData();
};

init();

module.exports = app;
