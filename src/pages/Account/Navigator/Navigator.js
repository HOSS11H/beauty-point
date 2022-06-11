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
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import openedLogo from '../../../images/logo/logo_dark.png'
import closedLogo from '../../../images/logo/logo_mobile.png'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../store/auth-context';
import PeopleIcon from '@mui/icons-material/People';
import DiscountIcon from '@mui/icons-material/Discount';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useState } from 'react';
import { connect } from 'react-redux';
import ModuleNav from './ModuleNav/ModuleNav';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Fragment } from 'react';

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
        padding: ${({ open }) => open ? '0 15px' : '0 8px'};
        color: ${({ theme }) => theme.palette.text.primary};
        transition: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        text-transform: capitalize;
        justify-content: ${({ open }) => open ? 'flex-start' : 'center'};
        .MuiListItemText-root {
            display: ${({ open }) => open ? 'block' : 'none'};
        }
        .MuiListItemIcon-root {
            margin-right:${({ open }) => open ? '16px' : '0'};
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

const Navigator = (props) => {

    const { open, fetchedPermissions, variant } = props;

    const authCtx = useContext(AuthContext)
    const { roleId, roleName } = authCtx;

    const params = useParams();
    const { t } = useTranslation();

    const [links, setLinks] = useState([]);


    let module = useRef(null);

    useEffect(() => {
        let renderedLinks = [{
            id: 'dashboard',
            children: [
                {
                    id: 'dashboard',
                    name: 'dashboard',
                    icon: <DashboardIcon />,
                },
                { id: 'bookings', name: 'bookings', icon: <BookIcon /> },
                { id: 'booking-calendar', name: 'booking calendar', icon: <EventIcon /> },
                { id: 'notifications', name: 'notifications', icon: <CircleNotificationsIcon /> },
            ],
        }];
        if (roleId === 'customer') {
            setLinks(renderedLinks);
        } else {
            let addedRoutes = [];
            fetchedPermissions.forEach(permission => {
                if (permission.name === 'read_business_service') {
                    addedRoutes.push({ id: 'services', name: 'services', icon: <FormatListBulletedIcon /> });
                    module.current = <ModuleNav />;
                }
                if (permission.name === 'read_product') {
                    addedRoutes.splice(1,0,{ id: 'units', name: 'units', icon: <LinearScaleIcon /> } )
                    addedRoutes.splice(2,0,{ id: 'products', name: 'products', icon: <ShoppingCartIcon /> } )
                    module.current = <ModuleNav />;
                }
                if (permission.name === 'read_customer') {
                    addedRoutes.push({ id: 'customers', name: 'customers', icon: <PeopleIcon /> });
                }
                if (permission.name === 'read_employee') {
                    addedRoutes.push({ id: 'employees', name: 'employees', icon: <PersonIcon /> },);
                }
                if (permission.name === 'read_employee_group') {
                    
                }
                if (permission.name === 'read_employee_leave') {

                }
                if (permission.name === 'read_employee_schedule') {
                    
                }
                if (permission.name === 'create_booking') {
                    addedRoutes.push({ id: 'point-of-sale', name: 'points of sales', icon: <AddShoppingCartIcon /> });
                }
                if (permission.name === 'read_deal') {
                    addedRoutes.push({ id: 'deals', name: 'deals', icon: <LocalOfferIcon /> });
                }
                if (permission.name === 'read_report') {
                    addedRoutes.push({ id: 'reports', name: 'reports', icon: <InsertChartIcon /> });
                }
                if (permission.name === 'read_coupon') {
                    addedRoutes.push({ id: 'coupons', name: 'coupons', icon: <DiscountIcon /> });
                }
                if (permission.name === 'manage_settings') {
                    addedRoutes.push({ id: 'tickets', name: 'tickets', icon: <ConfirmationNumberIcon /> });
                    addedRoutes.push({ id: 'plans', name: 'plans', icon: <CreditCardIcon /> });
                    if (roleName === 'artist') {
                        addedRoutes.push({ id: 'artist-seats', name: 'seats', icon: <EventSeatIcon /> });
                        
                    } else {
                        addedRoutes.push({ id: 'expenses', name: 'expenses', icon: <MonetizationOnIcon /> });
                        addedRoutes.push({ id: 'seats', name: 'seats', icon: <EventSeatIcon /> });
                    }
                    addedRoutes.push({ id: 'settings', name: 'settings', icon: <SettingsIcon /> });
                }
            })
            renderedLinks[0].children = renderedLinks[0].children.concat(addedRoutes);
            setLinks(renderedLinks);
        }
    }, [fetchedPermissions, roleId, roleName])

    return (
        <Fragment>
            <Drawer open={open}  variant={variant} anchor='left'  >
                <List disablePadding sx={{ px: open ? '16px' : '0px', py: '16px', }} >
                    <Logo>
                        <NavLink to='/' >
                            {
                                open ? <LogoImg src={openedLogo} alt='logo' /> : <LogoImg src={closedLogo} alt='logo' />
                            }
                        </NavLink>
                    </Logo>
                    {links.length > 0 && links.map(({ id, children }) => (
                        <Box key={id}>
                            {children.map(({ id: childId, name, icon, active }) => (
                                <ListItem disablePadding key={childId}>
                                    <CustomNavLink
                                        to={`${childId}`}
                                    >
                                        <CustomListItemButton id={childId} open={open} selected={params === childId}>
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
            {module.current && module.current}
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchedPermissions: state.permissions.permissions,
    }
}


export default connect(mapStateToProps, null)(Navigator);
