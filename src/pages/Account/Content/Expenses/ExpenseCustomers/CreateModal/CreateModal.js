import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';


import { connect } from 'react-redux';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';

const CustomTextField = styled(TextField)`
    width: 100%;
`


const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, creatingExpenseCustomerSuccess } = props;

    const { t } = useTranslation();

    const [expenseName, setExpenseName] = useState('');
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [customerNumber, setCustomerNumber] = useState('');
    const [customerNumberError, setCustomerNumberError] = useState(false);




    const expenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value);
        setExpenseNameError(false);
    }

    const customerNumberChangeHandler = (event) => {
        setCustomerNumber(event.target.value);
        setCustomerNumberError(false);
    }


    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);


    const resetModalData = useCallback(() => {
        setExpenseName('');
        setExpenseNameError(false);
        setCustomerNumber('');
        setCustomerNumberError(false);
    }, [])

    useEffect(() => {
        creatingExpenseCustomerSuccess && resetModalData();
    }, [creatingExpenseCustomerSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }
        if ( customerNumber.trim().length === 0) {
            setCustomerNumberError(true);
            return;
        }

        const data = {
            name: expenseName,
            mobile: customerNumber
        }
        onConfirm(data);
    }, [customerNumber, expenseName, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="customer-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
                {expenseNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <CustomTextField id="customer-number" type='number' label={t('mobile number')} variant="outlined" value={customerNumber} onChange={customerNumberChangeHandler} />
                {customerNumberError && <ValidationMessage notExist>{t(`Please add number`)}</ValidationMessage>}
            </Grid>
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

const mapStateToProps = (state) => {
    return {
        creatingExpenseCustomerSuccess: state.expenses.creatingExpenseCustomerSuccess,
    }
}

export default connect(mapStateToProps, null)(CreateModal);