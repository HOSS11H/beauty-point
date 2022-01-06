import { Button } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import Invoice from "../../../Account/Content/Bookings/ViewModal/Invoice/Invoice";
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import axios from "../../../../utils/axios-instance";
import Loader from "../../../../components/UI/Loader/Loader";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { CustomButton } from "../../../../components/UI/Button/Button";

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

const PrintBooking = props => {

    const {t} = useTranslation()

    const { bookingData, userData, handleBookingDone } = props;

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
                    console.log(err);
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
                <Message>{t('Your order has been booked successfully')}</Message>
                <ActionButton onClick={printBookingHandler}  ><PrintIcon/>{t('print')}</ActionButton>
                <Invoice userData={modifiedUserData} ref={invoiceRef} bookingData={bookingData} qrCode={qrCode} />
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