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
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import ThemeContext from '../../../store/theme-context';

const categories = [
    {
        id: 'dashboard',
        children: [
            {
                id: 'authentication',
                name: 'Authentication',
                icon: <PeopleIcon />,
            },
            { id: 'database', name: 'Database', icon: <DnsRoundedIcon /> },
            { id: 'storage', name: 'Storage', icon: <PermMediaOutlinedIcon /> },
            { id: 'hosting', name: 'Hosting', icon: <PublicIcon /> },
            { id: 'functions', name: 'Functions', icon: <SettingsEthernetIcon /> },
            {
                id: 'machine-learning',
                name: 'Machine learning',
                icon: <SettingsInputComponentIcon />,
            },
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
        & .MuiTypography-root {
            font-family: ${ ( {theme}  ) => theme.direction === 'rtl' ? theme.fonts.ar : theme.fonts.en };
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
            &:hover {
                color: ${({ theme }) => theme.palette.common.white};
                background-color: ${({ theme }) => theme.vars.primary};
            }
        }
    }
`


export default function Navigator(props) {

    const { ...other } = props;

    const themeCtx = useContext(ThemeContext)

    const  params  = useParams();

    console.log(params);


    return (
        <Drawer variant="permanent" {...other} anchor={themeCtx.direction === 'ltr' ? 'left' : 'right' }  >
            <List disablePadding sx={{ px: '16px', py: '16px' }} >
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
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{name}</ListItemText>
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