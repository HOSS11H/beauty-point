import { useState, useEffect, useCallback, useContext, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../store/theme-context'

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
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
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { connect } from 'react-redux';
import { fetchLocations } from '../../../../../../store/actions/index';
import { formatCurrency, updateObject } from '../../../../../../shared/utility';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';
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
import { convertTime12to24 } from '../../../../../../shared/utility';
import axios from '../../../../../../utils/axios-instance';
import moment from 'moment';
import { toast } from 'react-toastify';
import Loader from '../../../../../../components/UI/Loader/Loader';


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
        case 'ADD_TO_CART':
            return updateObject(state, action.payload)
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

const EditModal = (props) => {

    const { show, heading, id, confirmText, onConfirm, onClose, fetchedLocations, fetchLocationsHandler } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [dealData, setDealData] = useState(null);
    const [loadingData, setLoadingData] = useState(false);

    const [cartData, dispatch] = useReducer(cartReducer, {
        services: [],
    });

    const [dealName, setDealName] = useState(null);
    const [dealNameError, setDealNameError] = useState(false);

    const [dealLocation, setDealLocation] = useState('');
    const [dealLocationError, setDealLocationError] = useState(false);

    const [lastPage, setLastPage] = useState(false)
    const [loading, setLoading] = useState(true)

    // tracking on which page we currently are
    const [page, setPage] = useState(1)

    const [servicesOptions, setServicesOptions] = useState([]);

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServicesError, setSelectedServicesError] = useState(false);

    const [dealDiscount, setDealDiscount] = useState(null);

    const [discountType, setDiscountType] = useState(null);

    const [priceAfterDiscount, setPriceAfterDiscount] = useState(null);
    const [dealPriceError, setDealPriceError] = useState(false);

    const [dealStatus, setDealStatus] = useState(null);

    const [usesTime, setUsesTime] = useState(null);

    const [userLimit, setUserLimit] = useState(null);

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
    const { saturday, sunday, monday, tuesday, wednesday, thursday, friday } = appliedDays;
    const [appliedDaysError, setAppliedDaysError] = useState(false);

    const [editorState, setEditorState] = useState(null)

    const [dealDescriptionError, setDealDescriptionError] = useState(false);

    const [uploadedImages, setUploadedImages] = useState([{ data_url: '' }]);

    const [defaultImage, setDefaultImage] = useState(null);
    const [defaultImageError, setDefaultImageError] = useState(false);

    const fetchData = useCallback(() => {
        setLoadingData(true);
        axios.get(`/vendors/deals/${id}?include[]=services&include[]=location`, {
            headers: {
                'Accept-Language': lang
            }
        }).then(response => {
            setLoadingData(false);
            setDealData(response.data);
            const { title, description, services, location, discount_value, discount_type, discount_price, status, used_time, uses_limit, image, days, start_date_time, end_date_time, open_time, close_time } = response.data;
            setDealName(title);
            setDealLocation(location.id);
            let chosenServices = [];
            services.forEach(service => {
                const serviceData = {
                    id: service.service.id,
                    quantity: service.quantity,
                    name: service.service.name,
                    price: service.price,
                    discount: service.discount_amount,
                }
                chosenServices.push(serviceData);
            })
            dispatch({ type: 'ADD_TO_CART', payload: { services: chosenServices } });
            setSelectedServices(chosenServices.map(service => service.id));
            setDealDiscount(discount_value);
            setDiscountType(discount_type);
            setPriceAfterDiscount(discount_price);
            setDealStatus(status);
            setUsesTime(uses_limit);
            setUserLimit(used_time);
            setDateFrom(new Date(start_date_time));
            setDateTo(new Date(end_date_time));
            setOpenTime(new Date(`2021-02-03 ${convertTime12to24(open_time)}`));
            setCloseTime(new Date(`2021-02-03 ${convertTime12to24(close_time)}`));
            let obj = {};
            days.forEach(item => {
                obj[item] = true;
                return obj;
            })
            setAppliedDays({
                saturday: false,
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                ...obj,
            });
            const html = description;
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState))
            setUploadedImages([{ data_url: image }]);
        })
            .catch(err => {
                setLoadingData(false);
                toast.error(t('Error Happened'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [id, lang, t])

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [fetchData, id]);

    const maxNumber = 1;

    const dealPrice = cartData.services.reduce((sum, curr) => {
        return sum + curr.price * curr.quantity
    }, 0);

    const ovserver = useRef()

    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loading])

    useEffect(() => {
        setLoading(true)
        axios.get(`/vendors/services?page=${page}&per_page=10&location_id=${dealLocation}`, {
            headers: {
                'Accept-Language': lang,
            }
        }).then(res => {
            setLoading(false)
            setServicesOptions(currentServices => {
                return [...currentServices, ...res.data.data]
            });
            if (res.data.meta.last_page === page) {
                setLastPage(true)
            }
        })
            .catch(err => {
                setLoading(false)
            })
    }, [dealLocation, lang, page])

    useEffect(() => {
        if (uploadedImages[0].file === undefined) {
            fetch(uploadedImages[0].data_url).then(res => res.blob()).then(blob => {
                setUploadedImages([{ data_url: uploadedImages[0].data_url, file: new File([blob], 'image.jpg', { type: blob.type }) }]);
            })
        }
    }, [uploadedImages])

    useEffect(() => {
        fetchLocationsHandler(lang);
    }, [fetchLocationsHandler, lang])


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
    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setDealLocation(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setDealLocationError(false);
        resetCartHandler();
        setSelectedServices([]);
        setServicesOptions([]);
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
            const selectedServiceIndex = servicesOptions.findIndex(service => service.id === serviceId);
            const selectedServiceData = { ...servicesOptions[selectedServiceIndex] }
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

    const confirmCreateHandler = useCallback(() => {
        if (dealName.trim().length === 0) {
            setDealNameError(true);
            return;
        }
        if (dealLocation === '') {
            setDealLocationError(true);
            return;
        }
        if (selectedServices.length === 0) {
            setSelectedServicesError(true);
            return;
        }
        if (dateTo < dateFrom) {
            setDateToError(true);
            return;
        }
        if (closeTime < openTime) {
            setCloseTimeError(true);
            return;
        }
        if (Object.values(appliedDays).includes(true)) {
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

        const selectedAppliedDays = [];
        Object.keys(appliedDays).forEach(day => {
            if (appliedDays[day]) {
                selectedAppliedDays.push(day);
            }
        })

        let formData = new FormData();
        formData.append('id', id);
        formData.append('title', dealName);
        formData.append('location', dealLocation);
        for (var i = 0; i < selectedServices.length; i++) {
            formData.append(`deal_services[${i}]`, selectedServices[i]);
        }
        for (var x = 0; x < cartData.services.length; x++) {
            formData.append(`deal_quantity[${x}]`, cartData.services[x].quantity);
        }
        for (var y = 0; y < cartData.services.length; y++) {
            formData.append(`deal_unit_price[${y}]`, cartData.services[y].price);
        }
        for (var z = 0; z < cartData.services.length; z++) {
            formData.append(`deal_discount[${z}]`, cartData.services[z].discount);
        }
        formData.append('discount_type', discountType);
        formData.append('discount', +dealDiscount);
        formData.append('discount_amount', +priceAfterDiscount);
        formData.append('choice', 'location');
        formData.append('uses_time', +userLimit);
        formData.append('customer_uses_time', +usesTime);
        for (var c = 0; c < selectedAppliedDays.length; c++) {
            formData.append(`days[${c}]`, selectedAppliedDays[c]);
        }

        formData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        formData.append('status', dealStatus);
        formData.append('deal_startDate', `${format(dateFrom, 'Y-MM-dd hh:ii a')}`);
        formData.append('deal_endDate', `${format(dateTo, 'Y-MM-dd hh:ii a')}`);
        formData.append('applied_between_dates', `${format(dateFrom, 'Y-MM-dd hh:ii a')}  ${format(dateTo, 'Y-MM-dd hh:ii a')}`);
        formData.append('open_time', `${moment(openTime).format("hh:mm A")}`);
        formData.append('close_time', `${moment(closeTime).format("hh:mm A")}`);
        formData.append('deal_startTime', `${moment(openTime).format("hh:mm A")}`);
        formData.append('deal_endTime', `${moment(closeTime).format("hh:mm A")}`);
        if (uploadedImages.length > 0 && uploadedImages[0].data_url !== null && uploadedImages[0].file !== undefined) {
            formData.append('image', uploadedImages[0].file)
        } else {
            formData.append('image', '')
        }
        formData.append('_method', 'PUT');
        onConfirm(formData);
    }, [dealName, dealLocation, selectedServices, dateTo, dateFrom, closeTime, openTime, appliedDays, editorState, dealPriceError, id, cartData.services, discountType, dealDiscount, priceAfterDiscount, userLimit, usesTime, dealStatus, uploadedImages, onConfirm])

    let servicesOptionsContent;

    if (servicesOptions.length > 0) {
        servicesOptionsContent = servicesOptions.map((service, index) => {
            if (servicesOptions.length === (index + 1)) {
                return (
                    <MenuItem key={service.id} value={service.id} ref={lastElementRef} >{service.name}</MenuItem>
                )
            } else {
                return (
                    <MenuItem key={service.id} value={service.id} >{service.name}</MenuItem>
                )
            }
        })
    }

    let content;

    if (loadingData) {
        content = <Loader height='50vh' />
    }

    if (dealData && !loadingData) {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="deal-name" label={t('name')} variant="outlined" value={dealName} onChange={dealNameChangeHandler} />
                    {dealNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
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
                                    {selected.map((value) => {
                                        const item = cartData.services.find(service => service.id === value);
                                        console.log(cartData.services, value, item)
                                        return (
                                            <Chip key={item.id} label={item.name} />
                                        )
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {servicesOptionsContent}
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
                    {dateToError && <ValidationMessage notExist>{t('date to must be after date from')}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label={t('open time')}
                            value={openTime}
                            onChange={openTimeChangeHandler}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label={t('close time')}
                            value={closeTime}
                            onChange={closeTimeChangeHandler}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                    {closeTimeError && <ValidationMessage notExist>{t('close time must be after open time')}</ValidationMessage>}
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }} component="fieldset" variant="standard">
                        <FormLabel component="legend" sx={{ textAlign: 'left' }} >{t('applied days')}</FormLabel>
                        <FormGroup sx={{ flexDirection: 'row', textTransform: 'capitalize' }}>
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
                    {appliedDaysError && <ValidationMessage notExist>{t('applied days must be selected')}</ValidationMessage>}
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
                                                            <FormControlLabel value={image['data_url']} control={<Radio />} label={t("Default")} />
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
                    {defaultImageError && <ValidationMessage notExist>{t(`Please add default Image`)}</ValidationMessage>}
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
        fetchedLocations: state.locations.locations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditModal);