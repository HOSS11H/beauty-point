import styled from 'styled-components';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Fragment, useContext } from 'react';
import { useTranslation } from "react-i18next";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import moment from 'moment';
import AuthContext from '../../../../store/auth-context';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        max-width: 100%;
        margin: auto;
        overflow: hidden;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius:20px;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        display: flex;
        position: relative;
        cursor: pointer;
    }
`
const BookingButton = styled.div`
    position: absolute;
    top: 9px;
    right: 13px;
`
const BookingInfos = styled.div`
    display: inline-flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 20px;
`
const BookingAppointment = styled.div`
    min-width: 70px;
    border-radius: 8px;
    padding: 15px;
    @media screen and (max-width: 899.98px) {
        min-width: unset;
        padding: 5px;
    }
    ul {
        padding: 0;
        margin: 0;
        li {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height:1.5;
            text-transform: capitalize;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.common.white};
            margin-bottom: 5px;
            &:last-child {
                margin-bottom: 0px;
            }
            &.id {
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
            }
            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
    &.in.progress {
        background-color: ${({ theme }) => theme.palette.warning.light};
    }
    &.pending {
        background-color: ${({ theme }) => theme.palette.secondary.dark};
    }
    &.canceled {
        background-color: ${({ theme }) => theme.palette.error.main};
    }
    &.approved {
        background-color: ${({ theme }) => theme.palette.primary.main};
    }
    &.completed {
        background-color: ${({ theme }) => theme.palette.success.main};
    }
`
const BookingStatus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    padding: 0 15px;
    border-radius: 12px;
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    margin-top: 10px;
    border: 2px solid;
    &.in.progress {
        border-color: ${({ theme }) => theme.palette.warning.light};
        color: ${({ theme }) => theme.palette.warning.light};
    }
    &.pending {
        border-color: ${({ theme }) => theme.palette.secondary.dark};
        color: ${({ theme }) => theme.palette.secondary.dark};
    }
    &.canceled {
        border-color: ${({ theme }) => theme.palette.error.main};
        color: ${({ theme }) => theme.palette.error.main};
    }
    &.approved {
        border-color: ${({ theme }) => theme.palette.primary.main};
        color: ${({ theme }) => theme.palette.primary.main};
    }
    &.completed {
        border-color: ${({ theme }) => theme.palette.success.main};
        color: ${({ theme }) => theme.palette.success.main};
    }
`
const BookingContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
const ClientName = styled.a`
    display: flex;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    cursor: pointer;
`
const ClientInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 20px;
            height: 20px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`


const BookingView = props => {

    const { t } = useTranslation()

    const { booking, onClick } = props;

    const authCtx = useContext(AuthContext)
    const { roleName } = authCtx;

    let content = (
        <CustomCardMui>
            <BookingInfos>
                <Skeleton variant="rectangular" width={130} height={130} sx={{ borderRadius: '8px' }} />
            </BookingInfos>
            <BookingContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </BookingContent>
        </CustomCardMui>
    );
    if (booking) {
        let name = booking.user.name
        let email = booking.user.email
        let mobile = booking.user.mobile
        if (booking.source === 'pos' && roleName === 'artist') {
            name = booking.company.companyName
            email = booking.company.companyEmail
            mobile = booking.company.companyPhone
        }
        content = (
            <CustomCardMui onClick={onClick} >
                <BookingButton>
                    <IconButton  size="medium" >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </BookingButton>
                <BookingInfos>
                    <BookingAppointment className={booking.status} >
                        <ul>
                            <li className="id" >{`# ${booking.id}`}</li>
                            <li><EventNoteIcon sx={{ mr: 1 }} />{booking.date}</li>
                            <li><WatchLaterIcon sx={{ mr: 1 }} />{moment.utc(booking.date_time).format('hh:mm A')}</li>
                        </ul>
                    </BookingAppointment>
                    <BookingStatus className={booking.status}>
                        {t(booking.status)}
                    </BookingStatus>
                </BookingInfos>
                <BookingContent>
                    <ClientName>{name}</ClientName>
                    <ClientInfo>
                        {email && <li><MailIcon sx={{ mr: 1 }} />{email}</li>}
                        {mobile && <li><PhoneAndroidIcon sx={{ mr: 1 }} />{mobile}</li>}
                        <li><AlternateEmailIcon sx={{ mr: 1 }} />{t(`via `)}{booking.source}</li>
                    </ClientInfo>
                </BookingContent>
            </CustomCardMui>
        )
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
export default BookingView;