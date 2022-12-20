// Password UI Validator
//  -> (password)
//  -> (newPassword, oldPassword, true)
//  -> (re_password, password, false)
export const PasswordUIValidator = (password, op_password = '', option = true) => {
    if (password === "") {
        return PasswordValidCode.Empty;
    }
    if (op_password !== '') {
        if (option) {
            if (password === op_password) {
                return PasswordValidCode.Same_Old_Password;
            }
        } else {
            if (password !== op_password) {
                return PasswordValidCode.Not_Matching;
            }
        }
    }
    return PasswordValidCode.OK;
}

// Password validation code
export const PasswordValidCode = {
    OK: 0,
    Empty: 1,
    Wrong: 2,
    Same_Old_Password: 3,
    Not_Matching: 4
}

// Password validation helper text a.k.a. error message 
export const PasswordValidText = [
    "",
    "Please enter password",
    "Wrong password",
    "New password can not be same as old password",
    "Confirm password does not match the new password"
];