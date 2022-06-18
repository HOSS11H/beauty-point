import { useState, useEffect, useCallback, useContext, Fragment } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../store/theme-context'

import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { Button, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import ReactSelect, { components } from 'react-select';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { format } from 'date-fns';
import axios from 'axios';
import v2 from '../../../../../utils/axios-instance';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Loader from '../../../../../components/UI/Loader/Loader';


const CustomTextField = styled(TextField)`
    width: 100%;
`

const UploadImageTopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const UploadImageBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    max-width: 100%;
    width: 100%;
    img {
        width: 100%;
        height: 150px;
        object-fit: contain;
        max-width: 100%;
    }
`
const ImageItemBottomBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
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
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#000',
    }),
    control: base => ({
        ...base,
        height: 56,
    })
};

const BankCard = styled.div`
    padding: 20px;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
`
const BankName = styled.h4`
    display: flex;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 10px;
`
const BankInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 20px;
            height: 20px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`
const BankSelectOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const BankSelectName = styled.h4`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.dark};
    transition: 0.3s ease-in-out;
    margin-bottom: 0px;
`
const BankSelectInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.default};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 16px;
            height: 16px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`

const Option = (props) => {
    return (
        <Fragment>
            <components.Option {...props}>
                <BankSelectOption>
                    <BankSelectName>{props.children}</BankSelectName>
                    <BankSelectInfo>
                        <li><AccountBalanceIcon sx={{ mr: 1 }} />{props.data.account}</li>
                    </BankSelectInfo>
                </BankSelectOption>
            </components.Option>
        </Fragment>
    );
};


const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, creatingExpenseSuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [expenseName, setExpenseName] = useState('');
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [date, setDate] = useState(new Date());

    const [banksOptions, setBanksOptions] = useState([])
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedBankError, setSelectedBankError] = useState(false)


    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryError, setSelectedCategoryError] = useState(false);


    const [customersOptions, setCustomersOptions] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedCustomerError, setSelectedCustomerError] = useState(false);

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )
    const [expenseDescriptionError, setExpenseDescriptionError] = useState(false);

    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseAmountError, setExpenseAmountError] = useState(false);

    const [paymentGateway, setPaymentGateway] = useState('cash')

    const [uploadedImages, setUploadedImages] = useState([]);

    const [loading, setLoading] = useState(false);

    const maxNumber = 1;

    useEffect(() => {
        setLoading(true);
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const categoryOptionsEndpoint = `${v2.defaults.baseURL}/vendors/expenses_categories`;
        const customersOptionsEndpoint = `${v2.defaults.baseURL}/vendors/expenses_customers`;
        const banksOptionsEndpoint = `${v2.defaults.baseURL}/vendors/banks`;

        const getCategoryOptions = axios.get(categoryOptionsEndpoint, headers);
        const getCustomersOptions = axios.get(customersOptionsEndpoint, headers);
        const getBanksOptions = axios.get(banksOptionsEndpoint, headers);

        axios.all([getCategoryOptions, getCustomersOptions, getBanksOptions])
            .then(axios.spread((...responses) => {
                setLoading(false);
                const categories = responses[0].data.data;
                const categoryOptions = categories.map(category => {
                    return {
                        value: category.id,
                        label: category.name
                    }
                })
                const customers = responses[1].data.data;
                const customersOptions = customers.map(customer => {
                    return {
                        value: customer.id,
                        label: customer.name
                    }
                })
                const banks = responses[2].data.data;
                const banksOptions = banks.map(bank => {
                    return {
                        value: bank.id,
                        label: bank.name,
                        account: bank.account,
                    }
                })
                setCategoriesOptions(categoryOptions);
                setCustomersOptions(customersOptions);
                setBanksOptions(banksOptions);
            }))
            .catch(error => {
                setLoading(false);
            });
    }, [])


    const expenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value);
        setExpenseNameError(false);
    }
    const handleDateChange = (date) => {
        setDate(date);
    }


    const expenseAmountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setExpenseAmount(event.target.value);
            setExpenseAmountError(false);
        }
    }

    const paymentGatewayChangeHandler = (event) => {
        setPaymentGateway(event.target.value);
    }

    const handleSelectBank = (value, actions) => {
        if (value) {
            setSelectedBank(value);
            setSelectedBankError(false);
        }
    }

    const handleSelectCategory = (value, actions) => {
        if (value) {
            setSelectedCategory(value);
            setSelectedCategoryError(false);
        }
    }

    const handleSelectCustomer = (value, actions) => {
        if (value) {
            setSelectedCustomer(value);
            setSelectedCustomerError(false);
        }
    }


    const onEditorChange = newState => {
        setEditorState(newState);
        setExpenseDescriptionError(false);
    }

    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        setUploadedImages(imageList);
    };

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);


    const resetModalData = useCallback(() => {
        setSelectedBank(null);
        setSelectedBankError(false)
        setExpenseName('');
        setExpenseNameError(false);
        setDate(new Date());
        setSelectedCategory(null);
        setSelectedCategoryError(false);
        setSelectedCustomer(null);
        setSelectedCustomerError(false);
        setExpenseAmount(0);
        setExpenseAmountError(false);
        setExpenseDescriptionError(false);
        setEditorState(EditorState.createEmpty());
        setUploadedImages([]);
        setSelectedBank(null);
        setSelectedBankError(false)
        setPaymentGateway('cash')
    }, [])

    useEffect(() => {
        creatingExpenseSuccess && resetModalData();
    }, [creatingExpenseSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }
        if (!selectedBank) {
            setSelectedBankError(true)
            return;
        }
        if (!selectedCategory) {
            setSelectedCategoryError(true);
            return;
        }
        if (!selectedCustomer) {
            setSelectedCustomerError(true);
            return;
        }
        if (expenseAmount === 0) {
            setExpenseAmountError(true);
            return;
        }
        let formData = new FormData();
        formData.append('name', expenseName);
        formData.append('note', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        formData.append('amount', expenseAmount);
        formData.append('expense_date', format(date, 'Y-MM-dd hh:ii a'));
        formData.append('bank_id', selectedBank.value);
        formData.append('cat_id', selectedCategory.value);
        formData.append('customer_id', selectedCustomer.value);
        formData.append('payment_gateway', paymentGateway);
        if (uploadedImages.length > 0 && uploadedImages[0].data_url !== null && uploadedImages[0].file !== undefined) {
            formData.append('image', uploadedImages[0].file)
        }
        onConfirm(formData);
    }, [expenseName, selectedBank, selectedCategory, selectedCustomer, expenseAmount, editorState, date, paymentGateway, uploadedImages, onConfirm])


    let content;

    if (loading) {
        content = <Loader height='50vh' />
    } else {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="expense-name" label={t('name')} variant="outlined" value={expenseName} onChange={expenseNameChangeHandler} />
                    {expenseNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Invoice Date")}
                            inputFormat="MM/dd/yyyy"
                            value={date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select bank')}</FormLabel>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <ReactSelect styles={customStyles} options={banksOptions} isClearable isRtl={lang === 'ar'}
                            components={{ Option }} onChange={handleSelectBank} />
                    </FormControl>
                    {selectedBankError && <ValidationMessage notExist>{t(`Please Choose Bank`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} md={6}>
                    {
                        selectedBank && (
                            <BankCard>
                                <BankName>{selectedBank.label}</BankName>
                                <BankInfo>
                                    <li><AccountBalanceIcon sx={{ mr: 1 }} />{selectedBank.account}</li>
                                </BankInfo>
                            </BankCard>
                        )
                    }
                </Grid>
                <Grid item xs={12} sm={6} >
                    <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select category')}</FormLabel>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <ReactSelect styles={customStyles} options={categoriesOptions} isClearable isRtl={lang === 'ar'}
                            onChange={handleSelectCategory} />
                    </FormControl>
                    {selectedCategoryError && <ValidationMessage notExist>{t(`Please select category`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6} >
                    <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select customer')}</FormLabel>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <ReactSelect styles={customStyles} options={customersOptions} isClearable isRtl={lang === 'ar'}
                            onChange={handleSelectCustomer} />
                    </FormControl>
                    {selectedCustomerError && <ValidationMessage notExist>{t(`Please select customer`)}</ValidationMessage>}
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
                    <CustomTextField id="expense-amount" type='number' label={t('total amount with taxes')} variant="outlined" value={expenseAmount} onChange={expenseAmountChangeHandler} />
                    {expenseAmountError && <ValidationMessage notExist>{t(`Please add amount`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="payment-label">{t('payment method')}</InputLabel>
                        <Select
                            label={t('payment method')}
                            labelId="payment-label"
                            value={paymentGateway}
                            onChange={paymentGatewayChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='cash'>{t('cash')}</MenuItem>
                            <MenuItem value='card'>{t('card')}</MenuItem>
                            <MenuItem value='transfer'>{t('transfer')}</MenuItem>
                            <MenuItem value='online'>{t('online')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <ImageUploading
                        value={uploadedImages}
                        onChange={onImageChangeHandler}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <UploadImageBody>
                                    <Grid container sx={{ width: '100%' }} spacing={2} >
                                        {imageList.map((image, index) => (
                                            <Grid item xs={12} sm={6} key={index} >
                                                <div style={{ width: '100%' }} >
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <ImageItemBottomBar>
                                                        <Button sx={{ mr: 1 }} size="large" variant="outlined" startIcon={<PhotoCamera />} onClick={() => onImageUpdate(index)}>
                                                            {t('update')}
                                                        </Button>
                                                        <IconButton aria-label="delete" size="large" onClick={() => onImageRemove(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ImageItemBottomBar>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </UploadImageBody>
                                <UploadImageTopBar>
                                    <Button size="medium" sx={{ mr: 2, color: isDragging && 'red' }} variant="contained" startIcon={<PhotoCamera />} {...dragProps} onClick={onImageUpload} >
                                        {t('photos')}
                                    </Button>
                                    <Button size="medium" variant="outlined" startIcon={<DeleteIcon />} onClick={onImageRemoveAll}>
                                        {t('Remove all')}
                                    </Button>
                                </UploadImageTopBar>
                            </div>
                        )}
                    </ImageUploading>
                </Grid>
            </Grid>
        )
    }
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

const mapStateToProps = (state) => {
    return {
        creatingExpenseSuccess: state.expenses.creatingExpenseSuccess,
    }
}

export default connect(mapStateToProps, null)(CreateModal);