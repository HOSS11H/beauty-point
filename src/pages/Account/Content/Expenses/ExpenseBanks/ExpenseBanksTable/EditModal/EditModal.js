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

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedExpensesBanks } = props;

    const selectedExpenseIndex = fetchedExpensesBanks.data.findIndex(expense => expense.id === id);

    let expenseData = fetchedExpensesBanks.data[selectedExpenseIndex];

    const {name , account } = expenseData;

    const { t } = useTranslation()

    const [expenseName, setExpenseName] = useState(name);
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [bankAccount, setBankAccount] = useState(account);
    const [bankAccountError, setBankAccountError] = useState(false);

    const expenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value);
        setExpenseNameError(false);
    }
    const bankAccountChangeHandler = (event) => {
        setBankAccount(event.target.value);
        setBankAccountError(false);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }
        if ( bankAccount.trim().length === 0) {
            setBankAccountError(true);
            return;
        }
        const data = {
            id: id,
            name: expenseName,
            account: bankAccount
        }
        onConfirm(data);
        //console.log(data);
    }, [bankAccount, expenseName, id, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
                {expenseNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <CustomTextField id="bank-account" type='account' label={t('bank account')} variant="outlined" value={bankAccount} onChange={bankAccountChangeHandler} />
                {bankAccountError && <ValidationMessage notExist>{t(`Please add account number`)}</ValidationMessage>}
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