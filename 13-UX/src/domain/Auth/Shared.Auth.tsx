import styled from "@emotion/styled"
import { Paper, Box, Link } from "@mui/material"

export const StyledContainer = styled(Paper)`
    width: 350px;
    padding: 20px;
`

export const StyledInputBox = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

export const StyledAuthFooter = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledLink = styled(Link)({
    ':hover': {
        cursor: 'pointer'
    }
})
