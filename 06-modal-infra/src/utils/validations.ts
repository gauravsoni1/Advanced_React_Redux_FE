import { isEmail, isLength } from "validator";

export const isEmailValid = (value: string = "") => {
    return isEmail(value) ? undefined : "Please enter valid email";
}

export const passwordValidation = (value: string = "") => {
    return isLength(value, { min: 3, max: 10 }) ? undefined : "Please enter valid password between 3-10 characters";
}