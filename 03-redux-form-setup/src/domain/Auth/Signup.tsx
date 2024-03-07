import { Button, TextField, Typography } from "@mui/material";
import { StyledContainer, StyledInputBox, StyledAuthFooter, StyledLink } from "./Shared.Auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    return (
        <StyledContainer>
            <Typography variant="h4">Sign Up</Typography>
            <Typography sx={{ marginBottom: 3 }} variant='body1'>Set credentials to Signup</Typography>

            <StyledInputBox>
                <TextField variant='standard' placeholder="Email" sx={{ marginBottom: 2 }} />
                <TextField variant='standard' placeholder="Password" type='password' />
            </StyledInputBox>
            <StyledAuthFooter>
                <Button sx={{ marginBottom: 2 }} variant='contained'>Sign Up</Button>
                <Typography>Sign in to existing account <StyledLink onClick={()=> {navigate("/signin")}}>here</StyledLink> </Typography>
            </StyledAuthFooter>
        </StyledContainer>
    )
};


export default Signup;