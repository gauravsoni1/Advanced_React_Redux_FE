import { Button, TextField, Typography } from "@mui/material";
import { StyledContainer, StyledInputBox, StyledAuthFooter, StyledLink } from "./Shared.Auth";
import { useNavigate } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import ReduxTextField from "../../redux/components/ReduxTextField";

import FORM from '../../const/form';
import { isEmailValid, passwordValidation } from "../../utils/validations";
const { SIGN_UP: { formName, formFields } } = FORM;

const Signup = ({ handleSubmit, valid, anyTouched }: InjectedFormProps) => {
    const navigate = useNavigate();

    const submitForm = (formData: any) => {
        console.log("Form submitting", formData);
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <StyledContainer>
                <Typography variant="h4">Sign Up</Typography>
                <Typography sx={{ marginBottom: 3 }} variant='body1'>Set credentials to Signup</Typography>

                <StyledInputBox>
                    <Field validate={[isEmailValid]} name={formFields.email} label="User Email" component={ReduxTextField} />
                    <Field validate={[passwordValidation]} name={formFields.password} label="User Password" component={ReduxTextField} type="password" />
                </StyledInputBox>
                <StyledAuthFooter>
                    <Button disabled={!anyTouched || !valid} sx={{ marginBottom: 2 }} variant='contained' type="submit">Sign Up</Button>
                    <Typography>Sign in to existing account <StyledLink onClick={() => { navigate("/signin") }}>here</StyledLink> </Typography>
                </StyledAuthFooter>
            </StyledContainer>
        </form>
    )
};


export default reduxForm({
    touchOnChange: true,
    form: formName
})(Signup);