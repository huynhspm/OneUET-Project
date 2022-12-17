import * as React from "react";
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

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const theme = createTheme();

export default function Register() {
	const [fakeUser, setUser] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const res = await axios.get("http://localhost:2002/user/1");
			setUser(res.data.data);
		}
		fetchData();
	}, []);

	const test = () => {
		console.log(new Date(fakeUser.birthday).toLocaleDateString());
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const name = data.get("firstName") + " " + data.get("lastName");
		const email = data.get("email");
		const password = data.get("password");
		const birthday = data.get("birthday");
		const gender = data.get("gender");
		const cur_class = data.get("class");

		try {
			const res = await axios.post("http://localhost:2002/register", {
				name,
				email,
				password,
				birthday: new Date(birthday),
				gender,
				class: cur_class,
			});
			console.log(res.data);
		} catch (e) {
			console.log(e.response.data);
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
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									label="First Name"
									id="firstName"
									name="firstName"
									autoComplete="given-name"
									type="text"
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									label="Last Name"
									id="lastName"
									name="lastName"
									autoComplete="family-name"
									type="text"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									label="Email Address"
									id="email"
									name="email"
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
									autoComplete="password"
									type="password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									label="Birthday"
									id="birthday"
									name="birthday"
									autoComplete="birthday"
									type="date"
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>

							{/* <Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel id="gender-label">Gender</InputLabel>
									<Select labelId="gender-label" id="gender-select">
										<MenuItem value={10}>Male</MenuItem>
										<MenuItem value={20}>Female</MenuItem>
										<MenuItem value={30}>Other</MenuItem>
									</Select>
								</FormControl>
							</Grid> */}

							<Grid item xs={6}>
								<TextField
									fullWidth
									label="Gender"
									id="gender"
									name="gender"
									autoComplete="gender"
									type="text"
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									fullWidth
									label="Class"
									id="class"
									name="class"
									autoComplete="class"
									type="text"
								/>
							</Grid>

							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="you accept all principles"
								/>
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
	);
}
