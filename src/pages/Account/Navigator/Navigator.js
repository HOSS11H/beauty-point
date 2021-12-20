import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventIcon from '@mui/icons-material/Event';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import openedLogo from '../../../images/logo/logo_dark.png'
import closedLogo from '../../../images/logo/logo_mobile.png'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { useTranslation } from 'react-i18next';

const categories = [
    {
        id: 'dashboard',
        children: [
            {
                id: 'dashboard',
                name: 'dashboard',
                icon: <DashboardIcon />,
            },
            { id: 'services', name: 'services', icon: <FormatListBulletedIcon /> },
            { id: 'products', name: 'products', icon: <ShoppingCartIcon /> },
            { id: 'expenses', name: 'expenses', icon: <MonetizationOnIcon /> },
            { id: 'employees', name: 'employees', icon: <PersonIcon /> },
            { id: 'deals', name: 'deals', icon: <LocalOfferIcon /> },
            { id: 'point-of-sale', name: 'points of sales', icon: <AddShoppingCartIcon /> },
            { id: 'bookings', name: 'bookings', icon: <BookIcon /> },
            { id: 'booking-calendar', name: 'booking calendar', icon: <EventIcon /> },
            { id: 'reports', name: 'reports', icon: <InsertChartIcon /> },
            { id: 'settings', name: 'settings', icon: <SettingsIcon /> },
        ],
    },
];
const drawerWidth = 256;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7)} + 1px)`,
    },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);



const Logo = styled.li`
    font-size: 22px;
    padding-bottom: 8px;
    color: ${({ theme }) => theme.palette.text.primary};
`
const LogoImg = styled.img`
    width: 100%;
    height: 50px;
    object-fit: cover;
`

const CustomListItemButton = styled(ListItemButton)`
    &.MuiListItemButton-root {
        height: 48px;
        border-radius: 9px;
        margin-bottom: 8px;
        padding: ${ ({ open }) => open ? '0 15px' : '0 8px' };
        color: ${({ theme }) => theme.palette.text.primary};
        transition: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        text-transform: capitalize;
        justify-content: ${ ({ open }) => open ? 'flex-start' : 'center' };
        .MuiListItemText-root {
            display: ${ ({ open }) => open ? 'block' : 'none' };
        }
        .MuiListItemIcon-root {
            margin-right:${ ({ open }) => open ? '16px' : '0' };
        }
    }
`
const CustomNavLink = styled(NavLink)`
    display: flex;
    flex-grow: 1;
    &.active {
        & .MuiListItemButton-root {
            color: ${({ theme }) => theme.palette.common.white};
            background-color: ${({ theme }) => theme.vars.primary};
        }
    }
`
const CustomListItemIcon = styled(ListItemIcon)`
    margin-right: 16px;
`


export default function Navigator(props) {

    const { open, ...other } = props;

    const params = useParams();
    const { t } = useTranslation();


    return (
        <Drawer open={open}  {...other} anchor='left'  >
            <List disablePadding sx={{ px: open ? '16px' : '0px' , py: '16px', }} >
                <Logo>
                    <NavLink to='/' >
                        {
                            open ? <LogoImg src={openedLogo} alt='logo' /> : <LogoImg src={closedLogo} alt='logo' />
                        }
                    </NavLink>
                </Logo>
                {categories.map(({ id, children }) => (
                    <Box key={id}>
                        {children.map(({ id: childId, name, icon, active }) => (
                            <ListItem disablePadding key={childId}>
                                <CustomNavLink
                                    to={`${childId}`}
                                >
                                    <CustomListItemButton open={open} selected={params === childId}>
                                        <CustomListItemIcon>{icon}</CustomListItemIcon>
                                        <ListItemText >{t(name)}</ListItemText>
                                    </CustomListItemButton>
                                </CustomNavLink>
                            </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}
