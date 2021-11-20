import { Fragment, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import ThemeContext from '../../../store/theme-context';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';

import { ButtonSmall } from '../../../components/UI/Button/Button';

const SwitchBtn = styled(ButtonSmall)`
    &.MuiButton-root {
        margin-bottom: 0;
        width: auto;
        padding: 0 15px;
        font-family: ${ ( { theme } ) => theme.direction === "ltr" ? "'Cairo', sans-serif " : "'Poppins', sans-serif " };
    }
`

function Header(props) {
    const { onDrawerToggle } = props;

    const themeCtx = useContext(ThemeContext)


    return (
        <Fragment>
            <AppBar sx={{ boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px', }} position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { md: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton sx={{ mr: 1, color: themeCtx.theme.palette.mode === 'dark' ? themeCtx.theme.vars.white : themeCtx.theme.vars.black }} onClick={themeCtx.toggleMode} >
                                {themeCtx.theme.palette.mode === 'dark' ? <WbSunnyIcon /> : <Brightness2Icon />}
                            </IconButton>
                            <SwitchBtn onClick={themeCtx.toggleLanguage} >{themeCtx.lang === 'ar' ? 'switch to EN' : 'الانتقال الي العربية' }</SwitchBtn>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                            </IconButton>
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