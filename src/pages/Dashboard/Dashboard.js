import  { useState, useCallback, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Navigator from './Navigator/Navigator';
import Content from './Content/Content';
import Header from './Header/Header';
import { Outlet } from 'react-router';

function Copyright() {
	return (
		<h1>Copyright</h1>
	);
}

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

theme = {
	...theme,
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: '#fff',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				contained: {
					boxShadow: 'none',
					'&:active': {
						boxShadow: 'none',
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					marginLeft: theme.spacing(1),
				},
				indicator: {
					height: 3,
					borderTopLeftRadius: 3,
					borderTopRightRadius: 3,
					backgroundColor: theme.palette.common.white,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					margin: '0 16px',
					minWidth: 0,
					padding: 0,
					[theme.breakpoints.up('md')]: {
						padding: 0,
						minWidth: 0,
					},
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
};

const drawerWidth = 256;

export default function Dashboard( props ) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));


	const handleDrawerToggle = useCallback( () => {
		setMobileOpen(!mobileOpen);
	} , [ mobileOpen ] ) ;
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex', minHeight: '100vh' }}>
				<CssBaseline />
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
					<Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
						<Content />
						<Outlet />
					</Box>
					<Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
						<Copyright />
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
}