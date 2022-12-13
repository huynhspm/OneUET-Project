import React from 'react';
import LockResetIcon from '@mui/icons-material/LockReset';
import { ThemeProvider, Container, CssBaseline, Box, Avatar, createTheme } from '@mui/material';

const theme = createTheme();

const ForgetPassword = (props) => {
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
                        <LockResetIcon />
                    </Avatar>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ForgetPassword;