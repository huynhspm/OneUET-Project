import React, { useState } from "react";
import axios from 'axios';
import Title from '../../../components/Title';
import { Box, Paper, TextField, Grid, Container, Button } from '@mui/material';
import { PasswordUIValidator, PasswordValidCode, PasswordValidText } from "../../../utils/validation/password";
import { api_url } from "../../../utils/config";

const ChangePassword = (props) => {
    // Old password
    const [oldPassword, setOldPassword] = useState('');
    const [isValidOldPassword, setIsValidOldPassword] = useState(PasswordValidCode.OK);

    // New password
    const [newPassword, setNewPassword] = useState('');
    const [isValidNewPassword, setIsValidNewPassword] = useState(PasswordValidCode.OK);

    // Rewrite password
    const [rewritePassword, setRewritePassword] = useState('');
    const [isValidRewritePassword, setIsValidRewritePassword] = useState(PasswordValidCode.OK);

    // Handle Submit change password function
    const handleSubmit = async () => {
        let validation = true;

        // Validation
        setIsValidOldPassword(PasswordUIValidator(oldPassword));
        if (PasswordUIValidator(oldPassword) !== PasswordValidCode.OK) {
            validation = false;
        }

        setIsValidNewPassword(PasswordUIValidator(newPassword, oldPassword));
        if (PasswordUIValidator(newPassword, oldPassword) !== PasswordValidCode.OK) {
            validation = false;
        }

        setIsValidRewritePassword(PasswordUIValidator(rewritePassword, newPassword, false));
        if (PasswordUIValidator(rewritePassword, newPassword, false) !== PasswordValidCode.OK) {
            validation = false;
        }

        if (!validation) {
            return;
        }

        // Change password
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        }
        try {
            const res = await axios.put(api_url + "/api/user/me/password", {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, config);
            console.log(res);
            window.location.reload();
        } catch (e) {
            console.log(e.response);
            if (e.response.data.message === "Invalid oldPassword") {
                setIsValidOldPassword(PasswordValidCode.Wrong);
            }
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="div"
                sx={{ flexGrow: 1, p: 1, m: 1, minHeight: window.innerHeight }}
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
                                    error={isValidOldPassword !== PasswordValidCode.OK}
                                    helperText={PasswordValidText[isValidOldPassword]}
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
                                    error={isValidNewPassword !== PasswordValidCode.OK}
                                    helperText={PasswordValidText[isValidNewPassword]}
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
                                    error={isValidRewritePassword !== PasswordValidCode.OK}
                                    helperText={PasswordValidText[isValidRewritePassword]}
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
                                        type="submit"
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
