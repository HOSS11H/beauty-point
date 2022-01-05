import React, { useState, useCallback, useContext, Fragment } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from './Navigator/Navigator';
import Header from './Header/Header';
import { Outlet } from 'react-router';
import ThemeContext from '../../store/theme-context';
import { connect } from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';

const drawerWidth = 256;

const Account = (props) => {

	const { fetchingPermissions } = props;

	const themeCtx = useContext(ThemeContext)

	const { theme } = themeCtx;

	const customTheme = React.useMemo(
		() =>
			createTheme({
				...theme,
				components: {
					MuiDrawer: {
						styleOverrides: {
							paper: {
								//backgroundColor: theme.palette.background.default,
								boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px',
								borderRight: '0',
							},
						},
					},
					MuiAppBar: {
						styleOverrides: {
							root: {
								backgroundColor: theme.palette.background.default,
								color: theme.palette.text.primary,
								padding: theme.spacing(1),
							},
						},
					},
					MuiIconButton: {
						styleOverrides: {
							root: {
								padding: theme.spacing(1),
							},
						},
					},
					MuiTooltip: {
						styleOverrides: {
							tooltip: {
								borderRadius: 4,
							},
						},
					},
					MuiDivider: {
						styleOverrides: {
							root: {
								backgroundColor: 'rgb(255,255,255,0.15)',
							},
						},
					},
					MuiListItemText: {
						styleOverrides: {
							primary: {
								fontSize: 16,
								fontWeight: theme.typography.fontWeightRegular,
							},
						},
					},
					MuiListItemIcon: {
						styleOverrides: {
							root: {
								color: 'inherit',
								minWidth: 'auto',
								'& svg': {
									fontSize: 22,
								},
							},
						},
					},
					MuiAvatar: {
						styleOverrides: {
							root: {
								width: 32,
								height: 32,
							},
						},
					},
				},
			}),
		[theme],
	);

	const [mobileOpen, setMobileOpen] = useState(false);


	const handleDrawerToggle = useCallback(() => {
		setMobileOpen(!mobileOpen);
	}, [mobileOpen]);
	let content;
	if (fetchingPermissions) {
		content = <Loader height='100vh' />
	} else {
		content = (
			<Box sx={{ display: 'flex', minHeight: '100vh', }}>
				<CssBaseline />
				<Box
					component="nav"
					sx={{ flexShrink: { sm: 0 }, }}
				>
					<Navigator
						open={mobileOpen}
						variant="permanent"
					/>
				</Box>
				<Box sx={{ flexGrow: 1, maxWidth: mobileOpen ? `calc( 100% - ${drawerWidth}px)` : `calc( 100% - 57px)` }} >
					<Header onDrawerToggle={handleDrawerToggle} />
					<Box component="main" sx={{ py: 4, px: 3, bgcolor: theme.palette.background.default }}>
						<Outlet />
					</Box>
				</Box>
			</Box>
		)
	}
	return (
		<Fragment>
			<ThemeProvider theme={customTheme}>
				{content}
			</ThemeProvider>
		</Fragment>
	);
}
const mapStateToProps = (state) => {
	return {
		fetchingPermissions: state.permissions.fetchingPermissions,
	}
}
export default connect(mapStateToProps, null)(Account);