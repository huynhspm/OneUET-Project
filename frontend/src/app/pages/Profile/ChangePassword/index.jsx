import React, { useState } from "react";
import axios from 'axios';
import Title from '../../../components/Title';
import { Box, Paper, TextField, Grid, Container, Button } from '@mui/material';

const ChangePassword = (props) => {
    // Old password
    const [oldPassword, setOldPassword] = useState('');
    const [isValidOldPassword, setIsValidOldPassword] = useState(0);

    // New password
    const [newPassword, setNewPassword] = useState('');
    const [isValidNewPassword, setIsValidNewPassword] = useState(0);

    // Rewrite password
    const [rewritePassword, setRewritePassword] = useState('');
    const [isValidRewritePassword, setIsValidRewritePassword] = useState(0);

    // Password State
    const PasswordState = [
        "",
        "Please enter password",
        "Wrong password",
        "New password can not be same as old password",
        "Confirm password does not match the new password"
    ];

    // Handle Submit change password function
    const handleSubmit = async () => {
        let validation = true;

        // Validation
        if (oldPassword == '') {
            setIsValidOldPassword(1);
            validation = false;
        } else {
            setIsValidOldPassword(0);
        }

        if (newPassword == '') {
            setIsValidNewPassword(1);
            validation = false;
        } else {
            if (oldPassword == newPassword) {
                setIsValidNewPassword(3);
                validation = false;
            } else {
                setIsValidNewPassword(0);
            }
        }

        if (rewritePassword == '') {
            setIsValidRewritePassword(1);
            validation = false;
        } else {
            if (newPassword != rewritePassword) {
                setIsValidRewritePassword(4);
                validation = false;
            } else {
                setIsValidRewritePassword(0);
            }
        }

        if (!validation) {
            return;
        }

        // Change password
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        }
        try {
            const res = await axios.put("http://localhost:2002/api/user/me/password", {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, config);
            console.log(res);
            window.location.reload();
        } catch (e) {
            console.log(e.response);
            if (e.response.data.message == "Invalid oldPassword") {
                setIsValidOldPassword(2);
            }
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="div"
                sx={{ flexGrow: 1, p: 1, m: 1 }}
            >
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ p: 1 }}>
                        <Title>
                            Đổi mật khẩu
                        </Title>
                    </Box>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Mật khẩu cũ"
                                    value={oldPassword}
                                    onChange={(event) => {
                                        setOldPassword(event.target.value);
                                    }}
                                    error={isValidOldPassword != 0}
                                    helperText={PasswordState[isValidOldPassword]}
                                    type="password"
                                />
                            </Grid>
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: "right"
                                    }}
                                >
                                    <Button 
                                    component="div" 
                                    variant="outlined" 
                                    onClick={handleSubmit}
                                    >Đổi mật khẩu</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ChangePassword;