import { Box, Fab, Menu, MenuItem, Typography } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal_Types, openModal } from '../../../redux/slice/modalSlice';
import { useTranslation } from '../../../../node_modules/react-i18next';
import { Translations } from '../../../const/translations';
import AuthCheck from '../../../components/AuthCheck';
import { Permissions } from '../../../const/permissions';
import { useNavigate } from 'react-router-dom';

const FloatingMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
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

    const onAddUserClick = () => {
        navigate("/adduser");
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

                <AuthCheck permissions={[Permissions.CREATE_PROPERTY]}>
                    <MenuItem onClick={onClickAddProperty}>
                        <Add />
                        <Typography>{t(Translations.ADD_PROPERTY)}</Typography>
                    </MenuItem>
                </AuthCheck>

                <AuthCheck permissions={[Permissions.DELETE_PROPERTY]}>
                    <MenuItem>
                        <DeleteOutline />
                        <Typography>{t(Translations.DELETE_PROPERTY)}</Typography>
                    </MenuItem>
                </AuthCheck>

                <MenuItem onClick={onAddUserClick}>
                    <DeleteOutline />
                    <Typography>Add User</Typography>
                </MenuItem>

            </Menu>
        </Box>
    )
}

export default FloatingMenu;