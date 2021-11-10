import  { useState, useCallback, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from './Navigator/Navigator';
import Header from './Header/Header';
import { Outlet } from 'react-router';
import ThemeContext from '../../store/theme-context';


let theme = createTheme({
	palette: {
		primary: {
			light: '#63ccff',
			main: '#009be5',
			dark: '#006db3',
		},
	},
	typography: {
		h5: {
			fontWeight: 500,
			fontSize: 26,
			letterSpacing: 0.5,
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiTab: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
	mixins: {
		toolbar: {
			minHeight: 48,
		},
	},
});



const drawerWidth = 256;

export default function Account( props ) {

	const themeCtx = useContext(ThemeContext)


	const customTheme = {
		...themeCtx.theme,
		components: {
			MuiDrawer: {
				styleOverrides: {
					paper: {
						backgroundColor: '#fff',
						boxShadow: 'rgb(113 122 131 / 11%) 0px 7px 30px 0px' , 
						borderRight: '0',
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
			MuiListItemButton: {
				styleOverrides: {
					root: {
						'&.Mui-selected': {
							color: '#4fc3f7',
						},
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
						marginRight: theme.spacing(2),
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
	}

	const [mobileOpen, setMobileOpen] = useState(false);
	const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));


	const handleDrawerToggle = useCallback( () => {
		setMobileOpen(!mobileOpen);
	} , [ mobileOpen ] ) ;
	return (
		<ThemeProvider theme={customTheme}>
			<Box sx={{ display: 'flex', minHeight: '100vh' }}>
				<CssBaseline />
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },  }}
				>
					{isSmUp ? null : (
						<Navigator
							PaperProps={{ style: { width: drawerWidth } }}
							variant="temporary"
							open={mobileOpen}
							onClose={handleDrawerToggle}
						/>
					)}

					<Navigator
						PaperProps={{ style: { width: drawerWidth } }}
						sx={{ display: { sm: 'block', xs: 'none' } }}
					/>
				</Box>
				<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
					<Header onDrawerToggle={handleDrawerToggle} />
					<Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#fff' }}>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
}