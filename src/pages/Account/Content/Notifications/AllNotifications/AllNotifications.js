import { Card, Grid, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Loader from '../../../../../components/UI/Loader/Loader';
import axios from '../../../../../utils/axios-instance';
import DOMPurify from "dompurify";

const CustomCard = styled(Card)`
    &.MuiPaper-root {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
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


const AllNotifications = props => {

    const { t } = useTranslation()

    const navigate = useNavigate()

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

    useEffect(() => {
        setLoading(true)
        axios.get(`/notifications?page=${page}&per_page=5`)
            .then(res => {
                setLoading(false)
                setNotifications(currentNotifications => {
                    return [...currentNotifications, ...res.data]
                });
                /* setNotifications(currentNotifications => {
                    return [...currentNotifications, ...res.data.data]
                });
                if (res.data.meta.last_page === page) {
                    setLastPage(true)
                } */
            })
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [page])


    const handleNotifaicationClick = (id, type) => {
        // request to make the notification status to be read
        const notificationIndex = notifications.findIndex(notification => notification.id === id)
        const updatedNotifications = [...notifications]
        navigate(`${id}`)
        if(updatedNotifications[notificationIndex].read_at) return;
        updatedNotifications[notificationIndex].read_at = moment().format()
        axios.post(`/notifications/${id}/read`)
            .then(res => {
                //console.log(err);
            }).catch(err => {
                //console.log(err);
            })
    }



    let content;

    if (loading) {
        content = <Loader />
    }

    if (notifications.length === 0) {
        content = <ListItem sx={{ justifyContent: 'center' }} >{t('No notifications')}</ListItem>
    }

    if (notifications.length > 0) {
        content = (
            <Fragment>
                {notifications.map((notification, index) => {
                    const mySafeHTML = DOMPurify.sanitize(notification.message);
                    if (notifications.length === (index + 1)) {
                        return (
                            <Grid item key={notification.id} xs={12} sm={6} md={4} >
                                <CustomCard ref={lastElementRef} $unread={!notification.read_at} onClick={() => handleNotifaicationClick(notification.id, notification.type)} >
                                    <ListItemText primary={notification.title} secondary={<span dangerouslySetInnerHTML={{ __html: mySafeHTML }} /> } />
                                    <Typography variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }} >
                                        <bdi>{moment(notification.created_at).fromNow()}</bdi>
                                    </Typography>
                                </CustomCard>
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item key={notification.id} xs={12} sm={6} md={4} >
                                <CustomCard $unread={!notification.read_at} onClick={() => handleNotifaicationClick(notification.id, notification.type)} >
                                    <ListItemText primary={notification.title} secondary={<span dangerouslySetInnerHTML={{ __html: mySafeHTML }} />} />
                                    <Typography variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }} >
                                        <bdi>{moment(notification.created_at).fromNow()}</bdi>
                                    </Typography>
                                </CustomCard>
                            </Grid>
                        )
                    }
                })}
            </Fragment>
        )
    }


    return (
        <Fragment>
            <Grid container spacing={2} >
                {content}
            </Grid>
            <Outlet />
        </Fragment>
    )
}
export default AllNotifications;