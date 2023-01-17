import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import v2 from '../../../../../../../../utils/axios-instance';
import v1 from '../../../../../../../../utils/axios-instance-v1';
import { useReactToPrint } from "react-to-print";
import Loader from "../../../../../../../../components/UI/Loader/Loader";
import styled from 'styled-components';
import { Button } from "@mui/material";
import ReturnInvoice from "../../../../../../../../components/ReturnInvoice/ReturnInvoice";
import PrintIcon from '@mui/icons-material/Print';
import { Fragment } from "react";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 200px;
    flex-direction: column;
`
const Message = styled.p`
    font-size: 22px;
    line-height: 1.4;
    margin-bottom: 23px;
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.vars.primary};
`

const PrintBooking = (props) => {
    const { t } = useTranslation()

    const { bookingData } = props;

    const [qrCode, setQrCode] = useState(null);
    const [userData, setUserData] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(() => {
        setLoading(true);
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const userDataEndpoint = `${v1.defaults.baseURL}/auth/me`;
        const qrCodeEndpoint = `${v2.defaults.baseURL}/vendors/returns/${bookingData.id}/qr`;

        const getUserData = axios.get(userDataEndpoint, headers);
        const getQrCode = axios.get(qrCodeEndpoint, headers);

        axios.all([getUserData, getQrCode])
            .then(axios.spread((...responses) => {
                setUserData(responses[0].data);
                setQrCode(responses[1].data.data);
                setLoading(false);
            }))
            .catch(error => {
                setLoading(false);
            });
    }, [bookingData.id])

    useEffect(() => {
        if (bookingData.id && !userData && !qrCode) {
            fetchData();
        }
    }, [bookingData.id, fetchData, qrCode, userData]);

    const invoiceRef = useRef();

    const printBookingHandler = useReactToPrint({
        content: () => invoiceRef.current,
    });

    const handlePrint = () => {
        printBookingHandler();
    }

    let content = (
        <Loader height='300px' />
    )

    if (!loading && bookingData.id) {
        content = (
            <Wrapper>
                <Message>{t('Your order has been booked successfully')}</Message>
                <Button onClick={handlePrint} color='secondary' variant='contained' ><PrintIcon />{t('print')}</Button>
                {qrCode && <ReturnInvoice userData={userData} ref={invoiceRef} data={bookingData} qrCode={qrCode} />}
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