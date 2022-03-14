import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { CustomModal } from "../../../../../../components/UI/Modal/Modal";
import ValidationMessage from "../../../../../../components/UI/ValidationMessage/ValidationMessage";
import styled from 'styled-components';
import { TextField } from "@mui/material";
import axios from '../../../../../../utils/axios-instance'
import { toast } from "react-toastify";
import { formatCurrency } from "../../../../../../shared/utility";

const CustomTextField = styled(TextField)`
    width: 100%;
`

const AddPaymentModal = props => {
    const { show, heading, confirmText, onClose, onConfirm ,remainingAmount, id } = props;

    const { t } = useTranslation();

    const [paidAmount, setPaidAmount] = useState(0)
    const [paidAmountError, setPaidAmountError] = useState(false)

    const [paymentGateway, setPaymentGateway] = useState('cash')

    const [sending, setSending] = useState(false)
    const [success, setSuccess] = useState(false)

    const paidAmountChangeHandler = (event) => {
        const value = +event.target.value;
        if (value >= 0) {
            setPaidAmountError(false)
            setPaidAmount(value)
        }
    }
    const paymentGatewayChangeHandler = (event) => {
        setPaymentGateway(event.target.value);
    }


    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = () => {
        setPaidAmount(0);
        setPaymentGateway('cash');
    }

    useEffect(() => {
        success && resetModalData();
    }, [success])

    const sendData = useCallback((data) => {
        setSending(true);
        setSuccess(false);
        axios.post('/vendors/payments', data)
            .then(res => {
                setSending(false);
                setSuccess(true);
                onConfirm();
            }
            )
            .catch(err => {
                setSending(false);
                setSuccess(false);
                toast.error(t('Error Happened'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [onConfirm])

    const confirmAddHandler = useCallback(() => {
        if (sending) return;
        if (paidAmount > remainingAmount) {
            setPaidAmountError(true);
            return;
        }
        const data = {
            booking_id: id,
            amount: paidAmount,
            gateway: paymentGateway
        }
        sendData(data);
    }, [id, paidAmount, paymentGateway, remainingAmount, sendData, sending])

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmAddHandler} onClose={closeModalHandler} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="customer-name" label={t('amount')} variant="outlined" value={paidAmount} onChange={paidAmountChangeHandler} />
                    {<ValidationMessage exist>{t('remaining amount: ')}{formatCurrency(remainingAmount)}</ValidationMessage>}
                    {paidAmountError && <ValidationMessage notExist>{t(`the amount is greater than remaining amount`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="payment-label">{t('payment method')}</InputLabel>
                        <Select
                            label={t('payment method')}
                            labelId="payment-label"
                            value={paymentGateway}
                            onChange={paymentGatewayChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='cash'>{t('cash')}</MenuItem>
                            <MenuItem value='card'>{t('card')}</MenuItem>
                            <MenuItem value='transfer'>{t('transfer')}</MenuItem>
                            <MenuItem value='online'>{t('online')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </CustomModal>
    )
}
export default AddPaymentModal;