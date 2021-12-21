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

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedExpensesCategories } = props;

    const selectedExpenseIndex = fetchedExpensesCategories.data.findIndex(expense => expense.id === id);

    let expenseData = fetchedExpensesCategories.data[selectedExpenseIndex];

    const {name   } = expenseData;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [expenseName, setExpenseName] = useState(name);
    const [expenseNameError, setExpenseNameError] = useState(false);



    const expenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value);
        setExpenseNameError(false);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }
        const data = {
            id: id,
            name: expenseName,
        }
        onConfirm(data);
        console.log(data);
    }, [expenseName, id, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
                {expenseNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
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