import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../store/theme-context'

import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

import ImageUploading from 'react-images-uploading';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import { fetchEmployees, fetchLocations, fetchCategories } from '../../../../../store/actions/index';
import { formatCurrency } from '../../../../../shared/utility';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';


const CustomTextField = styled(TextField)`
    width: 100%;
`
const CustomFormGroup = styled.div`
    display: flex;
    align-items: center;
`

const PriceCalculation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    p {
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
    }
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



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

function getStyles(selected, items, theme) {
    const selectedIndex = items.findIndex(name => name.id === selected.id);
    return {
        fontWeight:
            selectedIndex === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, fetchedEmployees, fetchedLocations, fetchedCategories, fetchEmployeesHandler, fetchLocationsHandler, fetchCategoriesHandler, creatingServiceSuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [serviceName, setServiceName] = useState('');
    const [serviceNameError, setServiceNameError] = useState(false);



    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )
    const [serviceDescriptionError, setServiceDescriptionError] = useState(false);

    const [servicePrice, setServicePrice] = useState(0);

    const [serviceDiscount, setServiceDiscount] = useState(0);

    const [discountType, setDiscountType] = useState('percent');

    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [servicePriceError, setServicePriceError] = useState(false);

    const [employeeName, setEmployeeName] = useState([]);

    const [locationName, setLocationName] = useState('');
    const [serviceLocationError, setServiceLocationError] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [serviceCategoryError, setServiceCategoryError] = useState(false);

    const [timeRequired, setTimeRequired] = useState(0);
    const [serviceTimeError, setServiceTimeError] = useState(false);

    const [timeType, setTimeType] = useState('minutes');

    const [serviceStatus, setServiceStatus] = useState('active');

    const [uploadedImages, setUploadedImages] = useState([]);

    const [defaultImage, setDefaultImage] = useState('');
    const [defaultImageError, setDefaultImageError] = useState(false);

    const maxNumber = 69;

    useEffect(() => {
        let netPrice;
        if (discountType === 'percent') {
            netPrice = (servicePrice - (servicePrice * (serviceDiscount / 100))).toFixed(2);
            setPriceAfterDiscount(netPrice > 0 ? netPrice : 0);
            netPrice > 0 ? setServicePriceError(false) : setServicePriceError(true);
        } else if (discountType === 'fixed') {
            netPrice = (servicePrice - serviceDiscount).toFixed(2);
            setPriceAfterDiscount(netPrice > 0 ? netPrice : 0)
            netPrice > 0 ? setServicePriceError(false) : setServicePriceError(true);
        }
    }, [discountType, serviceDiscount, servicePrice])

    useEffect(() => {
        fetchEmployeesHandler(lang);
        fetchLocationsHandler(lang);
        fetchCategoriesHandler(lang);
    }, [fetchCategoriesHandler, fetchEmployeesHandler, fetchLocationsHandler, lang])


    const serviceNameChangeHandler = (event) => {
        setServiceName(event.target.value);
        setServiceNameError(false);
    }

    const onEditorChange = newState => {
        setEditorState(newState);
        setServiceDescriptionError(false);
    }

    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        // data for submit
        setUploadedImages(imageList);
        if (imageList.length === 1) {
            setDefaultImage(imageList[0].data_url);
            setDefaultImageError(false);
        } else {
            setDefaultImage('');
        }
    };
    const defaultImageHandler = (event) => {
        setDefaultImage(event.target.value);
        setDefaultImageError(false);
    };

    const servicePriceChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setServicePrice(event.target.value);
            setServicePriceError(false);
        }
    }
    const serviceDiscountChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setServiceDiscount(event.target.value);
        }
    }
    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }
    const serviceStatusChangeHandler = (event) => {
        setServiceStatus(event.target.value);
    }

    const handleEmployeesChange = (event) => {
        const {
            target: { value },
        } = event;
        setEmployeeName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setLocationName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setServiceLocationError(false);
    };
    const handleCategoryChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategoryName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setServiceCategoryError(false);
    };
    const serviceTimeChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setTimeRequired(event.target.value);
            setServiceTimeError(false);
        }
    }
    const timeTypeChangeHandler = (event) => {
        setTimeType(event.target.value);
    }
    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setServiceName('');
        setServiceNameError(false);
        setEditorState(EditorState.createEmpty());
        setServiceDescriptionError(false);
        setServicePrice(0);
        setServicePriceError(false);
        setServiceDiscount(0);
        setDiscountType('percent');
        setPriceAfterDiscount(0);
        setEmployeeName([]);
        setLocationName('');
        setServiceLocationError(false);
        setCategoryName('');
        setServiceCategoryError(false);
        setTimeRequired(0);
        setServiceTimeError(false);
        setTimeType('minutes');
        setServiceStatus('active');
        setUploadedImages([]);
        setDefaultImage('');
        setDefaultImageError(false);
    }, [])

    useEffect(() => {
        creatingServiceSuccess && resetModalData();
    }, [creatingServiceSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        if ( serviceName.trim().length === 0) {
            setServiceNameError(true);
            return;
        }
        if (editorState.getCurrentContent().hasText() === false) {
            setServiceDescriptionError(true);
            return;
        }

        if ( servicePriceError )   { return; }

        if (locationName === '') {
            setServiceLocationError(true);
            return;
        }
        if (categoryName === '') {
            setServiceCategoryError(true);
            return;
        }
        if (+timeRequired === 0) {
            setServiceTimeError(true);
            return;
        }
        if (defaultImage === '') {
            setDefaultImageError(true);
            return;
        }
        // Data To Add To State
        const employeesData = [];
        employeeName.map(employeeId => {
            const employeeIndex = fetchedEmployees.findIndex(employee => employee.id === employeeId);
            employeesData.push(fetchedEmployees[employeeIndex]);
            return employeesData;
        })

        const selectedCategory = fetchedCategories.find(category => category.id === categoryName);

        const selectedLocation = fetchedLocations.find(location => location.id === locationName);

        const data = {
            name: serviceName,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            price: +servicePrice,
            discount: +serviceDiscount,
            discount_type: discountType,
            discount_price: +priceAfterDiscount,
            time: +timeRequired,
            time_type: timeType,
            category_id: categoryName,
            location_id: locationName,
            employee_ids: employeeName,
            status: serviceStatus,
            images: uploadedImages,
            image: defaultImage,
            users: employeesData,
            category: selectedCategory,
            location: selectedLocation,
        }
        onConfirm(data);
    }, [categoryName, defaultImage, discountType, editorState, employeeName, fetchedCategories, fetchedEmployees, fetchedLocations, locationName, onConfirm, priceAfterDiscount, serviceDiscount, serviceName, servicePrice, servicePriceError, serviceStatus, timeRequired, timeType, uploadedImages])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="service-name" label={t('name')} variant="outlined" value={serviceName} onChange={serviceNameChangeHandler} />
                {serviceNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <Select
                        value={serviceStatus}
                        onChange={serviceStatusChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='active'>{t('active')}</MenuItem>
                        <MenuItem value='inactive'>{t('inactive')}</MenuItem>
                    </Select>
                </FormControl>
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
                {serviceDescriptionError && <ValidationMessage notExist>{t(`Please add Description`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="service-price" type='number' label={t('price')} variant="outlined" value={servicePrice} onChange={servicePriceChangeHandler} />
                {servicePriceError && <ValidationMessage notExist>{t(`Please add Price`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormGroup>
                    <CustomTextField id="service-discount" type='number' label={t('discount')} variant="outlined" value={serviceDiscount} onChange={serviceDiscountChangeHandler} />
                    <FormControl sx={{ minWidth: 120, ml: 1 }}>
                        <Select
                            value={discountType}
                            onChange={discountTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='percent'>{t('percent')}</MenuItem>
                            <MenuItem value='fixed'>{t('Fixed')}</MenuItem>
                        </Select>
                    </FormControl>
                </CustomFormGroup>
            </Grid>
            <Grid item xs={12}>
                <PriceCalculation>
                    <p>{t('price after discount')}</p>
                    <p>{formatCurrency(priceAfterDiscount)}</p>
                </PriceCalculation>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="location-label">{t('location')}</InputLabel>
                    <Select
                        value={locationName}
                        onChange={handleLocationChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                        label={t('location')}
                    >
                        {fetchedLocations.map((location) => (
                            <MenuItem
                                key={location.id}
                                value={location.id}
                            >
                                {location.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {serviceLocationError && <ValidationMessage notExist>{t(`Please add Location`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="categories-label">{t('categories')}</InputLabel>
                    <Select
                        label={t('categories')}
                        value={categoryName}
                        onChange={handleCategoryChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {fetchedCategories.map((category) => (
                            <MenuItem
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {serviceCategoryError && <ValidationMessage notExist>{t(`Please add Category`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormGroup>
                    <CustomTextField id="service-time" type='number' label={t('time')} variant="outlined" value={timeRequired} onChange={serviceTimeChangeHandler} />
                    <FormControl sx={{ minWidth: 120, ml: 1 }}>
                        <Select
                            value={timeType}
                            onChange={timeTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='minutes'>{t('minutes')}</MenuItem>
                            <MenuItem value='hours'>{t('hours')}</MenuItem>
                            <MenuItem value='days'>{t('days')}</MenuItem>
                        </Select>
                    </FormControl>
                </CustomFormGroup>
                {serviceTimeError && <ValidationMessage notExist>{t(`Please add Time`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="employee-label">{t('employee')}</InputLabel>
                    <Select
                        label={t('employee')}
                        labelId="employee-label"
                        id="select-multiple-employees"
                        multiple
                        value={employeeName}
                        onChange={handleEmployeesChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {fetchedEmployees.length > 0 && selected.map((value) => {
                                    const selected = fetchedEmployees.find(user => user.id === value);
                                    return (
                                        <Chip key={selected.id} label={selected.name} />
                                    )
                                })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {fetchedEmployees.map((employee) => (
                            <MenuItem
                                key={employee.id}
                                value={employee.id}
                                style={getStyles(employee, employeeName, themeCtx.theme)}
                            >
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <ImageUploading
                    multiple
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
                                <RadioGroup
                                    aria-label="gender"
                                    name="controlled-radio-buttons-group"
                                    value={defaultImage}
                                    onChange={defaultImageHandler}
                                    sx={{ width: '100%' }}
                                >
                                    <Grid container sx={{ width: '100%' }} spacing={2} >
                                        {imageList.map((image, index) => (
                                            <Grid item xs={12} sm={6} key={index} >
                                                <div style={{ width: '100%' }} >
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <ImageItemBottomBar>
                                                        <FormControlLabel value={image['data_url']} control={<Radio />} label="Default" />
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
                                </RadioGroup>
                            </UploadImageBody>
                            <UploadImageTopBar>
                                <Button size="medium" sx={{ mr: 2, color: isDragging && 'red' }} variant="contained" startIcon={<PhotoCamera />} {...dragProps} onClick={onImageUpload} >
                                    {t('upload')}
                                </Button>
                                <Button size="medium" variant="outlined" startIcon={<DeleteIcon />} onClick={onImageRemoveAll}>
                                    {t('Remove all')}
                                </Button>
                            </UploadImageTopBar>
                        </div>
                    )}
                </ImageUploading>
                {defaultImageError && <ValidationMessage notExist>{t(`Please add default Image`)}</ValidationMessage>}
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
        fetchedEmployees: state.employees.employees,
        fetchedLocations: state.locations.locations,
        fetchedCategories: state.categories.categories,
        creatingServiceSuccess: state.services.creatingServiceSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployeesHandler: (lang) => dispatch(fetchEmployees(lang)),
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
        fetchCategoriesHandler: (lang) => dispatch(fetchCategories(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);
