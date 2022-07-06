import { Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { onMessageListener } from '../../firebase';
import AuthContext from '../../store/auth-context';
import {useNavigate} from 'react-router-dom';

const NotificationTitle = styled(Typography)`
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
`
const NotificationDesc = styled(Typography)`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
`

function ToastDisplay({ notification, clickHandler }) {
    return (
        <div onClick={clickHandler} >
            <NotificationTitle><b>{notification?.title}</b></NotificationTitle>
            <NotificationDesc variant='caption' >{notification?.body}</NotificationDesc>
        </div>
    );
};

const Notification = () => {

    const authCtx = useContext(AuthContext)

    const navigate = useNavigate()

    const [notification, setNotification] = useState({ title: '', body: '' });


    const handleNotifaicationClick = useCallback((id, type) => {
        // request to make the notification status to be read
        if( authCtx.isLoggedIn ) {
            navigate(`/account/bookings`)
        }
    }, [authCtx.isLoggedIn, navigate])

    const notify = useCallback(() => toast(<ToastDisplay clickHandler={handleNotifaicationClick} notification={notification} />, {
        toastId: notification.id,
        position: 'bottom-center'
    }), [handleNotifaicationClick, notification]);

    useEffect(() => {
        if (notification?.title && notification?.title !== '' ) {
            notify()
        }
    }, [notification, notify])

    onMessageListener()
        .then((payload) => {
            setNotification({ id: payload.messageId, title: payload?.notification?.title, body: payload?.notification?.body });
        })
        .catch((err) => console.log('failed: ', err));

    return (
        <></>
    )
}

export default Notification