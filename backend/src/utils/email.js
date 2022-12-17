const nodemailer = require("nodemailer");
const config = require("../config");
const expiredTime = 1; // minutes

const createOTP = () => {
	let min = 100000;
	let max = 999999;
	return {
		otp: Math.floor(Math.random() * (max - min + 1)) + min,
		expiredTime: new Date(Date.now() + expiredTime * 1000 * 60),
	};
};

const sendEmailOTP = (email, otp) => {
	try {
		const transporter = nodemailer.createTransport(config.mail_setting);
		const mailOptions = {
			from: config.mail_setting.auth.user,
			to: email,
			subject: "Verify email with OTP code",
			html: `
			<div
			  class="container"
			  style="max-width: 90%; margin: auto; padding-top: 20px"
			>
			  <h1>Welcome to the AIA.</h1>
			  <h2 letter-spacing: 2px; text-align:center;">OTP: ${otp}</h2>
		 </div>
		  `,
		};
		transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

const sendEmailGrade = (email, grade, subject) => {
	try {
		const transporter = nodemailer.createTransport(config.mail_setting);
		const mailOptions = {
			from: config.mail_setting.auth.user,
			to: email,
			subject,
			html: `
			<div
			  class="container"
			  style="max-width: 90%; margin: auto; padding-top: 20px"
			>
			  <h1>Welcome to the AIA.</h1>
			  <h2 letter-spacing: 2px; text-align:center;">midterm: ${grade.midterm}</h2>
			  <h2 letter-spacing: 2px; text-align:center;">final: ${grade.final}</h2>
			  <h2 letter-spacing: 2px; text-align:center;">total: ${grade.total}</h2>
		 </div>
		  `,
		};
		transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendEmailOTP, createOTP, sendEmailGrade };
