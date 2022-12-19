import validator from "validator";

// Email UI Validator
export const EmailUIValidator = email => {
    if (email === "") {
        return EmailValidCode.Empty;
    } 
    if (!validator.isEmail(email)) {
        return EmailValidCode.Invalid_Format;
    }
    return EmailValidCode.OK;
}

// Email validation code
export const EmailValidCode = {
    OK: 0,
    Empty: 1,
    Invalid_Format: 2,
    Invalid: 3,
    Existed: 4
};

// Email validation helper text a.k.a. error message
export const EmailValidText = [
    "", 
    "Please enter your email", 
    "This is not a valid email format",
    "Invalid Email",
    "This email has been used"
];