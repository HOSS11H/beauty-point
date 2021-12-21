import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../store/theme-context'

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
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
import { fetchLocations, fetchServicesByLocation } from '../../../../../../store/actions/index';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { format } from 'date-fns';
import axios from '../../../../../../utils/axios-instance';


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

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedExpenses } = props;

    const selectedExpenseIndex = fetchedExpenses.data.findIndex(expense => expense.id === id);

    let expenseData = fetchedExpenses.data[selectedExpenseIndex];

    const {name, notes, amount, expense_date, bank_name, bank_account, category, customer   } = expenseData;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [expenseName, setExpenseName] = useState(name);
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [date, setDate] = useState(new Date(expense_date));

    const [expenseBank, setExpenseBank] = useState(bank_name);
    const [expenseBankError, setExpenseBankError] = useState(false);

    const [expenseAccount, setExpenseAccount] = useState(bank_account);
    const [expenseAccountError, setExpenseAccountError] = useState(false);

    const [categoriesOptions, setCategoriesOptions] = useState([{value: category.id, label: category.name}]);

    const [selectedCategory, setSelectedCategory] = useState({value: category.id, label: category.name});
    const [selectedCategoryError, setSelectedCategoryError] = useState(false);

    const [agentsOptions, setAgentsOptions] = useState([{value: customer.id, label: customer.name}])

    const [selectedAgent, setSelectedAgent] = useState({value: customer.id, label: customer.name});
    const [selectedAgentError, setSelectedAgentError] = useState(false);

    const html = notes;
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))
    const [expenseDescriptionError, setExpenseDescriptionError] = useState(false);

    const [expenseAmount, setExpenseAmount] = useState(amount);
    const [expenseAmountError, setExpenseAmountError] = useState(false);


    const expenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value);
        setExpenseNameError(false);
    }
    const handleDateChange = (date) => {
        setDate(date);
    }
    const expenseBankChangeHandler = (event) => {
        setExpenseBank(event.target.value);
        setExpenseBankError(false);
    }
    const expenseAccountChangeHandler = (event) => {
        setExpenseAccount(event.target.value);
        setExpenseAccountError(false);
    }

    const expenseAmountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setExpenseAmount(event.target.value);
            setExpenseAmountError(false);
        }
    }
    const handleSelectCategoryOptions = (value, actions) => {
        if (value.length !== 0) {
            axios.get(`/vendors/expenses_categories`)
                .then(res => {
                    const categories = res.data.data;
                    const options = categories.map(category => {
                        return {
                            value: category.id,
                            label: category.name
                        }
                    })
                    setCategoriesOptions(options);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    const handleSelectCategory = (value, actions) => {
        if (value) {
            setSelectedCategory(value);
            setSelectedCategoryError(false);
        }
    }

    const handleSelectAgentOptions = (value, actions) => {
        if (value.length !== 0) {
            axios.get(`/vendors/expenses_customers`)
                .then(res => {
                    const categories = res.data.data;
                    const options = categories.map(category => {
                        return {
                            value: category.id,
                            label: category.name
                        }
                    })
                    setAgentsOptions(options);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    const handleSelectAgent = (value, actions) => {
        if (value) {
            setSelectedAgent(value);
            setSelectedAgentError(false);
        }
    }


    const onEditorChange = newState => {
        setEditorState(newState);
        setExpenseDescriptionError(false);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }
        if (expenseBank.trim().length === 0) {
            setExpenseBankError(true);
            return;
        }
        if (expenseAccount.trim().length === 0) {
            setExpenseAccountError(true);
            return;
        }
        if (!selectedCategory) {
            setSelectedCategoryError(true);
            return;
        }
        if (!selectedAgent) {
            setSelectedAgentError(true);
            return;
        }
        if (editorState.getCurrentContent().hasText() === false) {
            setExpenseDescriptionError(true);
            return;
        }
        if (expenseAmount === 0) {
            setExpenseAmountError(true);
            return;
        }
        const data = {
            id: id,
            name: expenseName,
            note: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            amount: expenseAmount,
            expense_date: format(date, 'Y-M-dd hh:ii a'),
            bank_name: expenseBank,
            bank_account: expenseAccount,
            cat_id: selectedCategory.value,
            customer_id: selectedAgent.value,
        }
        onConfirm(data);
        console.log(data);
    }, [expenseName, expenseBank, expenseAccount, selectedCategory, selectedAgent, editorState, expenseAmount, id, date, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
                {expenseNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                        label={t("Date from")}
                        inputFormat="MM/dd/yyyy"
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-bank" label={t('bank')} variant="outlined" value={expenseBank} onChange={expenseBankChangeHandler} />
                {expenseBankError && <ValidationMessage notExist>{t(`Please add bank`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-account" label={t('bank account')} variant="outlined" value={expenseAccount} onChange={expenseAccountChangeHandler} />
                {expenseAccountError && <ValidationMessage notExist>{t(`Please add account`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select category')}</FormLabel>
                <FormControl fullWidth sx={{ minWidth: '200px' }} >
                    <ReactSelect options={categoriesOptions} isClearable isRtl={lang === 'ar'} defaultValue={{value: category.id, label: category.name}}
                        onChange={handleSelectCategory} onInputChange={handleSelectCategoryOptions} />
                </FormControl>
                {selectedCategoryError && <ValidationMessage notExist>{t(`Please select category`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select agent')}</FormLabel>
                <FormControl fullWidth sx={{ minWidth: '200px' }} >
                    <ReactSelect options={agentsOptions} isClearable isRtl={lang === 'ar'} defaultValue={{value: customer.id, label: customer.name}}
                        onChange={handleSelectAgent} onInputChange={handleSelectAgentOptions} />
                </FormControl>
                {selectedAgentError && <ValidationMessage notExist>{t(`Please select agent`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12}>
                <EditorWrapper>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorChange}
                        textAlignment={themeCtx.direction === 'rtl' ? 'right' : 'left'}
                    />
                </EditorWrapper>
                {expenseDescriptionError && <ValidationMessage notExist>{t(`Please add Description`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="expense-amount" type='number' label={t('amount')} variant="outlined" value={expenseAmount} onChange={expenseAmountChangeHandler} />
                {expenseAmountError && <ValidationMessage notExist>{t(`Please add amount`)}</ValidationMessage>}
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