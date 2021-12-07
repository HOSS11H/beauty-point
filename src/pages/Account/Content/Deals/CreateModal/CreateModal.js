import { useState, useEffect, useCallback, useContext, useReducer } from 'react';
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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
import { fetchLocations, fetchServicesByLocation } from '../../../../../store/actions/index';
import { formatCurrency, updateObject } from '../../../../../shared/utility';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import CartItem from './CartItem/CartItem';
import SharedTableHead from './SharedTableHead/SharedTableHead';
import Paper from '@mui/material/Paper';


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
    margin-top: 15px;
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

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_SERVICES':
            return updateObject(state, {
                services: action.payload,
            })
        case 'REMOVE_SERVICE':
            const filteredServices = state.services.filter(service => service.id !== action.payload)
            return updateObject(state, {
                services: filteredServices,
            })
        case 'INCREASE_SERVICE':
            const increasedServiceIndex = state.services.findIndex(service => service.id === action.payload);
            const increasedService = { ...state.services[increasedServiceIndex] }
            increasedService.quantity = increasedService.quantity + 1;
            const increasedServices = [...state.services]
            increasedServices[increasedServiceIndex] = increasedService
            return updateObject(state, {
                services: increasedServices,
            })
        case 'DECREASE_SERVICE':
            const decreasedServiceIndex = state.services.findIndex(service => service.id === action.payload);
            const decreasedService = { ...state.services[decreasedServiceIndex] }
            const decreasedServices = [...state.services]
            if (decreasedService.quantity === 1) {
                decreasedServices.splice(decreasedServiceIndex, 1)
            } else {
                decreasedService.quantity = decreasedService.quantity - 1
                decreasedServices[decreasedServiceIndex] = decreasedService
            }
            return updateObject(state, {
                services: decreasedServices,
            })
        case 'RESET_CART':
            const intialState = {
                services: [],
            }
            return updateObject(state, intialState)
        default:
            return state;
    }
}

