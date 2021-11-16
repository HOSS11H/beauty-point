import React ,  { useState, useCallback, useContext, Fragment } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from './Navigator/Navigator';
import Header from './Header/Header';
import { Outlet } from 'react-router';
import ThemeContext from '../../store/theme-context';



const drawerWidth = 256;

export default function Account( props ) {

	const themeCtx = useContext(ThemeContext)

	const { theme } = themeCtx;

	const customTheme = React.useMemo(
        ( ) =>
            createTheme({
                ...theme,
				components: {
					MuiDrawer: {
						styleOverrides: {
							paper: {
								//backgroundColor: theme.palette.background.default,
								boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px' , 
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
	const isMdUp = useMediaQuery(theme.breakpoints.up('md'));


	const handleDrawerToggle = useCallback( () => {
		setMobileOpen(!mobileOpen);
	} , [ mobileOpen ] ) ;
	return (
		<Fragment>
			<ThemeProvider theme={customTheme}>
				<Box sx={{ display: 'flex', minHeight: '100vh', maxWidth: '100%' }}>
					<CssBaseline />
					<Box
						component="nav"
						sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 },  }}
					>
						{isMdUp ? null : (
							<Navigator
								PaperProps={{ style: { width: drawerWidth } }}
								variant="temporary"
								open={mobileOpen}
								onClose={handleDrawerToggle}
							/>
						)}

						<Navigator
							PaperProps={{ style: { width: drawerWidth } }}
							sx={{ display: { md: 'block', xs: 'none' } }}
						/>
					</Box>
					<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
						<Header onDrawerToggle={handleDrawerToggle} />
						<Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: theme.palette.background.default }}>
							<Outlet />
						</Box>
					</Box>
				</Box>
			</ThemeProvider>
		</Fragment>
	);
}