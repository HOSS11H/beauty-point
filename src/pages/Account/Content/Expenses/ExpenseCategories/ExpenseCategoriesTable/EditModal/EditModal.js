import { useState,  useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../../store/theme-context'

import { CustomModal } from '../../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ReactSelect from 'react-select';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { connect } from 'react-redux';
import { fetchLocations, fetchServicesByLocation } from '../../../../../../../store/actions/index';
import ValidationMessage from '../../../../../../../components/UI/ValidationMessage/ValidationMessage';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { format } from 'date-fns';
import axios from '../../../../../../../utils/axios-instance';


const CustomTextField = styled(TextField)`
    width: 100%;
`


const EditorWrapper = styled.div`
    .rdw-editor-wrapper {
        border-radius: 20px;
        border: 1px solid;
        border-color: ${({ theme }) => theme.palette.divider};
        margin-bottom: 20px;
    }
    .rdw-editor-toolbar {
        border: 0;
        border-bottom: 1px solid;
        border-color: ${({ theme }) => theme.palette.divider};
        border-radius: 20px 20px 0 0;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
    .rdw-editor-main {
        padding: 0 20px 20px;
    }
    .rdw-dropdown-carettoopen {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
    }
    .rdw-dropdown-carettoclose {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
    }
    .rdw-dropdown-selectedtext {
        color: ${({ theme }) => theme.palette.common.black};
        justify-content: space-between;
    }
    .rdw-dropdown-optionwrapper {
        color: ${({ theme }) => theme.palette.common.black};
    }
    .rdw-embedded-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 50%;
        transform: translateX(-50%);
    }
    .rdw-image-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 50%;
        transform: translateX(-50%);
    }
    .rdw-emoji-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 50%;
        transform: translateX(-50%);
    }
    .rdw-link-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 0%;
    }
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