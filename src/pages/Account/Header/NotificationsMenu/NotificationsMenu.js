import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, IconButton, Popover, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Loader from '../../../../components/UI/Loader/Loader';
import ThemeContext from '../../../../store/theme-context';
import axios from '../../../../utils/axios-instance';
import DOMPurify from "dompurify";


const CustomList = styled(List)`
    &.MuiList-root {
        padding-bottom: 52px;
        width:280px;
        @media screen and (min-width: 900px) {
            max-height: 50vh;
            width:350px;
        }
        @media (min-width: 600px) and (max-width: 900px) {
            width:350px;
        }
        @media screen and (max-width: 900px) {
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
        & .MuiListItemText-root {
            & .MuiListItemText-secondary {
                a {
                    color: ${({ theme }) => theme.vars.primary}
                }
            }
        }
    }
`

const SeeAllButton = styled(Button)`
    &.MuiButton-root {
        background-color: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(255,255,255,1)'} ;
        border-radius: 0;
        width: 100%;
    }
`

const NotificationsMenu = props => {

    const { t } = useTranslation()

    const navigate = useNavigate()
    const themeCtx = useContext(ThemeContext)

    const [anchorEl, setAnchorEl] = useState(null);

    const [notifications, setNotifications] = useState([])

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
                // setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loading])

    const fetchNotifications = useCallback(() => {
        setLoading(true)
        axios.get(`/notifications?page=${page}&per_page=5`)
            .then(res => {
                setLoading(false)
                setNotifications(currentNotifications => {
                    return [...currentNotifications, ...res.data]
                });
                /* setNotifications(currentNotifications => {
                    return [...currentNotifications, ...res.data.data]
                }); */
                /*  if (res.data.meta.last_page === page) {
                        setLastPage(true)
                 } */
            })
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [page])

    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications, page])

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
        navigate(`/account/sources/notifications/${id}`)
        handleClose()
        if (updatedNotifications[notificationIndex].read_at) return;
        updatedNotifications[notificationIndex].read_at = moment().format()
        axios.post(`/notifications/${id}/read`)
            .then(res => {
                //console.log(err);
            }).catch(err => {
                //console.log(err);
            })
    }

    const viewAllNotificationsHandler = () => {
        navigate(`/account/sources/notifications`)
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
                    const mySafeHTML = DOMPurify.sanitize(notification.message);
                    if (notifications.length === (index + 1)) {
                        return (
                            <ListItem disablePadding ref={lastElementRef} key={index} >
                                <CustomListItemButton $unread={!notification.read_at} onClick={() => handleNotifaicationClick(notification.id, notification.type)} >
                                    <ListItemText primary={notification.title} secondary={<span dangerouslySetInnerHTML={{ __html: mySafeHTML }} /> } />
                                    <Typography variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }} >
                                        <bdi>{moment.utc(notification.created_at).fromNow()}</bdi>
                                    </Typography>
                                </CustomListItemButton>
                            </ListItem>
                        )
                    } else {
                        return (
                            <Fragment key={index} >
                                <ListItem disablePadding >
                                    <CustomListItemButton $unread={!notification.read_at} onClick={() => handleNotifaicationClick(notification.id, notification.type)} >
                                        <ListItemText primary={notification.title} secondary={<span dangerouslySetInnerHTML={{ __html: mySafeHTML }} /> } />
                                        <Typography variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }} >
                                            <bdi>{moment.utc(notification.created_at).fromNow()}</bdi>
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
                    <SeeAllButton color='secondary' onClick={viewAllNotificationsHandler} >{t('See All Notifications')}</SeeAllButton>
                    {popoverContent}
                </CustomList>
            </Popover>
        </Fragment>
    )
}
export default NotificationsMenu;