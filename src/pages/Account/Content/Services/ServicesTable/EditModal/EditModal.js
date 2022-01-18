import ThemeContext from '../../../../../../store/theme-context'
import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { FormLabel, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';

import ImageUploading from 'react-images-uploading';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { connect } from 'react-redux';
import { formatCurrency, updateObject } from '../../../../../../shared/utility';
import { CustomButton } from '../../../../../../components/UI/Button/Button';
import { useReducer } from 'react';
import axios from '../../../../../../utils/axios-instance';
import { Fragment } from 'react';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';


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
    margin-top: 10px;
    margin-bottom: 10px;
    p {
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
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
const BookingActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
`
const ActionButton = styled(CustomButton)`
    &.MuiButton-root {
        margin-right: 20px;
        margin-bottom: 15px;
        width: auto;
        padding: 0 10px;
        height: 30px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.success.main};
        font-size: 14px;
        &:last-child {
            margin-bottom: 15px;
        }
        svg {
            width: 14px;
            height: 14px;
            margin-right: 10px;
        }
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

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_PRODUCTS':
            const updatedProducts = [...state.products]
            updatedProducts.push(action.payload)
            return updateObject(state, {
                products: updatedProducts,
            })
        case 'REMOVE_PRODUCT':
            const filteredProducts = state.products.filter((product, index) => index !== action.payload)
            return updateObject(state, {
                products: filteredProducts,
            })
        case 'PRODUCT_NAME_CHANGE':
            const selectedProduct = { ...state.products[action.index] };
            selectedProduct.name = action.payload.productName;
            selectedProduct.id = action.payload.id;
            const updatedNamingProducts = [...state.products]
            updatedNamingProducts[action.index] = selectedProduct
            return updateObject(state, {
                products: updatedNamingProducts,
            })
        case 'PRODUCT_UNIT_CHANGE':
            const chosenProduct = { ...state.products[action.index] };
            chosenProduct.unit_id = action.payload.unit_id;
            chosenProduct.unitName = action.payload.unitName;
            const updatedUnitProducts = [...state.products]
            updatedUnitProducts[action.index] = chosenProduct
            return updateObject(state, {
                products: updatedUnitProducts,
            })
        case 'PRODUCT_QUANTITY_CHANGE':
            const changedProduct = { ...state.products[action.index] };
            changedProduct.quantity = action.payload;
            const updatedQuantityProducts = [...state.products]
            updatedQuantityProducts[action.index] = changedProduct
            return updateObject(state, {
                products: updatedQuantityProducts,
            })
        case 'RESET_CART':
            const intialState = {
                products: [
                    {
                        id: '',
                        name: '',
                        quantity: '',
                        unit_id: '',
                        unitName: '',
                    },
                ],
            }
            return updateObject(state, intialState)
        default:
            return state;
    }
}


const EditModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedServices, fetchedEmployees, fetchedLocations, fetchedCategories } = props;
    const { t } = useTranslation();
    const themeCtx = useContext(ThemeContext)

    const selectedServiceIndex = fetchedServices.data.findIndex(service => service.id === id);

    let serviceData = fetchedServices.data[selectedServiceIndex];

    const { name, description, price, discount, discount_type, discount_price, users = [], status, image, location, category, time, time_type, products } = serviceData;

    let intialCart = [
        {
            id: '',
            name: '',
            quantity: '',
            unit_id: '',
            unitName: '',
        },
    ]

    const [allUnits, setAllUnits] = useState([]);

    if (products.length > 0) {
        intialCart = products.map(product => {
            return {
                id: product.pivot.products_id,
                name: product.name,
                quantity: product.pivot.product_quantity,
                unit_id: product.pivot.unit_id,
            }
        })
    }

    const [cart, dispatch] = useReducer(cartReducer, {
        products: intialCart
    });

    const [serviceName, setServiceName] = useState(name);
    const [serviceNameError, setServiceNameError] = useState(false);

    const html = description;
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))
    const [serviceDescriptionError, setServiceDescriptionError] = useState(false);


    const [servicePrice, setServicePrice] = useState(price);

    const [serviceDiscount, setServiceDiscount] = useState(discount);

    const [discountType, setDiscountType] = useState(discount_type);

    const [priceAfterDiscount, setPriceAfterDiscount] = useState(discount_price);
    const [servicePriceError, setServicePriceError] = useState(false);

    const [employeeName, setEmployeeName] = useState(users[0].id);
    const [ employeeNameError, setEmployeeNameError ] = useState(false);

    const [locationName, setLocationName] = useState(location.id);
    const [serviceLocationError, setServiceLocationError] = useState(false);

    const [categoryName, setCategoryName] = useState(category.id);
    const [serviceCategoryError, setServiceCategoryError] = useState(false);

    const [timeRequired, setTimeRequired] = useState(time);
    const [serviceTimeError, setServiceTimeError] = useState(false);

    const [timeType, setTimeType] = useState(time_type);

    const [serviceStatus, setServiceStatus] = useState(status);

    const [type, setType] = useState(products.length > 0 ? 'combo' : 'single');

    const [allProducts, setAllProducts] = useState([]);

    const [uploadedImages, setUploadedImages] = useState([{ data_url: image }]);

    const [defaultImage, setDefaultImage] = useState(image);

    const maxNumber = 1;

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
        if (type === 'combo') {
            axios.get(`/vendors/products`)
                .then(res => {
                    setAllProducts(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
            axios.get(`/vendors/units`)
                .then(res => {
                    setAllUnits(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [type])


    const serviceNameChangeHandler = (event) => {
        setServiceName(event.target.value);
    }

    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        // data for submit
        setUploadedImages(imageList);
        /* if (imageList.length === 1) {
            setDefaultImage(imageList[0].data_url);
        } else {
            setDefaultImage(image);
        } */
    };
    const defaultImageHandler = (event) => {
        setDefaultImage(event.target.value);
    };
    const onEditorChange = newState => {
        setEditorState(newState)
    }

    const servicePriceChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setServicePrice(event.target.value);
        }
    }
    const serviceDiscountChangeHandler = (event) => {
        if (event.target.value >= 0) {
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
        setEmployeeNameError(false);
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
        if (event.target.value >= 0) {
            setTimeRequired(event.target.value);
            setServiceTimeError(false);
        }
    }
    const timeTypeChangeHandler = (event) => {
        setTimeType(event.target.value);
    }
    const unitTypeChangeHandler = (event) => {
        setType(event.target.value);
    };
    const addToCartHandler = (itemData) => {
        dispatch({
            type: 'ADD_TO_PRODUCTS',
            payload: {
                id: '',
                name: '',
                quantity: '',
                unit_id: '',
                unitName: '',
            },
        })
    }

    const removeFromCartHandler = (index) => {
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: index
        })
    }
    const resetCartHandler = () => {
        dispatch({
            type: 'RESET_CART',
        })
    }
    const productNameChangeHandler = (productId, index) => {
        const productName = allProducts.filter(product => product.id === productId);
        dispatch({
            type: 'PRODUCT_NAME_CHANGE',
            index: index,
            payload: {
                id: productName[0].id,
                productName: productName[0].name,
            }
        })
    }
    const productUnitChangeHandler = (unitId, index) => {
        const unitName = allUnits.filter(unit => unit.id === unitId);
        dispatch({
            type: 'PRODUCT_UNIT_CHANGE',
            index: index,
            payload: {
                unit_id: unitId,
                unitName: unitName[0].name,
            },
        })
    }
    const productQuantityChangeHandler = (val, index) => {
        dispatch({
            type: 'PRODUCT_QUANTITY_CHANGE',
            index: index,
            payload: val,
        })
    }
    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const confirmEditHandler = useCallback(() => {
        if (serviceName.trim().length === 0) {
            setServiceNameError(true);
            return;
        }
        if (editorState.getCurrentContent().hasText() === false) {
            setServiceDescriptionError(true);
            return;
        }
        if (servicePriceError) { return; }
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
        if ( employeeName.length === 0) {
            setEmployeeNameError(true);
            return;
        }
        const selectedCategory = fetchedCategories.find(category => category.id === categoryName);

        const selectedLocation = fetchedLocations.find(location => location.id === locationName);

        let formData = new FormData();
        formData.append('id', id);
        formData.append('name', serviceName);
        formData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        formData.append('price', +servicePrice);
        formData.append('discount', +serviceDiscount);
        formData.append('discount_type', discountType);
        formData.append('discount_price', +priceAfterDiscount);
        formData.append('time', +timeRequired);
        formData.append('time_type', timeType);
        formData.append('category_id', categoryName);
        formData.append('location_id', locationName);
        formData.append('employee_ids[0]', employeeName);
        formData.append('status', serviceStatus);
        if (uploadedImages.length > 0 && uploadedImages[0].data_url !== null) {
            formData.append('images', uploadedImages[0].file)
            formData.append('image', uploadedImages[0].file)
        }
        formData.append('category', selectedCategory)
        formData.append('location', selectedLocation)
        formData.append('type', type)
        if (type === 'combo') {
            for (var i = 0; i < cart.products.length; i++) {
                formData.append(`products[${i}][id]`, cart.products[i].id);
                formData.append(`products[${i}][quantity]`, cart.products[i].quantity);
                formData.append(`products[${i}][unit_id]`, cart.products[i].unit_id);
            }
        }
        formData.append('_method', 'PUT');
        onConfirm(formData);
    }, [cart.products, categoryName, discountType, editorState, employeeName, fetchedCategories, fetchedLocations, id, locationName, onConfirm, priceAfterDiscount, serviceDiscount, serviceName, servicePrice, servicePriceError, serviceStatus, timeRequired, timeType, type, uploadedImages])

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
                        value={employeeName}
                        onChange={handleEmployeesChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        MenuProps={MenuProps}
                        renderValue={(val) => {
                            const selected = fetchedEmployees?.find(employee => employee.id === val)
                            return (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    <Chip key={selected.id} label={selected.name} />
                                </Box>
                            )
                        }}
                    >
                        {fetchedEmployees.map((employee) => (
                            <MenuItem
                                key={employee.id}
                                value={employee.id}
                            >
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {employeeNameError && <ValidationMessage notExist>{t(`Please add Employee`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%', textAlign: 'left' }} component="fieldset">
                    <FormLabel component="legend">{t('service type')}</FormLabel>
                    <RadioGroup row aria-label="type" name="row-radio-buttons-group" value={type} onChange={unitTypeChangeHandler} >
                        <FormControlLabel value="single" control={<Radio />} label={t('single')} />
                        <FormControlLabel value="combo" control={<Radio />} label={t('combo')} />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {
                    type === 'combo' && (
                        <Fragment>
                            <Grid item xs={12}>
                                <BookingActions>
                                    <ActionButton onClick={addToCartHandler}  >{t('add item')}</ActionButton>
                                    <ActionButton onClick={resetCartHandler}  >{t('clear all')}</ActionButton>
                                </BookingActions>
                            </Grid>
                            <TableContainer component={Paper} sx={{ my: 2 }}>
                                <Table aria-label="products table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ padding: '16px 8px' }} align="center">{t('product')}</TableCell>
                                            <TableCell sx={{ padding: '16px 8px' }} align="center">{t('unit')}</TableCell>
                                            <TableCell sx={{ padding: '16px 8px' }} align="center">{t('quantity')}</TableCell>
                                            <TableCell sx={{ padding: '16px 8px' }} align="center">{t('action')}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cart.products.map(( row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" sx={{ padding: '16px 8px' }} scope="row">
                                                    <FormControl sx={{ width: '100%' }}>
                                                        <InputLabel id="product-label">{t('product')}</InputLabel>
                                                        <Select
                                                            label={t('product')} 
                                                            labelId="product-label"
                                                            value={row.id}
                                                            onChange={ ( e ) =>productNameChangeHandler( e.target.value, index )}
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                        >
                                                            {
                                                                allProducts.map(product => {
                                                                    return (
                                                                        <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align="center" sx={{ padding: '16px 8px' }}>
                                                    <FormControl sx={{ width: '100%' }}>
                                                        <InputLabel id="unit-label">{t('unit')}</InputLabel>
                                                        <Select
                                                            label={t('unit')}
                                                            labelId="unit-label"
                                                            value={row.unit_id}
                                                            onChange={ ( e ) =>  productUnitChangeHandler( e.target.value, index )}
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                        >
                                                            {
                                                                allUnits.map(unit => {
                                                                    return (
                                                                        <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align="center" sx={{ padding: '16px 8px' }}>
                                                    <CustomTextField id="unit-quantity" type='number' label={t('quantity')}  sx={{ minWidth: '80px' }}
                                                        variant="outlined" value={row.quantity} onChange={ ( e ) => productQuantityChangeHandler( e.target.value, index ) }
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">{t(row.unitName)} </InputAdornment>,
                                                        }} 
                                                    />
                                                </TableCell>
                                                <TableCell align="center" sx={{ padding: '16px 8px' }}>
                                                    <Actions remove
                                                            removeHandler={(id) => removeFromCartHandler(index)}
                                                        />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Fragment>
                    )
                }
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
                                    {t('photos')}
                                </Button>
                            </UploadImageTopBar>
                        </div>
                    )}
                </ImageUploading>
            </Grid>
        </Grid >
    )
return (
    <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmEditHandler} onClose={closeModalHandler} >
        {content}
    </CustomModal>
)
}

const mapStateToProps = (state) => {
    return {
        fetchedEmployees: state.employees.employees,
        fetchedLocations: state.locations.locations,
        fetchedCategories: state.categories.categories,
    }
}

export default connect(mapStateToProps, null)(EditModal);
