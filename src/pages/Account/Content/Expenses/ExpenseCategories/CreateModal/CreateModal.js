import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../store/theme-context'

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';


import { connect } from 'react-redux';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';

const CustomTextField = styled(TextField)`
    width: 100%;
`


const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, creatingExpenseCategorySuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [expenseName, setExpenseName] = useState('');
    const [expenseNameError, setExpenseNameError] = useState(false);




    const expenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value);
        setExpenseNameError(false);
    }


    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);


    const resetModalData = useCallback(() => {
        setExpenseName('');
        setExpenseNameError(false);
    }, [])

    useEffect(() => {
        creatingExpenseCategorySuccess && resetModalData();
    }, [creatingExpenseCategorySuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }

        const data = {
            name: expenseName,
        }
        onConfirm(data);
    }, [expenseName, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="category-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
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

const mapStateToProps = (state) => {
    return {
        creatingExpenseCategorySuccess: state.expenses.creatingExpenseCategorySuccess,
    }
}

export default connect(mapStateToProps, null)(CreateModal);