import { Fragment, useEffect, useRef, useState } from "react";
import Invoice from "../../../../../../components/Invoice/Invoice";
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import axios from "../../../../../../utils/axios-instance";
import Loader from "../../../../../UI/Loader/Loader";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { CustomButton } from "../../../../../UI/Button/Button";
import { format } from "date-fns";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 200px;
    flex-direction: column;
`

const ActionButton = styled(CustomButton)`
    &.MuiButton-root {
        width: auto;
        padding: 20px;
        height: 40px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.success.dark};
        font-size: 14px;
        svg {
            width: 14px;
            height: 14px;
            margin-right: 10px;
        }
    }
`
const Message = styled.p`
    font-size: 22px;
    line-height: 1.4;
    margin-bottom: 23px;
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.vars.primary};
`
const BookingInfos = styled.p`
    font-size: 18px;
    line-height: 1.4;
    margin-bottom: 10px;
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.palette.text.primary};
`

const PrintBooking = props => {

    const {t} = useTranslation()

    const { bookingData, userData, handleBookingDone, salonName, appointment, slot } = props;

    const [ qrCode, setQrCode ] = useState(null);

    const [loading , setLoading] = useState(false);

    const modifiedUserData = {
        ...userData,
        user: {
            ...userData.user,
            company: bookingData.company,
        }
    }

    useEffect(() => {
        if ( bookingData.id ) {
            setLoading(true);
            axios.get(`/vendors/bookings/${bookingData.id}/qr`)
                .then(res => {
                    setLoading(false);
                    setQrCode(res.data.data);
                    handleBookingDone();
                })
                .catch(err => {
                    setLoading(false);
                    //console.log(err);
                })
        }
    }, [bookingData.id, handleBookingDone]);

    const invoiceRef = useRef();

    const printBookingHandler = useReactToPrint({
        content: () => invoiceRef.current,
    });

    let content = (
        <Loader height='300px' />
    )

    if ( !loading && bookingData.id ) {
        content = (
            <Wrapper>
                <Message>{`${t('Your order has been booked successfully in ')}${salonName}`}</Message>
                <BookingInfos>{t('Booking Num')} : {bookingData.id}</BookingInfos>
                <BookingInfos>{t('date')} : {format(appointment,'yyyy-MM-dd' )}</BookingInfos>
                <BookingInfos>{t('time')} :{slot}</BookingInfos>
                <ActionButton onClick={printBookingHandler}  ><PrintIcon/>{t('print')}</ActionButton>
                {qrCode && <Invoice userData={modifiedUserData} ref={invoiceRef} data={bookingData} qrCode={qrCode} />}
            </Wrapper>
        )
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default PrintBooking;
