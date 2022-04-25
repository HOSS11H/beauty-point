import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

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
        @media screen and (max-width: 889.98px) {
            flex-direction: column;
            justify-content: center;
        }
    }
`
const BookingContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
const SeatName = styled.a`
    display: block;
    font-size: 20px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 10px;
    cursor: pointer;
`
const SeatTitle = styled.a`
    display: block;
    font-size: 20px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.success.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 15px;
    cursor: pointer;
`
const SeatInfo = styled.ul`
    margin: 0;
    padding: 0;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
    li {
        display: flex;
        font-size: 16px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        span {
            margin-left: 10px;
            color: ${({ theme }) => theme.palette.secondary.main};
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

const ActionButons = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
`

const ActionButton = styled(LoadingButton)`
    &.MuiLoadingButton-root {
        color: ${({ theme }) => theme.palette.common.white};
        ${({ confirm }) => confirm && css`
        background-color: ${({ theme }) => theme.palette.success.main};
        `}
        ${({ reject }) => reject && css`
            background-color: ${({ theme }) => theme.palette.error.main};
        `}
        &.MuiLoadingButton-loading {
            color: transparent;
        }
    }
`

const SeatRequest = props => {

    const { t } = useTranslation()

    const { request, handleConfirm, handleReject, sendingRequest } = props;

    return (
        <Fragment>
            <CustomCardMui >
                <BookingContent>
                    <SeatName>{request.artist.name}</SeatName>
                    <SeatInfo>
                        {request.artist.mobile && <li><PhoneAndroidIcon sx={{ mr: 1 }} />{request.artist.mobile}</li>}
                        {request.artist.email && <li><MailIcon sx={{ mr: 1 }} />{request.artist.email}</li>}
                        {request.comment && (
                            <li>{t('comment: ')}
                                <span>
                                    {request.comment}
                                </span>
                            </li>
                        )}
                    </SeatInfo>
                    <SeatTitle>{request.seat.title}</SeatTitle>
                    <SeatInfo>
                        <li>{t('location: ')}
                            <span>
                                {request.seat.location.name}
                            </span>
                        </li>
                        <li>{t('commission: ')}
                            <span>
                                {`${request.seat.commission} %`}
                            </span>
                        </li>
                    </SeatInfo>
                    <ActionButons>
                        <ActionButton confirm onClick={handleConfirm.bind(null, request.id)} loading={sendingRequest}>
                            {t('confirm')}
                        </ActionButton>
                        <ActionButton reject onClick={handleReject.bind(null, request.id)} loading={sendingRequest}>
                            {t('reject')}
                        </ActionButton>
                    </ActionButons>
                </BookingContent>
            </CustomCardMui>
        </Fragment>
    )
}
export default SeatRequest;