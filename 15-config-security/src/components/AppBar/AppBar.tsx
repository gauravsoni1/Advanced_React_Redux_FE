import { AppBar as MUIAppBar, Toolbar, Box, Typography, IconButton, styled, Menu, MenuItem } from '@mui/material';
import { Roofing, Language, AccountCircle, DarkMode } from '@mui/icons-material';
import SearchBar from './SearchBar';
import { US, FR } from 'country-flag-icons/react/3x2';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLanguage } from '../../redux/slice/userSlice';
import Notification from './Notification/Notification';
import District from './District/DIstrict';
import { ThemeContext } from '../../theme/ThemeProvider';
import { useFeatureFlags } from '../HOC/FeatureFlagProvider';
// import { useFlags } from 'launchdarkly-react-client-sdk';
// import { featureFlag } from '../../const/featureFlag';

const AppBar = () => {
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [langAnchorEl, setLangAnchorEl] = useState(null as (null | HTMLElement));
    // const { languageSelector } = useFlags();
    const flags = useFeatureFlags();

    const languageOptions = [
        { label: "English", icon: (<US />), code: 'en' },
        { label: "French", icon: (<FR />), code: 'fr' },
    ]

    const onLangButtonClick = (el: React.MouseEvent<HTMLElement>) => {
        setLangAnchorEl(el.currentTarget);
    }

    const onMenuClose = () => {
        setLangAnchorEl(null);
    }

    const onLangSelected = (lang: string) => {
        dispatch(updateLanguage(lang));
    }

    return (
        <MUIAppBar color={theme.button}>
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

                    {flags?.languageSelector && (<Box>
                        <StyledIconButton onClick={onLangButtonClick}>
                            <Language sx={{ width: 30, height: 30 }} />
                        </StyledIconButton>
                        <Menu open={Boolean(langAnchorEl)} onClose={onMenuClose} anchorEl={langAnchorEl} transformOrigin={{ vertical: 'top', horizontal: 'right' }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            {
                                languageOptions.map(language => <StyledMenuItemWithFlag key={language.code} onClick={() => onLangSelected(language.code)}>
                                    <StyledFlagIcon>
                                        {language.icon}
                                    </StyledFlagIcon>
                                    {language.label}
                                </StyledMenuItemWithFlag>)
                            }
                        </Menu>
                    </Box>)}


                    <Notification />
                    <District />
                    <StyledIconButton><AccountCircle sx={{ width: 30, height: 30 }} /></StyledIconButton>
                    <StyledIconButton theme={theme} onClick={toggleTheme}><DarkMode sx={{ width: 30, height: 30 }} /></StyledIconButton>
                </Box>
            </Toolbar>
        </MUIAppBar>
    )
}

const StyledMenuItemWithFlag = styled(MenuItem)({
    display: 'flex',
    alignItems: 'center'
})

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.color}`
}));

const StyledFlagIcon = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: "24px",
    marginRight: '8px'
})

export default AppBar;