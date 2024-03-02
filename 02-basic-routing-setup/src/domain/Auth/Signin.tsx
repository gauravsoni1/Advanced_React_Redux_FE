import { Button, TextField, Typography } from "@mui/material";
import { StyledContainer, StyledInputBox, StyledAuthFooter, StyledLink } from "./Shared.Auth";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate()

    return (
        <StyledContainer>
            <Typography variant="h4">Sign In</Typography>
            <Typography sx={{marginBottom: 3}} variant='body1'>Enter your credentials to Sign In</Typography>

            <StyledInputBox>
                <TextField variant='standard' placeholder="Email" sx={{marginBottom: 2}}/>
                <TextField variant='standard' placeholder="Password" type='password' />
            </StyledInputBox>
            <StyledAuthFooter>
                <Button sx={{marginBottom: 2}} variant='contained'>Sign In</Button>
                <Typography>Create a new account <StyledLink onClick={()=> {navigate("/signup")}}>here</StyledLink> </Typography>
            </StyledAuthFooter>
        </StyledContainer>
    )
};

export default Signin;