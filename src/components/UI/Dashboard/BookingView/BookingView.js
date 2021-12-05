import styled from 'styled-components';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Skeleton from '@mui/material/Skeleton';
import { Fragment } from 'react';
import { Grid } from "@mui/material";

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
            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
    &.in.progress {
        background-color: ${({ theme }) => theme.palette.warning.light};
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
    display: block;
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
const BookingItems = styled.ul`
    margin: 0;
    padding: 0;
    margin-top: 10px;
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
            width: 14px;
            height: 14px;
            color: ${({ theme }) => theme.vars.primary};
        }
        .divider {
            margin: 0 5px;
        }
    }
`


const BookingView = props => {

    const { booking, loading, onClick } = props;

    let content = (
        <CustomCardMui>
            <BookingButton>
                <IconButton aria-label="delete" size="large" onClick={onClick}>
                    <RemoveRedEyeIcon />
                </IconButton>
            </BookingButton>
            <BookingInfos>
                <BookingAppointment className={booking.status} >
                    <ul>
                        <li><EventNoteIcon sx={{ mr: 1 }} />{booking.date}</li>
                        <li><WatchLaterIcon sx={{ mr: 1 }} />{booking.time}</li>
                    </ul>
                </BookingAppointment>
                <BookingStatus className={booking.status}>
                    {booking.status}
                </BookingStatus>
            </BookingInfos>
            <BookingContent>
                <ClientName>{booking.user.name}</ClientName>
                <ClientInfo>
                    <li><MailIcon sx={{ mr: 1 }} />{booking.user.email}</li>
                    <li><PhoneAndroidIcon sx={{ mr: 1 }} />{booking.user.mobile}</li>
                </ClientInfo>
                <BookingItems>
                    {
                        booking.items.map((item, index) => {
                            let loadedItems;
                            if (item) {
                                loadedItems = (
                                    <li key={item.id} >
                                        <FiberManualRecordIcon sx={{ mr: 1 }} />
                                        <span>{item.quantity}</span>
                                        <span className='divider'>x</span>
                                        <span>{item.item.name}</span>
                                    </li>
                                )
                            }
                            return loadedItems
                        })
                    }
                </BookingItems>
            </BookingContent>
        </CustomCardMui>
    );
    if (loading) {
        content = (
            <CustomCardMui>
                <BookingInfos>
                    <Skeleton variant="rectangular" width={130} height={130} sx={{ borderRadius: '8px' }}   />
                </BookingInfos>
                <BookingContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
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