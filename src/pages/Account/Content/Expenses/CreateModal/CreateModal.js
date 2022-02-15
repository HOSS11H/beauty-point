import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../store/theme-context'

import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { Button, Grid, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import ReactSelect from 'react-select';
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
import axios from '../../../../../utils/axios-instance';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBanks from './SearchBanks/SearchBanks';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


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


const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, creatingExpenseSuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [expenseName, setExpenseName] = useState('');
    const [expenseNameError, setExpenseNameError] = useState(false);

    const [date, setDate] = useState(new Date());

    const [bankData, setBankData] = useState(null);
    const [bankDataError, setBankDataError] = useState(false)
    const [resetSearchData, setResetSearchData] = useState(false)

    const [categoriesOptions, setCategoriesOptions] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryError, setSelectedCategoryError] = useState(false);

    const [agentsOptions, setAgentsOptions] = useState([])

    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedAgentError, setSelectedAgentError] = useState(false);

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )
    const [expenseDescriptionError, setExpenseDescriptionError] = useState(false);

    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseAmountError, setExpenseAmountError] = useState(false);

    const [uploadedImages, setUploadedImages] = useState([]);

    const maxNumber = 1;


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

    const selectBank = useCallback((value) => {
        if (value) {
            setBankDataError(false)
            setBankData(value);
        } else {
            setBankDataError(true)
            setBankData(null);
        }
        setResetSearchData(false)
    }, [])

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
                    //console.log(err);
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
                    //console.log(err);
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

    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        // data for submit
        setUploadedImages(imageList);
    };

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);


    const resetModalData = useCallback(() => {
        setBankData(null);
        setBankDataError(false)
        setExpenseName('');
        setExpenseNameError(false);
        setDate(new Date());
        setSelectedCategory(null);
        setSelectedCategoryError(false);
        setSelectedAgent(null);
        setSelectedAgentError(false);
        setExpenseAmount(0);
        setExpenseAmountError(false);
        setExpenseDescriptionError(false);
        setEditorState(EditorState.createEmpty());
        setUploadedImages([]);
        setResetSearchData(false)
        setBankData(null);
        setBankDataError(false)
    }, [])

    useEffect(() => {
        creatingExpenseSuccess && resetModalData();
    }, [creatingExpenseSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {

        if (expenseName.trim().length === 0) {
            setExpenseNameError(true);
            return;
        }
        if (!bankData) {
            setBankDataError(true)
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
        if (expenseAmount === 0) {
            setExpenseAmountError(true);
            return;
        }
        let formData = new FormData();
        formData.append('name', expenseName);
        formData.append('note', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        formData.append('amount', expenseAmount);
        formData.append('expense_date', format(date, 'Y-MM-dd hh:ii a'));
        formData.append('bank_id', bankData.id);
        formData.append('cat_id', selectedCategory.value);
        formData.append('customer_id', selectedAgent.value);
        if (uploadedImages.length > 0) {
            formData.append('image', uploadedImages[0].file)
        }
        onConfirm(formData);
    }, [expenseName, bankData, selectedCategory, selectedAgent, expenseAmount, editorState, date, uploadedImages, onConfirm])

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
            <Grid item xs={12} md={6}>
                <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select bank')}</FormLabel>
                <SearchBanks selectBank={selectBank} resetSearchData={resetSearchData} />
                {bankDataError && <ValidationMessage notExist>{t(`Please Choose Bank`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} md={6}>
                {
                    bankData && (
                        <BankCard>
                            <BankName>{bankData.name}</BankName>
                            <BankInfo>
                                <li><AccountBalanceIcon sx={{ mr: 1 }} />{bankData.account}</li>
                            </BankInfo>
                        </BankCard>
                    )
                }
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select category')}</FormLabel>
                <FormControl fullWidth sx={{ minWidth: '200px' }} >
                    <ReactSelect styles={customStyles} options={categoriesOptions} isClearable isRtl={lang === 'ar'}
                        onChange={handleSelectCategory} onInputChange={handleSelectCategoryOptions} />
                </FormControl>
                {selectedCategoryError && <ValidationMessage notExist>{t(`Please select category`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select agent')}</FormLabel>
                <FormControl fullWidth sx={{ minWidth: '200px' }} >
                    <ReactSelect styles={customStyles} options={agentsOptions} isClearable isRtl={lang === 'ar'}
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