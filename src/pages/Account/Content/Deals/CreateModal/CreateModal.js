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
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { format } from 'date-fns';


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

    const { show, heading, confirmText, onConfirm, onClose, fetchedLocations, fetchLocationsHandler, fetchedServices, fetchingServices, fetchServicesHandler, creatingDealSuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [cartData, dispatch] = useReducer(cartReducer, {
        services: [],
    });

    const [dealName, setDealName] = useState('');
    const [dealNameError, setDealNameError] = useState(false);

    const [dealAppliedOn, setDealAppliedOn] = useState('location');
    
    const [dealLocation, setDealLocation] = useState('');
    const [dealLocationError, setDealLocationError] = useState(false);

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServicesError, setSelectedServicesError] = useState(false);

    const [dealDiscount, setDealDiscount] = useState(0);

    const [discountType, setDiscountType] = useState('percentage');
    
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [dealPriceError, setDealPriceError] = useState(false);

    const [dealStatus, setDealStatus] = useState('active');

    const [usesTime, setUsesTime] = useState(0);

    const [userLimit, setUserLimit] = useState(0);

    
    const [dateFrom, setDateFrom] = useState(new Date());
    
    const [dateTo, setDateTo] = useState(new Date());
    const [dateToError, setDateToError] = useState(false);
    
    const [openTime, setOpenTime] = useState(new Date());

    const [closeTime, setCloseTime] = useState(new Date());
    const [closeTimeError, setCloseTimeError] = useState(false);
    
    const [appliedDays, setAppliedDays] = useState({
        saturday: false,
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
    });
    const { saturday, sunday, monday, tuesday, wednesday, thursday, friday} = appliedDays;
    const [appliedDaysError, setAppliedDaysError] = useState(false);

    
    
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )
    const [dealDescriptionError, setDealDescriptionError] = useState(false);

    const [uploadedImages, setUploadedImages] = useState([]);

    const [defaultImage, setDefaultImage] = useState('');
    const [defaultImageError, setDefaultImageError] = useState(false);



    const maxNumber = 69;

    const dealPrice = cartData.services.reduce((sum, curr) => {
        return sum + curr.price * curr.quantity
    }, 0);



    useEffect(() => {
        let netPrice;
        if (discountType === 'percentage') {
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

    const increaseItemHandler = useCallback((type, itemId) => {
        dispatch({
            type: 'INCREASE_SERVICE',
            payload: itemId
        })
    }, [])
    const decreaseItemHandler = useCallback((type, itemId) => {
        const decreasedServiceIndex = cartData.services.findIndex(service => service.id === itemId);
        if (cartData.services[decreasedServiceIndex].quantity === 1) {
            setSelectedServices(selectedServices.filter(service => service !== itemId))
        }
        dispatch({
            type: 'DECREASE_SERVICE',
            payload: itemId
        })
    }, [cartData.services, selectedServices])
    const resetCartHandler = useCallback(() => {
        dispatch({
            type: 'RESET_CART',
        })
    }, [])


    const dealNameChangeHandler = (event) => {
        setDealName(event.target.value);
        setDealNameError(false);
    }
    const dealAppliedOnChangeHandler = (event) => {
        setDealAppliedOn(event.target.value);
    }
    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setDealLocation(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setDealLocationError(false);
        fetchServicesHandler(lang, value);
        resetCartHandler();
        setSelectedServices([]);
    };
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
            if (selectedServiceData.discount_type === 'percent' ) {
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
        setSelectedServicesError(false);
    };
    const dealDiscountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDealDiscount(event.target.value);
        }
    }
    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }
    const dealStatusChangeHandler = (event) => {
        setDealStatus(event.target.value);
    }
    const usesTimeChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setUsesTime(event.target.value);
        }
    }
    const userLimitChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setUserLimit(event.target.value);
        }
    }
    const handleDateFromChange = (val) => {
        setDateFrom(val);
    }
    const handleDateToChange = (val) => {
        setDateTo(val);
        setDateToError(false);
    }
    const openTimeChangeHandler = (newValue) => {
        setOpenTime(newValue);
    }
    const closeTimeChangeHandler = (newValue) => {
        setCloseTime(newValue);
        setCloseTimeError(false);
    }
    const handleDaysChange = (event) => {
        setAppliedDays({
            ...appliedDays,
            [event.target.name]: event.target.checked,
        });
        setAppliedDaysError(false);
    };
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
    const closeModalHandler = useCallback(() => {
        resetCartHandler();
        onClose();
    }, [onClose, resetCartHandler])


    const resetModalData = useCallback(() => {
        setDealName('');
        setDealNameError(false);
        setDealAppliedOn('location');
        setDealLocation('');
        setDealLocationError(false);
        setSelectedServices([]);
        setSelectedServicesError(false);
        setDealDiscount(0);
        setDiscountType('percentage');
        setPriceAfterDiscount(0);
        setDealPriceError(false);
        setDealStatus('active');
        setUsesTime(0);
        setUserLimit(0);
        setDateFrom(new Date());
        setDateTo(new Date());
        setDateToError(false);
        setOpenTime(new Date());
        setCloseTime(new Date());
        setCloseTimeError(false);
        setAppliedDays({
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        });
        setAppliedDaysError(false);
        setEditorState(EditorState.createEmpty());
        setDealDescriptionError(false);
        setUploadedImages([]);
        setDefaultImage('');
        setDefaultImageError(false);
        resetCartHandler();
    }, [resetCartHandler])

    useEffect(() => {
        creatingDealSuccess && resetModalData();
    }, [creatingDealSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        if (dealName.trim().length === 0) {
            setDealNameError(true);
            return;
        }
        if (dealLocation === '') {
            setDealLocationError(true);
            return;
        }
        if ( selectedServices.length === 0) {
            setSelectedServicesError(true);
            return;
        }
        if ( dateTo < dateFrom) {
            setDateToError(true);
            return;
        }
        if ( closeTime < openTime) {
            setCloseTimeError(true);
            return;
        }
        if ( Object.values(appliedDays).includes(true) ) {
            setAppliedDaysError(false);
        } else {
            setAppliedDaysError(true);
            return;
        }
        if (editorState.getCurrentContent().hasText() === false) {
            setDealDescriptionError(true);
            return;
        }
        if (dealPriceError) { return; }

        const selectedServicesQuantity = [];
        cartData.services.forEach(service => {
            selectedServicesQuantity.push(service.quantity);
        })
        const selectedServicesPrice = [];
        cartData.services.forEach(service => {
            selectedServicesPrice.push(service.price);
        })
        const selectedServicesDiscount = [];
        cartData.services.forEach(service => {
            selectedServicesDiscount.push(service.discount);
        })
        
        const selectedAppliedDays = [];
        Object.keys(appliedDays).forEach(day => {
            if (appliedDays[day]) { 
                selectedAppliedDays.push(day);
            }
        })
        const selectedLocation = fetchedLocations.find(location => location.id === dealLocation);

        const data = {
            title: dealName,
            location: dealLocation,
            deal_services: selectedServices,
            deal_quantity: selectedServicesQuantity,
            deal_unit_price: selectedServicesPrice,
            deal_discount: selectedServicesDiscount,
            discount_type: discountType,
            discount: +dealDiscount,
            discount_amount: +priceAfterDiscount,
            choice : dealAppliedOn,
            uses_time: +userLimit,
            customer_uses_time: +usesTime,
            days : selectedAppliedDays,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            status: dealStatus,
            deal_startDate: `${format(dateFrom, 'Y-M-dd hh:ii a')}`,
            deal_endDate: `${format(dateTo, 'Y-M-dd hh:ii a')}`,
            applied_between_dates : `${format(dateFrom, 'Y-M-dd hh:ii a')}  ${format(dateTo, 'Y-M-dd hh:ii a')}`,
            open_time : `${format(openTime, 'hh:ii a')}`,
            close_time : `${format(closeTime, 'hh:ii a')}`,
            deal_startTime: `${format(openTime, 'hh:ii a')}`,
            deal_endTime: `${format(closeTime, 'hh:ii a')}`,
            locationData: selectedLocation,
        }
        onConfirm(data);
    }, [dealName, dealLocation, selectedServices, dateTo, dateFrom, closeTime, openTime, appliedDays, editorState, dealPriceError, cartData.services, fetchedLocations, discountType, dealDiscount, priceAfterDiscount, dealAppliedOn, usesTime, userLimit, dealStatus, onConfirm])

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
                        value={dealLocation}
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
                                {!fetchingServices && selected.map((value) => {
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
                {selectedServicesError && <ValidationMessage notExist>{t(`Please add at least one service`)}</ValidationMessage>}
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
            <Grid item xs={12}>
                <PriceCalculation>
                    <p>{t('total deal price')}</p>
                    <p>{formatCurrency(dealPrice)}</p>
                </PriceCalculation>
            </Grid>
            <Grid item xs={12}>
                <CustomFormGroup>
                    <CustomTextField id="deal-discount" type='number' label={t('discount')} variant="outlined" value={dealDiscount} onChange={dealDiscountChangeHandler} />
                    <FormControl sx={{ minWidth: 120, ml: 1 }}>
                        <Select
                            value={discountType}
                            onChange={discountTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='percentage'>{t('percentage')}</MenuItem>
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
            <Grid item xs={12} sm={6}>
                <CustomTextField id="uses-time" type='number' label={t('deal uses time')} variant="outlined" value={usesTime} onChange={usesTimeChangeHandler} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="user-limit" type='number' label={t('user limit')} variant="outlined" value={userLimit} onChange={userLimitChangeHandler} />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12} sm={6} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date from")}
                            inputFormat="MM/dd/yyyy"
                            value={dateFrom}
                            onChange={handleDateFromChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date to")}
                            inputFormat="MM/dd/yyyy"
                            value={dateTo}
                            onChange={handleDateToChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                    {dateToError &&  <ValidationMessage notExist>{t('date to must be after date from')}</ValidationMessage> }
                </Grid>
            <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label={t('Open time')}
                        value={openTime}
                        onChange={openTimeChangeHandler}
                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label={t('Close time')}
                        value={closeTime}
                        onChange={closeTimeChangeHandler}
                        renderInput={(params) => <TextField  sx={{ width: '100%' }} {...params} />}
                    />
                </LocalizationProvider>
                { closeTimeError && <ValidationMessage notExist>{t('close time must be after open time')}</ValidationMessage>}
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }} component="fieldset" variant="standard">
                    <FormLabel component="legend" sx={{ textAlign: 'left' }} >{t('applied days')}</FormLabel>
                    <FormGroup sx={{ flexDirection: 'row', textTransform: 'capitalize' } }>
                        <FormControlLabel
                            control={
                                <Checkbox checked={saturday} onChange={handleDaysChange} name="saturday" />
                            }
                            label={t("saturday")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={sunday} onChange={handleDaysChange} name="sunday" />
                            }
                            label={t("sunday")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={monday} onChange={handleDaysChange} name="monday" />
                            }
                            label={t("monday")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={tuesday} onChange={handleDaysChange} name="tuesday" />
                            }
                            label={t("tuesday")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={wednesday} onChange={handleDaysChange} name="wednesday" />
                            }
                            label={t("wednesday")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={thursday} onChange={handleDaysChange} name="thursday" />
                            }
                            label={t('thursday')}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={friday} onChange={handleDaysChange} name="friday" />
                            }
                            label={t("friday")}
                        />
                    </FormGroup>
                </FormControl>
                { appliedDaysError && <ValidationMessage notExist>{t('applied days must be selected')}</ValidationMessage>}
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
        fetchedLocations: state.locations.locations,
        fetchedServices: state.services.servicesByLocation.services,
        fetchingServices: state.services.servicesByLocation.fetchingServices,
        creatingDealSuccess: state.deals.creatingDealSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
        fetchServicesHandler: (lang, location) => dispatch(fetchServicesByLocation(lang, location)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);