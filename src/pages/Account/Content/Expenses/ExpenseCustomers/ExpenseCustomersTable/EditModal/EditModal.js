import { useState,  useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomModal } from '../../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ValidationMessage from '../../../../../../../components/UI/ValidationMessage/ValidationMessage';


const CustomTextField = styled(TextField)`
    width: 100%;
`

const EditModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedExpensesCustomers } = props;

    const selectedExpenseIndex = fetchedExpensesCustomers.data.findIndex(expense => expense.id === id);

    let expenseData = fetchedExpensesCustomers.data[selectedExpenseIndex];

    const {name , mobile } = expenseData;

    const { t } = useTranslation();

    const [expenseName, setExpenseName] = useState(name);
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [customerNumber, setCustomerNumber] = useState(mobile);
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
            id: id,
            name: expenseName,
            mobile: customerNumber
        }
        onConfirm(data);
        //console.log(data);
    }, [customerNumber, expenseName, id, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
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



export default EditModal;