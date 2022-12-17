import React, { useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import OtpModal from "../../components/OtpModal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Container,
} from "@mui/material";

const theme = createTheme();

export default function Login(props) {
	// Login state
	const [login, setLogin] = useState(false);
	const [active, setActive] = useState(false);

	// Email
	const [email, setEmail] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(0);
	const EmailState = ["", "Please enter your email", "Invalid Email"];

	// Password
	const [password, setPassword] = useState("");
	const [isValidPassword, setIsValidPassword] = useState(0);
	const PasswordState = ["", "Please enter your password", "Wrong password"];

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
	const handleOTP = async (setError) => {
		console.log(otp);
		try {
			const res = await axios.post("http://localhost:2002/api/login/verify", {
				email: email,
				otp: otp,
			});
			console.log(res.data);
			if (res.data.message === "OTP expired, please click resend") {
				setError(3);
				return;
			}
			props.setToken(res.data.data.token);
			setError(0);
			setActive(true);
		} catch (e) {
			console.log(e.response.data.message);
			if (e.response.data.message === "Invalid OTP") {
				if (otp === "") {
					setError(1);
				} else {
					setError(2);
				}
			}
		}
	};

	// Handle Submit login function
	const handleSubmit = async (event) => {
		event.preventDefault();
		let validation = true;

		// Validation
		if (email === "") {
			setIsValidEmail(1);
			validation = false;
		} else {
			if (!validator.isEmail(email)) {
				setIsValidEmail(2);
				validation = false;
			} else {
				setIsValidEmail(0);
			}
		}
		if (password === "") {
			setIsValidPassword(1);
			validation = false;
		} else {
			setIsValidPassword(0);
		}

		if (!validation) {
			return false;
		}

		// Handle Login
		try {
			const res = await axios.post("http://localhost:2002/api/login", {
				email: email,
				password: password,
			});
			console.log(res);
			props.setToken(res.data.data.token);
			setLogin(true);
			setActive(true);
		} catch (e) {
			if (e.response !== undefined) {
				console.log(e.response.data.message);
				if (e.response.data.message === "Invalid email") {
					setIsValidEmail(2);
				}
				if (e.response.data.message === "Invalid password") {
					setIsValidPassword(2);
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
				sessionStorage.setItem("token", props.token); // Save Token to sessionStorage
				navigate("/");
			} else {
				setOpen(!active);
			}
		}
	}, [login, active, navigate, props.token]);

	return (
		<React.Fragment>
			<OtpModal
				open={open}
				handleClose={handleClose}
				active={active}
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
								// id="email"
								label="Email Address"
								name="email"
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								error={isValidEmail !== 0}
								helperText={EmailState[isValidEmail]}
								// autoComplete="email"
								type="text"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Password"
								// id="password"
								name="password"
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								error={isValidPassword !== 0}
								helperText={PasswordState[isValidPassword]}
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
