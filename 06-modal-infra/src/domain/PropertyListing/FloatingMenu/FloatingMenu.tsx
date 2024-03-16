import { Box, Fab, Menu, MenuItem, Typography } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal_Types, openModal } from '../../../redux/slice/modalSlice';

const FloatingMenu = () => {
    const [fabAnchorEl, setFabAnchorEl] = useState(null as (null | HTMLElement));
    const dispatch = useDispatch();

    const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setFabAnchorEl(event.currentTarget)
    }

    const onCloseFab = () => {
        setFabAnchorEl(null);
    }

    const onClickAddProperty = () => {
        dispatch(openModal(Modal_Types.ADD_PROPERTIES))
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
                <MenuItem onClick={onClickAddProperty}>
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