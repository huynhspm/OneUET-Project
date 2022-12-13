import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import validator from 'validator'
import { useNavigate } from 'react-router-dom';
import OtpModal from "../../components/OtpModal";

const theme = createTheme();

export default function Login(props) {
	const [login, setLogin] = React.useState(false);
	const [active, setActive] = React.useState(false);

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [otp, setOtp] = React.useState('');

	const navigate = useNavigate();
	const [isValidEmail, setIsValidEmail] = React.useState(0);
	const [isValidPassword, setIsValidPassword] = React.useState(0);

	// Modal
	const [open, setOpen] = React.useState(false);
	const handleClose = () => setOpen(false);

	const EmailState = [
		"",
		"Please enter your email",
		"Invalid Email"
	];

	const PasswordState = [
		"",
		"Please enter your password",
		"Wrong password"
	];

	const resendOTP = async () => {
		try {
			const res = await axios.post("http://localhost:2002/login/forget", {
				email: email
			});
			console.log(res);
		} catch (e) {
			console.log(e.response);
		}
	}

	const handleOTP = async (setError) => {
		console.log(otp);
		try {
			const res = await axios.post("http://localhost:2002/login/verify", {
				email: email,
				otp: otp,
			});
			console.log(res.data);
			props.setToken(res.data.data.token);
			setError(0);
			setActive(true);
		} catch (e) {
			console.log(e.response.data.message);
			if (e.response.data.message === "Invalid OTP") {
				if (otp == '') {
					setError(1);
				} else {
					setError(2);
				}
			}
		}
	}

	const handleSubmit = async (event) => {
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
			const res = await axios.post("http://localhost:2002/login", {
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

	React.useEffect(() => {
		if (login) {
			if (active) {
				navigate('/');
			} else {
				setOpen(!active);
			}
		}
	}, [login, active]);

	return (
		<React.Fragment>
			<OtpModal open={open} handleClose={handleClose} active={active} otp={otp} setOtp={setOtp} handleOTP={handleOTP} resendOTP={resendOTP} />
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
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSubmit}
							>
								LOG IN
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
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
