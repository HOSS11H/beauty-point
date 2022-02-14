import { useState,  useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../../store/theme-context'

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

    const {name , mobile } = expenseData;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [expenseName, setExpenseName] = useState(name);
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [bankNumber, setBankNumber] = useState(mobile);
    const [bankNumberError, setBankNumberError] = useState(false);

    const expenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value);
        setExpenseNameError(false);
    }
    const bankNumberChangeHandler = (event) => {
        setBankNumber(event.target.value);
        setBankNumberError(false);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }
        if ( bankNumber.trim().length === 0) {
            setBankNumberError(true);
            return;
        }
        const data = {
            id: id,
            name: expenseName,
            mobile: bankNumber
        }
        onConfirm(data);
        //console.log(data);
    }, [bankNumber, expenseName, id, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
                {expenseNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <CustomTextField id="bank-number" label={t('mobile number')} variant="outlined" value={bankNumber} onChange={bankNumberChangeHandler} />
                {bankNumberError && <ValidationMessage notExist>{t(`Please add number`)}</ValidationMessage>}
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