const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, fetchedLocations, fetchLocationsHandler, fetchedServices, fetchServicesHandler } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [cartData, dispatch] = useReducer(cartReducer, {
        services: [],
    });

    const [dealName, setDealName] = useState('');
    const [dealNameError, setDealNameError] = useState(false);

    const [dealAppliedOn, setDealAppliedOn] = useState('location');

    const [selectedServices, setSelectedServices] = useState([]);

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )
    const [dealDescriptionError, setDealDescriptionError] = useState(false);

    const [dealPrice, setDealPrice] = useState(0);

    const [dealDiscount, setDealDiscount] = useState(0);

    const [discountType, setDiscountType] = useState('percent');

    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [dealPriceError, setDealPriceError] = useState(false);

    const [dealQuantity, setDealQuantity] = useState(0);
    const [dealQuantityError, setDealQuantityError] = useState(false);

    const [locationName, setLocationName] = useState('');
    const [dealLocationError, setDealLocationError] = useState(false);

    const [dealStatus, setDealStatus] = useState('active');

    const [uploadedImages, setUploadedImages] = useState([]);

    const [defaultImage, setDefaultImage] = useState('');
    const [defaultImageError, setDefaultImageError] = useState(false);

    const maxNumber = 69;

    useEffect(() => {
        let netPrice;
        if (discountType === 'percent') {
            netPrice = (dealPrice - (dealPrice * (dealDiscount / 100))).toFixed(2);
            setPriceAfterDiscount(netPrice > 0 ? netPrice : 0);
            netPrice > 0 ? setDealPriceError(false) : setDealPriceError(true);
        } else if (discountType === 'fixed') {
            netPrice = (dealPrice - dealDiscount).toFixed(2);
            setPriceAfterDiscount(netPrice > 0 ? netPrice : 0)
            netPrice > 0 ? setDealPriceError(false) : setDealPriceError(true);
        }
    }, [discountType, dealDiscount, dealPrice])

    useEffect(() => {
        fetchLocationsHandler(lang);
    }, [fetchLocationsHandler, lang])

    const addToCartHandler = useCallback((type, itemData) => {
        dispatch({
            type: 'ADD_TO_SERVICES',
            payload: itemData
        })
    }, [])

    const removeFromCartHandler = useCallback((itemId) => {
        setSelectedServices(selectedServices.filter(service => service !== itemId))
        dispatch({
            type: 'REMOVE_SERVICE',
            payload: itemId
        })
    }, [selectedServices])

    const increaseItemHandler = useCallback((itemId) => {
        dispatch({
            type: 'INCREASE_SERVICE',
            payload: itemId
        })
    }, [])
    const decreaseItemHandler = useCallback((itemId) => {
        const decreasedServiceIndex = cartData.services.findIndex(service => service.id === itemId);
        if (cartData.services[decreasedServiceIndex].quantity === 1) {
            setSelectedServices(selectedServices.filter(service => service !== itemId))
        }
        dispatch({
            type: 'DECREASE_SERVICE',
            payload: itemId
        })
    }, [cartData.services, selectedServices])
    const resetCartHandler = useCallback((  ) => {
        dispatch({
            type: 'RESET_CART',
        })
    }, [])


    const dealNameChangeHandler = (event) => {
        setDealName(event.target.value);
        setDealNameError(false);
    }

    const onEditorChange = newState => {
        setEditorState(newState);
        setDealDescriptionError(false);
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

    const dealPriceChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDealPrice(event.target.value);
        }
    }
    const dealDiscountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDealDiscount(event.target.value);
        }
    }
    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }
    const dealQuantityChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDealQuantity(event.target.value);
            setDealQuantityError(false);
        }
    }
    const dealStatusChangeHandler = (event) => {
        setDealStatus(event.target.value);
    }
    const dealAppliedOnChangeHandler = (event) => {
        setDealAppliedOn(event.target.value);
    }
    const handleServicesChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedServices(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        let chosenServices = [];
        value.forEach(serviceId => {
            const selectedServiceIndex = fetchedServices.data.findIndex(service => service.id === serviceId);
            const selectedServiceData = { ...fetchedServices.data[selectedServiceIndex] }
            let discountVal;
            if (selectedServiceData.discount_type === 'percent') {
                discountVal = (selectedServiceData.price * (selectedServiceData.discount / 100));
            } else if (selectedServiceData.discount_type === 'fixed') {
                discountVal = selectedServiceData.discount;
            }
            const serviceData = {
                id: selectedServiceData.id,
                quantity: 1,
                name: selectedServiceData.name,
                price: selectedServiceData.price,
                discount: discountVal,
            }
            chosenServices.push(serviceData);
        })
        addToCartHandler('services', chosenServices)
    };

    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setLocationName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setDealLocationError(false);
        fetchServicesHandler(lang, value);
    };
    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const confirmCreateHandler = useCallback(() => {
        if (dealName.trim().length === 0) {
            setDealNameError(true);
            return;
        }
        if (editorState.getCurrentContent().hasText() === false) {
            setDealDescriptionError(true);
            return;
        }

        if (dealPriceError) { return; }

        if (locationName === '') {
            setDealLocationError(true);
            return;
        }
        if (+dealQuantity === 0) {
            setDealQuantityError(true);
            return;
        }
        if (defaultImage === '') {
            setDefaultImageError(true);
            return;
        }

        const selectedLocation = fetchedLocations.find(location => location.id === locationName);

        const data = {
            name: dealName,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            price: +dealPrice,
            discount: +dealDiscount,
            discount_type: discountType,
            discount_price: +priceAfterDiscount,
            location_id: locationName,
            quantity: +dealQuantity,
            status: dealStatus,
            images: uploadedImages,
            image: defaultImage,
            location: selectedLocation,
        }
        onConfirm(data);
        setDealName('');
        setEditorState(EditorState.createEmpty());
        setDealPrice(0);
        setDealDiscount(0);
        setDiscountType('percent');
        setPriceAfterDiscount(0);
        setLocationName('');
        setDealQuantity(0);
        setDealStatus('active');
        setUploadedImages([]);
        setDefaultImage('');
    }, [dealName, editorState, dealPriceError, locationName, dealQuantity, defaultImage, fetchedLocations, dealPrice, dealDiscount, discountType, priceAfterDiscount, dealStatus, uploadedImages, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="deal-name" label={t('name')} variant="outlined" value={dealName} onChange={dealNameChangeHandler} />
                {dealNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="applied-on-label">{t('applied on')}</InputLabel>
                    <Select
                        value={dealAppliedOn}
                        onChange={dealAppliedOnChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                        label={t('applied on')}
                    >
                        <MenuItem value='location'>{t('location')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="location-label">{t('your location')}</InputLabel>
                    <Select
                        value={locationName}
                        onChange={handleLocationChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                        label={t('your location')}
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
                {dealLocationError && <ValidationMessage notExist>{t(`Please add Location`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="services-label">{t('services')}</InputLabel>
                    <Select
                        labelId="services-label"
                        id="select-multiple-services"
                        multiple
                        value={selectedServices}
                        onChange={handleServicesChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {fetchedServices.data.length > 0 && selected.map((value) => {
                                    const selected = fetchedServices.data.find(service => service.id === value);
                                    return (
                                        <Chip key={selected.id} label={selected.name} />
                                    )
                                })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {fetchedServices.data.map((service) => (
                            <MenuItem
                                key={service.id}
                                value={service.id}
                            >
                                {service.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} >
                {cartData.services.length > 0 && (
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="services table">
                            <SharedTableHead name='services' />
                            <TableBody>
                                {cartData.services.map((row) => (
                                    <CartItem type='services' key={row.id} row={row} remove={removeFromCartHandler} increase={increaseItemHandler} decrease={decreaseItemHandler} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>




            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <Select
                        value={dealStatus}
                        onChange={dealStatusChangeHandler}
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
                {dealDescriptionError && <ValidationMessage notExist>{t(`Please add Description`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="deal-price" type='number' label={t('price')} variant="outlined" value={dealPrice} onChange={dealPriceChangeHandler} />
                {dealPriceError && <ValidationMessage notExist>{t(`Please add Price`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormGroup>
                    <CustomTextField id="deal-discount" type='number' label={t('discount')} variant="outlined" value={dealDiscount} onChange={dealDiscountChangeHandler} />
                    <FormControl sx={{ minWidth: 120, ml: 1 }}>
                        <Select
                            value={discountType}
                            onChange={discountTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='percent'>{t('Percent')}</MenuItem>
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
                {dealLocationError && <ValidationMessage notExist>{t(`Please add Location`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="deal-quantity" type='number' label={t('quantity')} variant="outlined" value={dealQuantity} onChange={dealQuantityChangeHandler} />
                {dealQuantityError && <ValidationMessage notExist>{t(`Please add Quantity`)}</ValidationMessage>}
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
                            <UploadImageTopBar>
                                <Button size="medium" sx={{ mr: 2, color: isDragging && 'red' }} variant="contained" startIcon={<PhotoCamera />} {...dragProps} onClick={onImageUpload} >
                                    {t('upload')}
                                </Button>
                                <Button size="medium" variant="outlined" startIcon={<DeleteIcon />} onClick={onImageRemoveAll}>
                                    {t('Remove all')}
                                </Button>
                            </UploadImageTopBar>
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
        fetchedLocations: state.locations.locations,
        fetchedServices: state.services.services,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
        fetchServicesHandler: (lang, location) => dispatch(fetchServicesByLocation(lang, location)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);