import { AppBar as MUIAppBar, Toolbar, Container, Box, Typography, Paper, InputBase } from '@mui/material';
import { Roofing, Search, Language, NotificationsOutlined, AccountCircle } from '@mui/icons-material';
import SearchBar from './SearchBar';

const AppBar = () => {
    return (
        <MUIAppBar>
            <Toolbar>
                <Box sx={{ display: 'fex' }}>
                    <Roofing></Roofing>
                    <Typography sx={{
                        mr: 2,
                        ml: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem'
                    }}>WoWBnb</Typography>
                </Box>
                <SearchBar />

                <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                    <Language sx={{ width: 30, height: 30 }} />
                    <NotificationsOutlined sx={{ width: 30, height: 30 }} />
                    <AccountCircle sx={{ width: 30, height: 30 }} />
                </Box>
            </Toolbar>
        </MUIAppBar>
    )

}

export default AppBar;