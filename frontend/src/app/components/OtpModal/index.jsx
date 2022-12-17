import React from 'react';
import { OTPValidCode, OTPValidText } from '../../utils/validation/otp';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';

// props = [open, handleClose, otp, setOtp, handleOtp, resendOtp ]
const OtpModal = (props) => {
    // OTP
    const [isValidOtp, setIsValidOtp] = React.useState(OTPValidCode.OK);

    return (
        <Modal open={props.open} onClose={props.handleClose} >
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
                    error={isValidOtp !== OTPValidCode.OK}
                    helperText={OTPValidText[isValidOtp]}
                    label='otp'
                    value={props.otp}
                    onChange={(event) => {
                        props.setOtp(event.target.value);
                    }}
                />
                <Box>
                    <Typography variant='p'>
                        OTP not received?
                    </Typography>
                    <Button
                        onClick={props.resendOTP}
                    >
                        RESEND
                    </Button>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        props.handleOTP(setIsValidOtp);
                    }}
                >
                    SUBMIT
                </Button>
            </Box>
        </Modal>
    );
};

export default OtpModal;