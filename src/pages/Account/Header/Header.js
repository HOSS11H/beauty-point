import {useContext, Fragment} from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import {ButtonSmall} from '../../../components/UI/Button/Button';
import TextField from '@mui/material/TextField';


const ButtonSearch = styled(ButtonSmall)`
    &.MuiButton-root {
        margin-right: 8px;
    }
`

function Header(props) {
    const { onDrawerToggle } = props;

    const themeCtx = useContext(ThemeContext);

    return (
        <Fragment>
            <AppBar sx={{ color: themeCtx.theme.palette.text.primary, backgroundColor: '#fff', boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px' ,  }} position="sticky" elevation={0}>
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
                        <Toolbar sx={{ paddingTop: '8px'}} >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <SearchIcon color="inherit" sx={{ display: 'block' }} />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        placeholder="Search by email address, phone number, or user UID"
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: { fontSize: 'default' },
                                        }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item>
                                    <ButtonSearch>
                                        search
                                    </ButtonSearch>
                                </Grid>
                            </Grid>
                        </Toolbar>
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