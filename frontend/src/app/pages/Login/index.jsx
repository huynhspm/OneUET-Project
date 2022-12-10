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

const theme = createTheme();

export default function Login(props) {
	const navigate = useNavigate();
	const [isValidEmail, setIsValidEmail] = React.useState(0);
	const [isValidPassword, setIsValidPassword] = React.useState(0);

	const EmailState = [
		"",
		"Please enter your email",
		"Invalid Email"
	]

	const PasswordState = [
		"",
		"Please enter your password",
		"Wrong password"
	]

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email");
		const password = data.get("password");

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
			return;
		}

		try {
			const res = await axios.post("http://localhost:2002/login", {
				email: email,
				password: password,
			});
			console.log(res);
			props.setToken(res.data.data.token);
			navigate("/");
		} catch (e) {
			if (e.response !== undefined) {
				console.log(e.response.data);
				if (e.response.data.message === "Invalid password!") {
					setIsValidPassword(2);
				}
			}
		}
	};

	return (
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
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
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
	);
}
