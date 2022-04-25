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
const SeatStatus = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
    margin-right: 20px;
    ${ ( { active } ) => active && css`
        background-color: ${ ( { theme } ) => theme.palette.success.main};
    `}
    ${ ( { inactive } ) => inactive && css`
        background-color: ${ ( { theme } ) => theme.palette.error.main};
    `}
`

const BookingContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
const SeatName = styled.a`
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
const SeatInfo = styled.ul`
    margin: 0;
    padding: 0;
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
    }
`

const SeatCard = props => {

    const { t } = useTranslation()

    const { seat, onClick } = props;

    return (
        <Fragment>
            <CustomCardMui onClick={onClick.bind(null, seat)} >
                <SeatStatus active={seat.status === 'active'} inactive={seat.status === 'inactive'} >
                    {t(seat.status)}
                </SeatStatus>
                <BookingContent>
                    <SeatName>{seat.title}</SeatName>
                    <SeatInfo>
                        <li>{t('location: ')}
                            <span>
                                {seat.location.name}
                            </span>
                        </li>
                        <li>{t('commission: ')}
                            <span>
                                {`${seat.commission} %`}
                            </span>
                        </li>
                    </SeatInfo>
                </BookingContent>
            </CustomCardMui>
        </Fragment>
    )
}
export default SeatCard;