import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton, Popover } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Fragment, useCallback, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import ThemeContext from '../../../../store/theme-context';

// import axios from '../../../../utils/axios-instance'

const data = [
    {
        'id': 1,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 3,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 2,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': new Date(),
        'created_at': new Date(),
    },
    {
        'id': 4,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 5,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 6,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': new Date(),
        'created_at': new Date(),
    },
    {
        'id': 7,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 8,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 9,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': new Date(),
        'created_at': new Date(),
    },
    {
        'id': 10,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 11,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 12,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': new Date(),
        'created_at': new Date(),
    },
    {
        'id': 13,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 14,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': null,
        'created_at': new Date(),
    },
    {
        'id': 15,
        'type': 'booking',
        'title': 'عنوان الاشعار المرسل',
        'message': 'تفاصيل الاشعار المرسل والوصف الخاص به',
        'read_at': new Date(),
        'created_at': new Date(),
    },
]

const CustomList = styled(List)`
    &.MuiList-root {
        @media screen and (min-height: 900px) {
            max-height: 50vh;
        }
    }
`

const CustomListItemButton = styled(ListItemButton)`
    &.MuiListItemButton-root {
        ${({ $unread }) => $unread && css`
            text-decoration: none;
            background-color: ${ ({ theme }) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.04)' } ;
        `}
    }
`

const Notifications = props => {

    const  navigate = useNavigate()
    const themeCtx = useContext(ThemeContext)

    const [anchorEl, setAnchorEl] = useState(null);

    const [notifications, setNotifications] = useState(data)

    const [lastPage, setLastPage] = useState(false)
    const [loading, setLoading] = useState(true)
    // tracking on which page we currently are
    const [page, setPage] = useState(1)

    const ovserver = useRef()
    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loading])

    /*  useEffect(() => {
            setLoading(true)
            axios.get(`/notifications?page=${page}&per_page=5`)
                .then(res => {
                    setLoading(false)
                    setNotifications(currentNotifications => {
                        return [...currentNotifications, ...res.data.data]
                    });
                    if (res.data.meta.last_page === page) {
                        setLastPage(true)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    //console.log(err);
                })
     }, [page]) */

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotifaicationClick = (type) => {
        // request to make the notification status to be read
        navigate(`bookings`)
        handleClose()
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const popoverContent = (
        <Fragment>
            {notifications.map((notification, index) => {
                if (notifications.length === (index + 1)) {
                    return (
                        <ListItem disablePadding ref={lastElementRef} key={index}  >
                            <CustomListItemButton $unread={!notification.read_at} onClick={handleNotifaicationClick} >
                                <ListItemText primary={notification.title} secondary={notification.message} />
                            </CustomListItemButton>
                        </ListItem>
                    )
                } else {
                    return (
                        <Fragment>
                            <ListItem disablePadding key={index} >
                                <CustomListItemButton $unread={!notification.read_at} onClick={handleNotifaicationClick} >
                                    <ListItemText primary={notification.title} secondary={notification.message} />
                                </CustomListItemButton>
                            </ListItem>
                            <Divider />
                        </Fragment>
                    )
                }
            })}
        </Fragment>
    )


    return (
        <>
            <IconButton onClick={handleClick}
                sx={{ color: themeCtx.theme.palette.mode === 'dark' ? themeCtx.theme.vars.white : themeCtx.theme.vars.black }}>
                <Badge badgeContent={notifications.filter( n => !n.read_at).length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <CustomList>
                    {popoverContent}
                </CustomList>
            </Popover>
        </>
    )
}
export default Notifications;