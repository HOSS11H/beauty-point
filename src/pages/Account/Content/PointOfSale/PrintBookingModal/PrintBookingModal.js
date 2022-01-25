import { Backdrop, Card, Fade, Grid, Modal } from "@mui/material";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styled from 'styled-components';
import { CustomButton } from "../../../../../components/UI/Button/Button";
import Loader from "../../../../../components/UI/Loader/Loader";
import PrintIcon from '@mui/icons-material/Print';
import Invoice from "../../Bookings/ViewModal/Invoice/Invoice";
import { useState } from "react";
import v2 from '../../../../../utils/axios-instance';
import v1 from '../../../../../utils/axios-instance-v1';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useCallback } from "react";


const CustomContainer = styled(Grid)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    outline: none;
`

export const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        margin-bottom:0;
    }
`

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

const PrintBookingModal = props => {

    const { t } = useTranslation()

    const { show, onClose, bookingData, reset } = props;

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
        const qrCodeEndpoint = `${v2.defaults.baseURL}/vendors/bookings/${bookingData.id}/qr`;

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
        setUserData(null);
        setQrCode(null);
        reset();
    }

    let content = (
        <Loader height='300px' />
    )

    if (!loading && bookingData.id) {
        content = (
            <Wrapper>
                <Message>{t('Your order has been booked successfully')}</Message>
                <ActionButton onClick={handlePrint}  ><PrintIcon />{t('print')}</ActionButton>
                {qrCode && <Invoice userData={userData} ref={invoiceRef} bookingData={bookingData} qrCode={qrCode} />}
            </Wrapper>
        )
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={show}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={show}>
                <CustomContainer container>
                    <Grid item xs={12} sm={2} md={2} />
                    <Grid item xs={12} sm={8} md={8}>
                        <CustomCardMui>
                            {content}
                        </CustomCardMui>
                    </Grid>
                </CustomContainer>
            </Fade>
        </Modal>
    )
}
export default PrintBookingModal;