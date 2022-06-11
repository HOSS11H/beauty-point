import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, IconButton, Popover, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { Fragment, useCallback, useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Loader from '../../../../components/UI/Loader/Loader';
import ThemeContext from '../../../../store/theme-context';
import axios from '../../../../utils/axios-instance';


const CustomList = styled(List)`
    &.MuiList-root {
        position: relative;
        padding-bottom: 52px;
        min-width:200px;
        @media screen and (min-height: 900px) {
            max-height: 50vh;
        }
        @media screen and (max-height: 900px) {
            max-height: 80vh;
        }
    }
`

const CustomListItemButton = styled(ListItemButton)`
    &.MuiListItemButton-root {
        flex-direction: column;
        align-items: flex-start;
        ${({ $unread }) => $unread && css`
            text-decoration: none;
            background-color: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.04)'} ;
        `}
    }
`

const SeeAllButton = styled(Button)`
    &.MuiButton-root {
        position: absolute;
        bottom: 8px;
        left: 0;
        right: 0;
    }
`

const data = [
    {
        "id": "ab21961d-3629-4143-81e5-6bb7bd9c7cb8",
        "type": "App\\Notifications\\BookingCreated",
        "message": "مرحباً بك تم تأكيد حجزك رقم 12227 لدى صالون صالون منيرة",
        "title": "تم تأكيد حجزك",
        "read_at": null,
        "created_at": "2022-06-11T00:45:53.000000Z"
    },
    {
        "id": "e2a5e677-a0fc-4b3a-88d3-a2126a0628f9",
        "type": "App\\Notifications\\BookingCreated",
        "message": "مرحباً بك تم تأكيد حجزك رقم 12227 لدى صالون صالون منيرة",
        "title": "تم تأكيد حجزك",
        "read_at": null,
        "created_at": "2022-06-11T00:45:53.000000Z"
    },
]

const NotificationsMenu = props => {

    const { t } = useTranslation()

    const navigate = useNavigate()
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

    /* useEffect(() => {
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

    const handleNotifaicationClick = (id, type) => {
        // request to make the notification status to be read
        const notificationIndex = notifications.findIndex(notification => notification.id === id)
        const updatedNotifications = [...notifications]
        navigate(`notifications/${id}`)
        handleClose()
        if(updatedNotifications[notificationIndex].read_at) return;
        updatedNotifications[notificationIndex].read_at = moment().format()
        axios.post(`/notifications/${id}/read`)
            .then(res => {
                //console.log(err);
            }).catch(err => {
                //console.log(err);
            })
    }

    const viewAllNotificationsHandler = () => {
        navigate(`notifications`)
        handleClose()
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let popoverContent;

    if (loading) {
        popoverContent = <Loader />
    }

    if (notifications.length === 0) {
        popoverContent = <ListItem sx={{ justifyContent: 'center' }} >{t('No notifications')}</ListItem>
    }

    if (notifications.length > 0) {
        popoverContent = (
            <Fragment>
                {notifications.map((notification, index) => {
                    if (notifications.length === (index + 1)) {
                        return (
                            <ListItem disablePadding ref={lastElementRef} key={notification.id} >
                                <CustomListItemButton $unread={!notification.read_at} onClick={() => handleNotifaicationClick( notification.id, notification.type  )} >
                                    <ListItemText primary={notification.title} secondary={notification.message} />
                                    <Typography variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }} >
                                        <bdi>{moment(notification.created_at).fromNow()}</bdi>
                                    </Typography>
                                </CustomListItemButton>
                            </ListItem>
                        )
                    } else {
                        return (
                            <Fragment>
                                <ListItem disablePadding key={notification.id} >
                                    <CustomListItemButton $unread={!notification.read_at} onClick={() => handleNotifaicationClick( notification.id, notification.type  )} >
                                        <ListItemText primary={notification.title} secondary={notification.message} />
                                        <Typography variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }} >
                                            <bdi>{moment(notification.created_at).fromNow()}</bdi>
                                        </Typography>
                                    </CustomListItemButton>
                                </ListItem>
                                <Divider />
                            </Fragment>
                        )
                    }
                })}
            </Fragment>
        )
    }


    return (
        <Fragment>
            <IconButton onClick={handleClick}
                sx={{ color: themeCtx.theme.palette.mode === 'dark' ? themeCtx.theme.vars.white : themeCtx.theme.vars.black }}>
                <Badge badgeContent={notifications.filter(n => !n.read_at).length} color="secondary">
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
                    <SeeAllButton color='secondary' onClick={ viewAllNotificationsHandler } >{t('See All Notifications')}</SeeAllButton>
                </CustomList>
            </Popover>
        </Fragment>
    )
}
export default NotificationsMenu;