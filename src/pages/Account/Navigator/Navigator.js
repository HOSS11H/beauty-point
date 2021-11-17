import { useContext } from 'react';
import { NavLink , useParams } from 'react-router-dom';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ThemeContext from '../../../store/theme-context';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

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
            { id: 'customers', name: 'customers', icon: <PeopleAltIcon /> },
            { id: 'employees', name: 'employees', icon: <PersonIcon /> },
            { id: 'deals', name: 'deals', icon: <LocalOfferIcon /> },
            { id: 'pos', name: 'points of sales', icon: <AddShoppingCartIcon /> },
            { id: 'bookings', name: 'bookings', icon: <BookIcon /> },
        ],
    },
];





const Logo = styled.li`
    font-size: 22px;
    padding-bottom: 8px;
    color: ${({ theme }) => theme.palette.text.primary};
`

const CustomListItemButton = styled(ListItemButton)`
    &.MuiListItemButton-root {
        height: 48px;
        border-radius: 9px;
        margin-bottom: 8px;
        padding: 0px 15px;
        color: ${({ theme }) => theme.palette.text.primary};
        transition: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        text-transform: capitalize;
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

    const { ...other } = props;

    const themeCtx = useContext(ThemeContext)

    const  params  = useParams();
    const { t } = useTranslation();


    return (
        <Drawer variant="permanent" {...other} anchor='left'  >
            <List disablePadding sx={{ px: '16px', py: '16px', }} >
                <Logo>
                    Beauty Point
                </Logo>
                {categories.map(({ id, children }) => (
                    <Box key={id}>
                        <ListItem sx={{ pt: '32px', pb: '16px', px: 0, textTransform: 'capitalize'}}>
                            <ListItemText sx={{ color: themeCtx.theme.palette.grey[500], fontSize: '16px' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, name ,icon, active }) => (
                            <ListItem disablePadding key={childId}>
                                <CustomNavLink
                                    to={`${childId}`}
                                >
                                    <CustomListItemButton selected={params === childId }>
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