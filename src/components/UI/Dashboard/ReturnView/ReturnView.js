import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import moment from 'moment';
import { Fragment, useContext } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
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
const ReturnButton = styled.div`
    position: absolute;
    top: 9px;
    right: 13px;
`
const ReturnInfos = styled.div`
    display: inline-flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 20px;
`
const ReturnAppointment = styled.div`
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
const ReturnStatus = styled.div`
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
    &.pending {
        border-color: ${({ theme }) => theme.palette.secondary.dark};
        color: ${({ theme }) => theme.palette.secondary.dark};
    }
    &.completed {
        border-color: ${({ theme }) => theme.palette.success.main};
        color: ${({ theme }) => theme.palette.success.main};
    }
`
const ReturnContent = styled.div`
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


const ReturnView = props => {

    const { t } = useTranslation()

    const { returned, onClick } = props;

    const authCtx = useContext(AuthContext)
    const { roleName } = authCtx;

    let content = (
        <CustomCardMui>
            <ReturnInfos>
                <Skeleton variant="rectangular" width={130} height={130} sx={{ borderRadius: '8px' }} />
            </ReturnInfos>
            <ReturnContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </ReturnContent>
        </CustomCardMui>
    );
    if (returned) {
        let name = returned.user.name
        let email = returned.user.email
        let mobile = returned.user.mobile

        content = (
            <CustomCardMui onClick={onClick} >
                <ReturnButton>
                    <IconButton size="medium" >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </ReturnButton>
                <ReturnInfos>
                    <ReturnAppointment className='canceled' >
                        <ul>
                            <li className="id" >{`# ${returned.id}`}</li>
                            <li><EventNoteIcon sx={{ mr: 1 }} />{returned.date}</li>
                            <li><WatchLaterIcon sx={{ mr: 1 }} />{moment.utc(returned.date_time).format('hh:mm A')}</li>
                        </ul>
                    </ReturnAppointment>
                    <ReturnStatus className={returned.payment_status}>
                        {t(returned.payment_status)}
                    </ReturnStatus>
                </ReturnInfos>
                <ReturnContent>
                    <ClientName>{name}</ClientName>
                    <ClientInfo>
                        {email && <li><MailIcon sx={{ mr: 1 }} />{email}</li>}
                        {mobile && <li><PhoneAndroidIcon sx={{ mr: 1 }} />{mobile}</li>}
                        <li>{`${t('returned from booking #')} ${returned.booking_id}`}</li>
                    </ClientInfo>
                </ReturnContent>
            </CustomCardMui>
        )
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
export default ReturnView;