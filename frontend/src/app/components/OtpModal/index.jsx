import React from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';

const OtpModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        // sx={{
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        // }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3
                }}
            >
                <Typography align='center' variant='h4'>
                    OTP Verification
                </Typography>
                <TextField
                    label='otp'
                    value={props.otp}
                    onChange={(event) => {
                        props.setOtp(event.target.value);
                    }}
                >

                </TextField>
                <Box>
                    <Typography variant='p'>
                        OTP not received?
                    </Typography>
                    <Button>
                        RESEND
                    </Button>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={props.handleOtp}
                >
                    SUBMIT
                </Button>
            </Box>
        </Modal>
    );
};

export default OtpModal;