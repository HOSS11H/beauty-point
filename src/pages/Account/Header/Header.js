import Brightness2Icon from '@mui/icons-material/Brightness2';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Box, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonSmall, ButtonText } from '../../../components/UI/Button/Button';
import AuthContext from '../../../store/auth-context';
import ThemeContext from '../../../store/theme-context';
import Notifications from './Notifications/Notifications';

const SwitchBtn = styled(ButtonSmall)`
    &.MuiButton-root {
        margin-bottom: 0;
        width: auto;
        padding: 0 15px;
        font-family: ${ ( { theme } ) => theme.direction === "ltr" ? "'Cairo', sans-serif " : "'Poppins', sans-serif " };
    }
`
const HomeBtn = styled(ButtonSmall)`
    &.MuiButton-root {
        margin-bottom: 0;
        width: auto;
        padding: 0 15px;
        margin-right: 10px
    }
`

const LogoutBtn = styled(ButtonText)`
    &.MuiButton-root {
        font-weight: bold;
    }
`

const LeftIconsWrapper = styled.div`
    display: flex;
    align-items: center;
`

function Header(props) {

    const navigate = useNavigate();

    const {t} = useTranslation();

    const { onDrawerToggle } = props;
    
    const themeCtx = useContext(ThemeContext)
    const { theme } = themeCtx;

    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    const authCtx = useContext(AuthContext);

    const {logout} = authCtx;

    const logoutHandler = () => {
        logout();
        navigate("/");
    }

    return (
        <Fragment>
            <AppBar sx={{ boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px', }} position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { lg: 'block', xs: 'block' } }} item>
                            <IconButton
                                id='menu-button'
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <LeftIconsWrapper>
                                <IconButton sx={{ mr: 1, color: themeCtx.theme.palette.mode === 'dark' ? themeCtx.theme.vars.white : themeCtx.theme.vars.black }} onClick={themeCtx.toggleMode} >
                                    {themeCtx.theme.palette.mode === 'dark' ? <WbSunnyIcon /> : <Brightness2Icon />}
                                </IconButton>
                                {/* <Box sx={{ mr: 1 }} >
                                    <Notifications />
                                </Box> */}
                                {!isMobile && <SwitchBtn onClick={themeCtx.toggleLanguage} >{themeCtx.lang === 'ar' ? 'switch to EN' : 'الانتقال الي العربية' }</SwitchBtn>}
                            </LeftIconsWrapper>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            {
                                !isMobile && (
                                    <>
                                        <HomeBtn onClick={ ( ) => navigate('/')   }>{t('visit store')}</HomeBtn>
                                        <NavLink to='point-of-sale'>
                                            <HomeBtn  >{t('add new booking')}</HomeBtn>
                                        </NavLink>
                                    </>
                                )
                            }
                            <LogoutBtn variant='text' onClick={logoutHandler}>{t('log out')}</LogoutBtn>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;