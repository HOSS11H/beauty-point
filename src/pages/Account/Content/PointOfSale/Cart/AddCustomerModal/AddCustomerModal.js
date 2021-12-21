import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';


const CustomTextField = styled(TextField)`
    width: 100%;
`


const AddCustomerModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose  } = props;

    const { t } = useTranslation();

    const [customerName, setCustomerName] = useState('');
    const [customerNameError, setCustomerNameError] = useState(false);

    const [customerNumber, setCustomerNumber] = useState('');
    const [customerNumberError, setCustomerNumberError] = useState(false);
    
    const customerNameChangeHandler = (event) => {
        setCustomerName(event.target.value);
        setCustomerNameError(false);
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
            mobile: customerNumber
        }

        onConfirm(data);
        
        setCustomerName('');
        setCustomerNumber('');

    }, [customerName, customerNumber, onConfirm])
    
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmAddHandler} onClose={closeModalHandler} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="customer-name" label={t('name')} variant="outlined" value={customerName} onChange={customerNameChangeHandler} />
                    {customerNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6} >
                    <CustomTextField id="customer-number" label={t('mobile number')} variant="outlined" value={customerNumber} onChange={customerNumberChangeHandler} />
                    {customerNumberError && <ValidationMessage notExist>{t(`Please add number`)}</ValidationMessage>}
                </Grid>
            </Grid>
        </CustomModal>
    )
}



export default AddCustomerModal;