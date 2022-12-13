const nodemailer = require("nodemailer");
const config = require("../config");
const expiredTime = 0;

const createOTP = () => {
	let min = 100000;
	let max = 999999;
	return {
		otp: Math.floor(Math.random() * (max - min + 1)) + min,
		expiredTime: expiredTime,
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
			  <h2>Welcome to the AIA.</h2>
			  <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
		 </div>
		  `,
		};
		transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendEmailOTP, createOTP };
