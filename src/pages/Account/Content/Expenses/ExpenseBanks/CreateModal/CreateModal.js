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

    const { show, heading, confirmText, onConfirm, onClose, creatingExpenseBankSuccess } = props;

    const { t } = useTranslation();

    const [expenseName, setExpenseName] = useState('');
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [bankAccount, setBankAccount] = useState('');
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


    const resetModalData = useCallback(() => {
        setExpenseName('');
        setExpenseNameError(false);
        setBankAccount('');
        setBankAccountError(false);
    }, [])

    useEffect(() => {
        creatingExpenseBankSuccess && resetModalData();
    }, [creatingExpenseBankSuccess, resetModalData])

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
            name: expenseName,
            account: bankAccount
        }
        onConfirm(data);
    }, [bankAccount, expenseName, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="bank-name" label={t('bank name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
                {expenseNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <CustomTextField id="bank-account" label={t('bank account')} variant="outlined" type='number' value={bankAccount} onChange={bankAccountChangeHandler} />
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

const mapStateToProps = (state) => {
    return {
        creatingExpenseBankSuccess: state.expenses.creatingExpenseBankSuccess,
    }
}

export default connect(mapStateToProps, null)(CreateModal);