import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

const CustomBooking= styled.div`
    display: flex;
    align-items: center;
`
const BookingIcon= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 8px;
    color: ${({theme})=>theme.palette.common.white};
    flex-shrink: 0;
    margin-right: 20px;
    svg {
        width: 34px;
        height: 34px;
    }
    ${ ( { completed } ) => completed && css`
        background-color: ${ ( { theme } ) => theme.palette.success.main};
    `}
    ${ ( { pending } ) => pending && css`
        background-color: ${ ( { theme } ) => theme.palette.warning.main};
    `}
    ${ ( { approved } ) => approved && css`
        background-color: ${ ( { theme } ) => theme.palette.info.main};
    `}
    ${ ( { inProgress } ) => inProgress && css`
        background-color: ${ ( { theme } ) => theme.palette.primary.main};
    `}
    ${ ( { canceled } ) => canceled && css`
        background-color: ${ ( { theme } ) => theme.palette.error.main};
    `}
    ${ ( { walkIn } ) => walkIn && css`
        background-color: ${ ( { theme } ) => theme.palette.grey[700]};
    `}
    ${ ( { online } ) => online && css`
        background-color: ${ ( { theme } ) => theme.palette.info.light};
    `}
    ${ ( { customers } ) => customers && css`
        background-color: ${ ( { theme } ) => theme.palette.grey[900]};
    `}
    ${ ( { earnings } ) => earnings && css`
        background-color: ${ ( { theme } ) => theme.palette.success.dark};
    `}
`
const BookingContent= styled.div`
    flex-grow: 1;
    h5 {
        font-size: 18px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-bottom: 5px;
    }
    h6 {
        font-size: 16px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.secondary};
    }
`



const Booking = ( props ) => {

    const { t } = useTranslation();

    return (
        <CustomBooking>
            <BookingIcon {...props} >
                {props.icon}
            </BookingIcon>
            <BookingContent>
                <h5>{t(props.name)}</h5>
                <h6>{props.num}</h6>
            </BookingContent>
        </CustomBooking>
    );
}
export default Booking