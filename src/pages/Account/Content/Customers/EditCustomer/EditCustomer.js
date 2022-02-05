import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import axios from '../../../../../utils/axios-instance';
import { toast } from 'react-toastify';


const CustomTextField = styled(TextField)`
    width: 100%;
`


const EditCustomer = (props) => {

    const { show, heading, confirmText, onClose, customer  } = props;

    const { t } = useTranslation();

    const [customerName, setCustomerName] = useState(customer.name);
    const [customerNameError, setCustomerNameError] = useState(false);

    const [customerEmail, setCustomerEmail] = useState(customer.email || '');
    const [customerEmailError, setCustomerEmailError] = useState(false);

    const [customerNumber, setCustomerNumber] = useState(customer.mobile || '');
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

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const confirmAddHandler = useCallback(() => {
        if ( customerName.trim().length === 0) {
            setCustomerNameError(true);
            return;
        }
        if ( customerNumber.trim().length === 0) {
            setCustomerNumberError(true);
            return;
        }
        const data = {
            name: customerName,
            email: customerEmail,
            mobile: customerNumber
        }

        axios.put(`/vendors/customers/${customer.id}`, data)
            .then(res => {
                toast.success(t('Customer Details Updated'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
                onClose({ ...data, id: customer.id });
            })
            .catch(err => {
                toast.error(t('Failed Updating Customer Details'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [customer.id, customerEmail, customerName, customerNumber, onClose, t])
    
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmAddHandler} onClose={closeModalHandler} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="customer-name" label={t('name')} variant="outlined" value={customerName} onChange={customerNameChangeHandler} />
                    {customerNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="customer-email" label={t('email')} variant="outlined" value={customerEmail} onChange={customerEmailChangeHandler} />
                    {customerEmailError && <ValidationMessage notExist>{t(`Please add email`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6} >
                    <CustomTextField id="customer-number" label={t('mobile number')} variant="outlined" value={customerNumber} onChange={customerNumberChangeHandler} />
                    {customerNumberError && <ValidationMessage notExist>{t(`Please add number`)}</ValidationMessage>}
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default EditCustomer;