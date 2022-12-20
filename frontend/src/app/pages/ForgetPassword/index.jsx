import React, { useState } from 'react';
import axios from 'axios';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';
import { EmailUIValidator, EmailValidCode, EmailValidText } from '../../utils/validation/email';
import { PasswordUIValidator, PasswordValidCode, PasswordValidText } from '../../utils/validation/password';
import { OTPUIValidator, OTPValidCode, OTPValidText } from '../../utils/validation/otp';
import { ThemeProvider, Container, CssBaseline, Box, Avatar, createTheme, TextField, Button, Typography } from '@mui/material';
import { api_url } from '../../utils/config';

const theme = createTheme();

const ForgetPassword = () => {
    // Navigater
    const navigate = useNavigate();

    // State Code
    const StateCode = {
        Email: 0,
        ResetPassword: 1
    };
    const [state, setState] = useState(StateCode.Email);

    // Email
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(EmailValidCode.OK);

    // Password
    const [newPassword, setNewPassword] = useState('');
    const [rewritePassword, setRewritePassword] = useState('');
    const [isValidNewPassword, setIsValidNewPassword] = useState(PasswordValidCode.OK);
    const [isValidRewritePassword, setIsValidRewritePassword] = useState(PasswordValidCode.OK);

    // OTP
    const [otp, setOtp] = useState('');
    const [isValidOtp, setIsValidOtp] = useState(OTPValidCode.OK);

    // Resend OTP function
    const resendOTP = async () => {
        try {
            const res = await axios.post(api_url + "/api/login/forget", {
                email: email
            });
            console.log(res);
        } catch (e) {
            console.log(e.response);
        }
    }

    // Handle Submit function
    const handleSubmit = async (event) => {
        event.preventDefault();
        let validation = true;

        // Email state
        if (state === StateCode.Email) {
            // Validation
            setIsValidEmail(EmailUIValidator(email));
            if (EmailUIValidator(email) !== EmailValidCode.OK) {
                validation = false;
            }

            if (!validation) {
                return;
            }

            try {
                const res = await axios.post(api_url + "/api/login/forget", {
                    email: email
                });
                console.log(res);
                setState(StateCode.ResetPassword);
            } catch (e) {
                console.log(e.response);
                if (e.response.data.message === "Invalid email") {
                    setIsValidEmail(EmailValidCode.Invalid);
                }
            }
        } 
        
        // Reset Password state
        if (state === StateCode.ResetPassword) {
            // Validation
            setIsValidNewPassword(PasswordUIValidator(newPassword));
            if (PasswordUIValidator(newPassword) !== PasswordValidCode.OK) {
                validation = false;
            }

            setIsValidRewritePassword(PasswordUIValidator(rewritePassword, newPassword, false));
            if (PasswordUIValidator(rewritePassword, newPassword, false) !== PasswordValidCode.OK) {
                validation = false;
            }

            setIsValidOtp(OTPUIValidator(otp));
            if (OTPUIValidator(otp) !== OTPValidCode.OK) {
                validation = false;
            } 

            if (!validation) {
                return;
            }

            try {
                const res = await axios.post(api_url +  "/api/login/reset", {
                    email: email,
                    password: newPassword,
                    otp: otp
                });
                console.log(res);
                navigate('/login');
            } catch (e) {
                console.log(e.response);
                if (e.response.data.message === "Invalid OTP") {
                    setIsValidOtp(OTPValidCode.Invalid);
                }
                if (e.response.data.message === "OTP expired, please click resend") {
                    setIsValidOtp(OTPValidCode.Expired);
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
                    {state === StateCode.Email &&
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
                                error={isValidEmail !== EmailValidCode.OK}
                                helperText={EmailValidText[isValidEmail]}
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
                    {state === StateCode.ResetPassword &&
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Mật khẩu mới"
                                value={newPassword}
                                onChange={(event) => {
                                    setNewPassword(event.target.value);
                                }}
                                error={isValidNewPassword !== PasswordValidCode.OK}
                                helperText={PasswordValidText[isValidNewPassword]}
                                type="password"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Nhập lại mật khẩu mới"
                                value={rewritePassword}
                                onChange={(event) => {
                                    setRewritePassword(event.target.value);
                                }}
                                error={isValidRewritePassword !== PasswordValidCode.OK}
                                helperText={PasswordValidText[isValidRewritePassword]}
                                type="password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="OTP"
                                value={otp}
                                onChange={(event) => {
                                    setOtp(event.target.value);
                                }}
                                error={isValidOtp !== OTPValidCode.OK}
                                helperText={OTPValidText[isValidOtp]}
                                type="text"
                            />
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