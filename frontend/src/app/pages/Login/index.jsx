import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpModal from "../../components/OtpModal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { OTPValidCode } from "../../utils/validation/otp";
import { EmailUIValidator, EmailValidCode, EmailValidText } from "../../utils/validation/email";
import { PasswordUIValidator, PasswordValidCode, PasswordValidText } from "../../utils/validation/password";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Container } from '@mui/material';

const theme = createTheme();

export default function Login(props) {
	// Login state
	const [login, setLogin] = useState(false);
	const [active, setActive] = useState(false);

	// Email
	const [email, setEmail] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(EmailValidCode.OK);

	// Password
	const [password, setPassword] = useState("");
	const [isValidPassword, setIsValidPassword] = useState(PasswordValidCode.OK);

	// Otp in Modal (optional)
	const [otp, setOtp] = useState("");

	// Modal
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// Token
	const navigate = useNavigate();
	const [token, setToken] = useState("");

	// Get Token from sessionStorage
	useEffect(() => {
		if (token === "") {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				console.log(lastToken);
				setToken(lastToken); // Successfully get Token!
				navigate(-1); // Go back to the previous page
			}
		}
	}, [token, navigate]);

	// Resend OTP function
	const resendOTP = async () => {
		try {
			const res = await axios.post("http://localhost:2002/api/login/forget", {
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
			const res = await axios.post("http://localhost:2002/api/login/verify", {
				email: email,
				otp: otp,
			});
			console.log(res.data);
			if (res.data.message === "OTP expired, please click resend") {
				setIsValidOtp(OTPValidCode.Expired);
				return;
			}
			setToken(res.data.data.token);
			props.setToken(token);
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

	// Handle Submit login function
	const handleSubmit = async (event) => {
		event.preventDefault();
		let validation = true;

		// Validation
		setIsValidEmail(EmailUIValidator(email));
		if (EmailUIValidator(email) !== EmailValidCode.OK) {
			validation = false;
		}

		setIsValidPassword(PasswordUIValidator(password));
		if (PasswordUIValidator(password) !== PasswordValidCode.OK) {
			validation = false;
		}

		if (!validation) {
			return;
		}

		// Handle Login
		try {
			const res = await axios.post("http://localhost:2002/api/login", {
				email: email,
				password: password,
			});
			console.log(res);
			setToken(res.data.data.token);
			props.setToken(token);
			setLogin(true);
			setActive(true);
		} catch (e) {
			if (e.response !== undefined) {
				console.log(e.response.data.message);
				if (e.response.data.message === "Invalid email") {
					setIsValidEmail(EmailValidCode.Invalid);
				}
				if (e.response.data.message === "Invalid password") {
					setIsValidPassword(PasswordValidCode.Wrong);
				}
				if (e.response.data.message === "Login successfully but not active") {
					setLogin(true);
					setActive(false);
				}
			}
		}
	};

	// Checking Login state
	useEffect(() => {
		if (login) {
			if (active) {
				sessionStorage.setItem("token", token); // Save Token to sessionStorage
				console.log(token);
				navigate("/");
			} else {
				setOpen(!active);
			}
		}
	}, [login, active, navigate, token]);

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
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Email Address"
								name="email"
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								error={isValidEmail !== EmailValidCode.OK}
								helperText={EmailValidText[isValidEmail]}
								// autoComplete="email"
								type="text"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Password"
								name="password"
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								error={isValidPassword !== PasswordValidCode.OK}
								helperText={PasswordValidText[isValidPassword]}
								// autoComplete="current-password"
								type="password"
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								LOG IN
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="/login/forget" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="/register" variant="body2">
										{"Don't have an account? Register"}
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
