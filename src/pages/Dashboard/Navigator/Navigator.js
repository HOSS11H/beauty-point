import { useContext } from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import ThemeContext from '../../../store/theme-context';

const categories = [
    {
        id: 'Build',
        children: [
            {
                id: 'Authentication',
                icon: <PeopleIcon />,
                active: true,
            },
            { id: 'Database', icon: <DnsRoundedIcon /> },
            { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
            { id: 'Hosting', icon: <PublicIcon /> },
            { id: 'Functions', icon: <SettingsEthernetIcon /> },
            {
                id: 'Machine learning',
                icon: <SettingsInputComponentIcon />,
            },
        ],
    },
    {
        id: 'Quality',
        children: [
            { id: 'Analytics', icon: <SettingsIcon /> },
            { id: 'Performance', icon: <TimerIcon /> },
            { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const CustomListItemButton = styled(ListItemButton)`
    &.MuiListItemButton-root {
        padding: 5px 20px;
        color: ${({ theme }) => theme.palette.background.default};
        background-color: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        &.Mui-selected {
            color: ${({ theme }) => theme.palette.common.white};
            background-color: ${({ theme }) => theme.vars.primary};
            &:hover, &:focus {
                color: ${({ theme }) => theme.palette.common.white};
                background-color: ${({ theme }) => theme.vars.primary};
            }
        }
        &:hover, &:focus {
            color: ${({ theme }) => theme.palette.common.white};
            background-color: ${({ theme }) => theme.vars.primary};
        }
    }
`
const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props;

    const themeCtx = useContext(ThemeContext)

    return (
        <Drawer variant="permanent" {...other} anchor={themeCtx.direction === 'ltr' ? 'left' : 'right' }>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Paperbase
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Project Overview</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: themeCtx.theme.vars.main }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active }) => (
                            <ListItem disablePadding key={childId}>
                                <CustomListItemButton selected={active}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </CustomListItemButton>
                            </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}