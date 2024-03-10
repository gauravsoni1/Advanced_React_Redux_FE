import { Box, Fab, Menu, MenuItem, Typography } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';
import { useState } from 'react';

const FloatingMenu = () => {
    const [fabAnchorEl, setFabAnchorEl] = useState(null as (null | HTMLElement));

    const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setFabAnchorEl(event.currentTarget)
    }

    const onCloseFab = () => {
        setFabAnchorEl(null);
    }

    return (
        <Box>
            <Fab color='primary' sx={{ position: 'fixed', bottom: "30px", right: '30px' }} onClick={toggleMenu}>
                <Add />
            </Fab>
            <Menu
                open={Boolean(fabAnchorEl)}
                onClose={onCloseFab}
                anchorEl={fabAnchorEl}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MenuItem>
                    <Add />
                    <Typography>Add Property</Typography>
                </MenuItem>
                <MenuItem>
                    <DeleteOutline />
                    <Typography>Delete Property</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default FloatingMenu;