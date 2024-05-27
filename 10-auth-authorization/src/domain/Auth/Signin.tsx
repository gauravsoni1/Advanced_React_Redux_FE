import { Alert, Button, Typography } from "@mui/material";
import { StyledContainer, StyledInputBox, StyledAuthFooter, StyledLink } from "./Shared.Auth";
import { useNavigate } from "react-router-dom";
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import ReduxTextField from "../../redux/components/ReduxTextField";

import FORM from '../../const/form';
import { isEmailValid, passwordValidation } from "../../utils/validations";
import { useSignInMutation } from '../../hooks/api/user.api';
import { useDispatch } from "react-redux";
import { updateUserData } from "../../redux/slice/userSlice";

const { SIGN_IN: { formName, formFields } } = FORM;

const Signin = ({ handleSubmit, valid, anyTouched }: InjectedFormProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [signin, { isLoading, isError, isSuccess, data, error }] = useSignInMutation();

    const onSubmit = (formData: any) => {
        console.log(formData);
        signin(formData);
    }

    if (isSuccess) {
        dispatch(updateUserData({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            usr_id: data.usr_id,
            usr_permissions: data.usr_permissions,
            usr_role: data.usr_role
        }))
        navigate('/listing');
    }

    console.log({ isLoading, isError, isSuccess, data })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <StyledContainer>
                <Typography variant="h4">Sign In</Typography>
                <Typography sx={{ marginBottom: 3 }} variant='body1'>Enter your credentials to Sign In</Typography>

                <StyledInputBox>
                    <Field validate={[isEmailValid]} name={formFields.email} label="Enter Username" component={ReduxTextField} />
                    <Field validate={[passwordValidation]} name={formFields.password} label="Enter Password" component={ReduxTextField} type="password" />
                </StyledInputBox>
                <StyledAuthFooter>
                    <Button disabled={!anyTouched || !valid || isLoading} sx={{ marginBottom: 2 }} variant='contained' type="submit">Sign In</Button>
                    <Typography>Create a new account <StyledLink onClick={() => { navigate("/signup") }}>here</StyledLink> </Typography>
                </StyledAuthFooter>

                {isError ? <Alert sx={{ marginTop: 1 }} severity='error'>{error?.message}</Alert> : null}
            </StyledContainer>
        </form>

    )
};

export default reduxForm({
    touchOnChange: true,
    form: formName
})(Signin)