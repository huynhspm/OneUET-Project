const nodemailer = require("nodemailer");
const config = require("../config");

const createOTP = () => {
	let min = 100000;
	let max = 999999;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sendOTP = async (email, otp) => {
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
			  <h2>Welcome to the AIA.</h2>
			  <h4>You are officially In ✔</h4>
			  <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
			  <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
		 </div>
		  `,
		};
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendOTP, createOTP };
