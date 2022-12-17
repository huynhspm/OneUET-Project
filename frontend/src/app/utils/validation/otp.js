// OTP UI Validator
export const OTPUIValidator = otp => {
    if (otp === "") {
        return OTPValidCode.Empty;
    }
    return OTPValidCode.OK;
}

// OTP validation code
export const OTPValidCode = {
    OK: 0,
    Empty: 1,
    Invalid: 2,
    Expired: 3
}

// OTP validation helper text a.k.a. error message
export const OTPValidText = [
    "", 
    "Please enter your OTP", 
    "Invalid OTP", 
    "OTP expired, please click resend"
];