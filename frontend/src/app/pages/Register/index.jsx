import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpModal from "../../components/OtpModal";
import { OTPValidCode } from "../../utils/validation/otp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { EmailUIValidator, EmailValidCode, EmailValidText } from "../../utils/validation/email";
import { PasswordUIValidator, PasswordValidCode, PasswordValidText } from "../../utils/validation/password";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Container, MenuItem, Select, InputLabel, FormControl, FormHelperText, FormGroup } from "@mui/material";
import { api_url } from "../../utils/config";

const theme = createTheme();

export default function Register() {
	// Register state
	const [registered, setRegistered] = useState(false);
	const [active, setActive] = useState(false);

	// Email
	const [email, setEmail] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(EmailValidCode.OK);

	// Password
	const [password, setPassword] = useState("");
	const [isValidPassword, setIsValidPassword] = useState(PasswordValidCode.OK);
	const [rewritePassword, setRewritePassword] = useState("");
	const [isValidRewritePassword, setIsValidRewritePassword] = useState(PasswordValidCode.OK);

	// Birthday
	const [birthday, setBirthday] = useState("");
	const [isValidBirthday, setIsValidBirthday] = useState(true);

	// Gender
	const [gender, setGender] = useState("");

	// Terms and Conditions checker
	const [checker, setChecker] = useState(false);
	const [isValidChecker, setIsValidChecker] = useState(true);

	// Otp in Modal (optional)
	const [otp, setOtp] = useState("");

	// Modal
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// Token
	const navigate = useNavigate();
	const [token, setToken] = useState("");

	// Resend OTP function
	const resendOTP = async () => {
		try {
			const res = await axios.post(api_url + "/api/login/forget", {
				email: email,
			});
			console.log(res);
		} catch (e) {
			console.log(e.response);
		}
	};

	// Handle OTP function
	const handleOTP = async (setIsValidOtp) => {
		console.log(otp);
		try {
			const res = await axios.post(api_url + "/api/login/verify", {
				email: email,
				otp: otp,
			});
			console.log(res.data);
			if (res.data.message === "OTP expired, please click resend") {
				setIsValidOtp(OTPValidCode.Expired);
				return;
			}
			setToken(res.data.data.token);
			setIsValidOtp(0);
			setActive(true);
		} catch (e) {
			console.log(e.response.data.message);
			if (e.response.data.message === "Invalid OTP") {
				if (otp === "") {
					setIsValidOtp(OTPValidCode.Empty);
				} else {
					setIsValidOtp(OTPValidCode.Invalid);
				}
			}
		}
	};

	// Handle Submit function
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validation
		let validation = true;

		setIsValidEmail(EmailUIValidator(email));
		if (EmailUIValidator(email) !== EmailValidCode.OK) {
			validation = false;
		}

		setIsValidPassword(PasswordUIValidator(password));
		if (PasswordUIValidator(password) !== PasswordValidCode.OK) {
			validation = false;
		}

		setIsValidRewritePassword(PasswordUIValidator(rewritePassword, password, false));
		if (PasswordUIValidator(rewritePassword, password, false) !== PasswordValidCode.OK) {
			validation = false;
		}

		if (birthday === "") {
			setIsValidBirthday(false);
			validation = false;
		} else {
			setIsValidBirthday(true);
		}

		if (!checker) {
			setIsValidChecker(false);
			validation = false;
		} else {
			setIsValidChecker(true);
		}

		if (!validation) {
			return;
		}

		// Call register api
		try {
			const res = await axios.post(api_url + "/api/register", {
				email: email,
				password: password,
				birthday: new Date(birthday),
				gender: gender
			});
			console.log(res.data);
			if (res.data.message === "Register successfully but not active") {
				setRegistered(true);
				setActive(false);
			}
		} catch (e) {
			console.log(e.response.data);
			if (e.response.data.message === "Email existed") {
				setIsValidEmail(EmailValidCode.Existed);
			}
		}
	};

	// Checking Register state
	useEffect(() => {
		if (registered) {
			if (active) {
				sessionStorage.setItem("token", token); // Save Token to sessionStorage
				console.log(token);
				navigate("/");
			} else {
				setOpen(!active);
			}
		}
	}, [registered, active, navigate, token]);

	return (
		<React.Fragment>
			<OtpModal
				open={open}
				handleClose={handleClose}
				otp={otp}
				setOtp={setOtp}
				handleOTP={handleOTP}
				resendOTP={resendOTP}
			/>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}
						>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										label="Email Address"
										id="email"
										name="email"
										value={email}
										onChange={(event) => {
											setEmail(event.target.value);
										}}
										error={isValidEmail !== EmailValidCode.OK}
										helperText={EmailValidText[isValidEmail]}
										autoComplete="email"
										type="email"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										fullWidth
										label="Password"
										id="password"
										name="password"
										value={password}
										onChange={(event) => {
											setPassword(event.target.value);
										}}
										error={isValidPassword !== PasswordValidCode.OK}
										helperText={PasswordValidText[isValidPassword]}
										autoComplete="password"
										type="password"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										fullWidth
										label="Confirm Password"
										id="confirm"
										name="confirm"
										value={rewritePassword}
										onChange={(event) => {
											setRewritePassword(event.target.value);
										}}
										error={isValidRewritePassword !== PasswordValidCode.OK}
										helperText={PasswordValidText[isValidRewritePassword]}
										autoComplete="password"
										type="password"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										fullWidth
										label="Birthday"
										id="birthday"
										name="birthday"
										value={birthday}
										onChange={(event) => {
											setBirthday(event.target.value);
										}}
										error={!isValidBirthday}
										helperText={isValidBirthday ? "" : "Please enter your birthday"}
										autoComplete="birthday"
										type="date"
										InputLabelProps={{ shrink: true }}
									/>
								</Grid>

								<Grid item xs={6}>
									<FormControl fullWidth>
										<InputLabel id="gender-label">Gender</InputLabel>
										<Select
											labelId="gender-label"
											id="gender-select"
											value={gender}
											onChange={(event) => {
												setGender(event.target.value);
											}}
											label="Gender"
										>
											<MenuItem value={0}>Male</MenuItem>
											<MenuItem value={1}>Female</MenuItem>
											<MenuItem value={2}>Other</MenuItem>
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<FormControl error={!isValidChecker}>
										<FormGroup>
											<FormControlLabel
												control={
													<Checkbox
														value="allowExtraEmails"
														color="primary"
														checked={checker}
														onChange={(event) => {
															setChecker(event.target.checked);
														}}
													/>
												}
												label="I've read and I accept the terms and conditions."
											/>
										</FormGroup>
										{!isValidChecker && <FormHelperText>You have to read and accept the terms and conditions.</FormHelperText>}
									</FormControl>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign Up
							</Button>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link href="/login" variant="body2">
										Already have an account? Login
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
}
