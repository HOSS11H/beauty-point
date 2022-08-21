import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled from 'styled-components';
import { POSModal } from "../../../../../../../../components/UI/POSModal/POSModal";
import axios from "../../../../../../../../utils/axios-instance";
const CustomTextField = styled(TextField)`
    width: 100%;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const AddCustomer = props => {

    const { open, handleClose, addCustomer } = props;
    const { t } = useTranslation()

    const [submitting, setSubmitting] = useState(false)

    const [customerName, setCustomerName] = useState('');
    const [customerNameError, setCustomerNameError] = useState(false);

    const [customerEmail, setCustomerEmail] = useState('');
    const [customerEmailError, setCustomerEmailError] = useState(false);

    const [customerNumber, setCustomerNumber] = useState('');
    const [customerNumberError, setCustomerNumberError] = useState(false);

    const customerNameChangeHandler = (event) => {
        setCustomerName(event.target.value);
        setCustomerNameError(false);
    }
    const customerEmailChangeHandler = (event) => {
        setCustomerEmail(event.target.value);
        setCustomerEmailError(false);
    }
    const customerNumberChangeHandler = (event) => {
        setCustomerNumber(event.target.value);
        setCustomerNumberError(false);
    }

    const AddCustomerHandler = useCallback(() => {
        if (customerName.trim().length === 0) {
            setCustomerNameError(true);
            return;
        }
        if (customerNumber.trim().length === 0) {
            setCustomerNumberError(true);
            return;
        }
        setSubmitting(true)
        const data = {
            name: customerName,
            email: customerEmail,
            mobile: customerNumber
        }
        axios.post(`/vendors/customers`, data)
            .then(res => {
                addCustomer({
                    value: res.data.id,
                    label: res.data.name,
                    mobile: res.data.mobile,
                })
                handleClose()
            })
            .catch(err => {
                setSubmitting(false);
                const errs = err.response.data ? err.response.data.errors : { message: [err.response.data.message] };
                for (let key in errs) {
                    toast.error(errs[key][0])
                }
            })
    }, [addCustomer, customerEmail, customerName, customerNumber, handleClose])

    return (
        <POSModal open={open} handleClose={handleClose} heading='Add Customer' >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <CustomTextField id="customer-name" label={t('name')}
                        variant="outlined" value={customerName} onChange={customerNameChangeHandler}
                        error={customerNameError} helperText={customerNameError && t(`Please add name`)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField id="customer-email" label={t('email')} variant="outlined"
                        value={customerEmail} onChange={customerEmailChangeHandler}
                        error={customerEmailError} helperText={customerNumberError && t(`Please add email`)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <CustomTextField id="customer-number" type='number' label={t('mobile number')}
                        variant="outlined" value={customerNumber} onChange={customerNumberChangeHandler}
                        error={customerNumberError} helperText={customerNumberError && t(`Please add number`)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Actions>
                        <LoadingButton loading={submitting} variant='contained' color='secondary' onClick={AddCustomerHandler} >{t('Add')}</LoadingButton>
                        <Button variant='text' onClick={handleClose} >{t('close')}</Button>
                    </Actions>
                </Grid>
            </Grid>
        </POSModal>
    )
}
export default AddCustomer;