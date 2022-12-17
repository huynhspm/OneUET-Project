import React, { useEffect } from 'react';
import LockResetIcon from '@mui/icons-material/LockReset';
import { ThemeProvider, Container, CssBaseline, Box, Avatar, createTheme, TextField, Button, Grid, Typography } from '@mui/material';
import validator from "validator";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const ForgetPassword = (props) => {
    const navigate = useNavigate();

    const [state, setState] = React.useState(0);
    const [email, setEmail] = React.useState('');
    const [isValidEmail, setIsValidEmail] = React.useState(0);
    const EmailState = ["", "Please enter your email", "Invalid Email"];

    const [newPassword, setNewPassword] = React.useState('');
    const [rewritePassword, setRewritePassword] = React.useState('');
    const [isValidNewPassword, setIsValidNewPassword] = React.useState(0);
    const [isValidRewritePassword, setIsValidRewritePassword] = React.useState(0);
    const PasswordState = ["", "Please enter password", "Confirm password does not match the new password"];

    const [otp, setOtp] = React.useState('');
    const [isValidOtp, setIsValidOtp] = React.useState(0);
    const OTPState = ["", "Please enter your OTP", "Invalid OTP", "OTP expired, please click resend"];

    const resendOTP = async () => {
        try {
            const res = await axios.post("http://localhost:2002/api/login/forget", {
                email: email
            });
            console.log(res);
        } catch (e) {
            console.log(e.response);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let validation = true;

        if (state == 0) {
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

            if (!validation) {
                return;
            }

            try {
                const res = await axios.post("http://localhost:2002/api/login/forget", {
                    email: email
                });
                console.log(res);
                setState(1);
            } catch (e) {
                console.log(e.response);
                if (e.response.data.message == "Invalid email") {
                    setIsValidEmail(2);
                }
            }
        } else {
            if (newPassword == '') {
                setIsValidNewPassword(1);
                validation = false;
            } else {
                setIsValidNewPassword(0);
            }

            if (rewritePassword == '') {
                setIsValidRewritePassword(1);
                validation = false;
            } else {
                if (newPassword != rewritePassword) {
                    setIsValidRewritePassword(2);
                    validation = false;
                } else {
                    setIsValidRewritePassword(0);
                }
            }

            if (otp == '') {
                setIsValidOtp(1);
                validation = false;
            } else {
                setIsValidOtp(0);
            }

            if (!validation) {
                return;
            }

            try {
                const res = await axios.post("http://localhost:2002/api/login/reset", {
                    email: email,
                    password: newPassword,
                    otp: otp
                });
                console.log(res);
                navigate('/login');
            } catch (e) {
                console.log(e.response);
                if (e.response.data.message == "Invalid OTP") {
                    setIsValidOtp(2);
                }
                if (e.response.data.message == "OTP expired, please click resend") {
                    setIsValidOtp(3);
                }
            }
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockResetIcon />
                    </Avatar>
                    {state == 0 &&
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
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
                                error={isValidEmail !== 0}
                                helperText={EmailState[isValidEmail]}
                                type="text"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Next
                            </Button>
                        </Box>
                    }
                    {state == 1 &&
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Mật khẩu mới"
                                        value={newPassword}
                                        onChange={(event) => {
                                            setNewPassword(event.target.value);
                                        }}
                                        error={isValidNewPassword != 0}
                                        helperText={PasswordState[isValidNewPassword]}
                                        type="password"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Nhập lại mật khẩu mới"
                                        value={rewritePassword}
                                        onChange={(event) => {
                                            setRewritePassword(event.target.value);
                                        }}
                                        error={isValidRewritePassword != 0}
                                        helperText={PasswordState[isValidRewritePassword]}
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="OTP"
                                        value={otp}
                                        onChange={(event) => {
                                            setOtp(event.target.value);
                                        }}
                                        error={isValidOtp != 0}
                                        helperText={OTPState[isValidOtp]}
                                        type="text"
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ p: 1 }}>
                                <Typography variant='p'>
                                    OTP not received?
                                </Typography>
                                <Button
                                    onClick={resendOTP}
                                >
                                    RESEND
                                </Button>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset Password
                            </Button>
                        </Box>
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ForgetPassword;