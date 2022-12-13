import React from 'react';
import { Box, Paper, TextField, Grid, Container, Button } from '@mui/material';
import Title from '../../../components/Title';
import axios from 'axios';

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [rewritePassword, setRewritePassword] = React.useState('');

    const [oldState, setOldState] = React.useState(0);
    const [newState, setNewState] = React.useState(0);
    const [rewriteState, setRewriteState] = React.useState(0);
    const PasswordState = [
        "",
        "Please enter password",
        "Wrong password",
        "New password can not be same as old password",
        "Confirm password does not match the new password"
    ];

    const handleSubmit = async () => {
        let validation = true;
        if (oldPassword == '') {
            setOldState(1);
            validation = false;
        } else {
            setOldState(0);
        }

        if (newPassword == '') {
            setNewState(1);
            validation = false;
        } else {
            if (oldPassword == newPassword) {
                setNewState(3);
                validation = false;
            } else {
                setNewState(0);
            }
        }

        if (rewritePassword == '') {
            setRewriteState(1);
            validation = false;
        } else {
            if (newPassword != rewritePassword) {
                setRewriteState(4);
                validation = false;
            } else {
                setRewriteState(0);
            }
        }

        if (!validation) {
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        }
        try {
            const res = await axios.put("http://localhost:2002/user/me/password", {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, config);
            console.log(res);
            window.location.reload();
        } catch (e) {
            console.log(e.response);
            if (e.response.data.message == "Invalid oldPassword") {
                setOldState(2);
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
                                    error={oldState != 0}
                                    helperText={PasswordState[oldState]}
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
                                    error={newState != 0}
                                    helperText={PasswordState[newState]}
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
                                    error={rewriteState != 0}
                                    helperText={PasswordState[rewriteState]}
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