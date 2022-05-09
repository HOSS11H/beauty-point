import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import CartItem from './CartItem/CartItem';
import SharedTableHead from './SharedTableHead/SharedTableHead';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import MoneyIcon from '@mui/icons-material/Money';
import { formatCurrency, updateObject } from '../../../../../shared/utility';
//import { CustomButton } from '../../../../../components/UI/Button/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees, fetchProducts, fetchServices, fetchDeals } from '../../../../../store/actions/index';
import InputAdornment from '@mui/material/InputAdornment';
import ThemeContext from '../../../../../store/theme-context';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import Loader from '../../../../../components/UI/Loader/Loader';
import axios from 'axios';
import v2 from '../../../../../utils/axios-instance'
import v1 from '../../../../../utils/axios-instance-v1'
import moment from 'moment'

const ClientDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ClientImg = styled(Avatar)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-bottom: 10px;
    cursor: pointer;
`
const ClientName = styled.a`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    cursor: pointer;
`

const BookingData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const BookingDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`

const BookingDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const BookingList = styled.ul`
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
        }
    }
`
/* const BookingActions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const DeleteButton = styled(CustomButton)`
    &.MuiButton-root {
        width: auto;
        padding: 0 20px;
        height: 40px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.error.main};
        font-size: 16px;
    }
` */

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return updateObject(state, action.payload)
        case 'ADD_TO_SERVICES':
            const serviceIndex = state.services.findIndex(service => service.item.id === action.payload.id);
            const updatedServices = [...state.services]
            if (serviceIndex === -1) {
                updatedServices.push(action.payload)
            } else {
                const updatedItem = { ...updatedServices[serviceIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedServices[serviceIndex] = updatedItem
            }
            return updateObject(state, {
                services: updatedServices,
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
        case 'CHANGE_SERVICE_EMPLOYEE':
            const changedEmployeeServiceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const changedEmployeeService = { ...state.services[changedEmployeeServiceIndex] }
            changedEmployeeService.employee_id = action.payload.employeeId
            const changedEmployeeServices = [...state.services]
            changedEmployeeServices[changedEmployeeServiceIndex] = changedEmployeeService
            return updateObject(state, {
                services: changedEmployeeServices,
            })
        case 'ADD_TO_PRODUCTS':
            const productIndex = state.products.findIndex(product => product.item.id === action.payload.id);
            const updatedProducts = [...state.products]
            if (productIndex === -1) {
                updatedProducts.push(action.payload)
            } else {
                const updatedItem = { ...updatedProducts[productIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedProducts[productIndex] = updatedItem
            }
            return updateObject(state, {
                products: updatedProducts,
            })
        case 'REMOVE_PRODUCT':
            const filteredProducts = state.products.filter(product => product.id !== action.payload)
            return updateObject(state, {
                products: filteredProducts,
            })
        case 'INCREASE_PRODUCT':
            const increasedProductIndex = state.products.findIndex(product => product.id === action.payload);
            const increasedProduct = { ...state.products[increasedProductIndex] }
            increasedProduct.quantity = increasedProduct.quantity + 1
            const increasedProducts = [...state.products]
            increasedProducts[increasedProductIndex] = increasedProduct
            return updateObject(state, {
                products: increasedProducts,
            })
        case 'DECREASE_PRODUCT':
            const decreasedProductIndex = state.products.findIndex(product => product.id === action.payload);
            const decreasedProduct = { ...state.products[decreasedProductIndex] }
            const decreasedProducts = [...state.products]
            if (decreasedProduct.quantity === 1) {
                decreasedProducts.splice(decreasedProductIndex, 1)
            } else {
                decreasedProduct.quantity = decreasedProduct.quantity - 1
                decreasedProducts[decreasedProductIndex] = decreasedProduct
            }
            return updateObject(state, {
                products: decreasedProducts,
            })
        case 'CHANGE_PRODUCT_EMPLOYEE':
            const changedEmployeeProductIndex = state.products.findIndex(product => product.id === action.payload.id);
            const changedEmployeeProduct = { ...state.products[changedEmployeeProductIndex] }
            changedEmployeeProduct.employee_id = action.payload.employeeId
            const changedEmployeeProducts = [...state.products]
            changedEmployeeProducts[changedEmployeeProductIndex] = changedEmployeeProduct
            return updateObject(state, {
                products: changedEmployeeProducts,
            })
        case 'ADD_TO_DEALS':
            const dealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const updatedDeals = [...state.deals]
            if (dealIndex === -1) {
                updatedDeals.push(action.payload)
            } else {
                const updatedItem = { ...updatedDeals[dealIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedDeals[dealIndex] = updatedItem
            }
            return updateObject(state, {
                deals: updatedDeals,
            })
        case 'REMOVE_DEAL':
            const filteredDeals = state.deals.filter(deal => deal.id !== action.payload)
            return updateObject(state, {
                deals: filteredDeals,
            })
        case 'INCREASE_DEAL':
            const increasedDealIndex = state.deals.findIndex(deal => deal.id === action.payload);
            const increasedDeal = { ...state.deals[increasedDealIndex] }
            increasedDeal.quantity = increasedDeal.quantity + 1
            const increasedDeals = [...state.deals]
            increasedDeals[increasedDealIndex] = increasedDeal
            return updateObject(state, {
                deals: increasedDeals,
            })
        case 'DECREASE_DEAL':
            const decreasedDealIndex = state.deals.findIndex(deal => deal.id === action.payload);
            const decreasedDeal = { ...state.deals[decreasedDealIndex] }
            const decreasedDeals = [...state.deals]
            if (decreasedDeal.quantity === 1) {
                decreasedDeals.splice(decreasedDealIndex, 1)
            } else {
                decreasedDeal.quantity = decreasedDeal.quantity - 1
                decreasedDeals[decreasedDealIndex] = decreasedDeal
            }
            return updateObject(state, {
                deals: decreasedDeals,
            })
        case 'CHANGE_DEAL_EMPLOYEE':
            const changedEmployeeDealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const changedEmployeeDeal = { ...state.deals[changedEmployeeDealIndex] }
            changedEmployeeDeal.employee_id = action.payload.employeeId
            const changedEmployeeDeals = [...state.deals]
            changedEmployeeDeals[changedEmployeeDealIndex] = changedEmployeeDeal
            return updateObject(state, {
                deals: changedEmployeeDeals,
            })
        default:
            return state;
    }
}


const EditModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, onDelete, fetchedEmployees, fetchEmployeesHandler, fetchedProducts, fetchProductsHandler, fetchedServices, fetchServicesHandler, fetchedDeals, fetchDealsHandler } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    const [bookingData, setBookingData] = useState({ items: [], user: { name: '', email: '', mobile: '' } });


    const [loading, setLoading] = useState(true);

    const [cartData, dispatch] = useReducer(cartReducer, {
        services: [],
        products: [],
        deals: [],
    });
    const [dateTime, setDateTime] = useState(new Date());

    const [bookingStatus, setBookingStatus] = useState('');

    const [selectedServices, setSelectedServices] = useState('');

    const [selectedProducts, setSelectedProducts] = useState('');

    const [selectedDeals, setSelectedDeals] = useState('');

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [discount, setDiscount] = useState(0)

    const [paymentGateway, setPaymentGateway] = useState('')

    const [paymentStatus, setPaymentStatus] = useState('');

    const [servicesEmployeeError, setServicesEmployeeError] = useState(false)

    const [hasVat, setHasVat] = useState(false);

    useEffect(() => {
        fetchEmployeesHandler(lang);
        fetchProductsHandler(lang, 1, 'all', 'name', 'desc');
        fetchServicesHandler(lang, 1, 'all', 'name', 'desc');
        fetchDealsHandler(lang, 1, 'all', 'name', 'desc');
    }, [fetchDealsHandler, fetchEmployeesHandler, fetchProductsHandler, fetchServicesHandler, lang])

    const fetchData = useCallback(() => {
        setLoading(true);
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const bookingDataEndpoint = `${v2.defaults.baseURL}/vendors/bookings/${id}?include[]=user&include[]=items`;
        const generalSettingsEndpoint = `${v1.defaults.baseURL}/vendors/settings/company`;

        const getUserData = axios.get(bookingDataEndpoint, headers);
        const getGeneralSettingsData = axios.get(generalSettingsEndpoint, headers);

        let bookingDataServices = [];
        let bookingDataProducts = [];
        let bookingDataDeals = [];

        axios.all([getUserData, getGeneralSettingsData])
            .then(axios.spread((...responses) => {
                setBookingData(responses[0].data);
                setBookingStatus(responses[0].data.status);
                setDateTime(moment.utc(responses[0].data.date_time));
                setPaymentStatus(responses[0].data.payment_status);
                setPaymentGateway(responses[0].data.payment_gateway);
                setHasVat(responses[1].data.has_vat);
                const items = responses[0].data.items;
                items.forEach(item => {
                    if (item.type === 'service') {
                        const obj = {
                            id: item.item_id,
                            quantity: item.quantity,
                            price: item.price,
                            item: {
                                name: item.name,
                                id: item.item_id,
                            }
                        }
                        if (item.employee) {
                            obj.employee_id = item.employee.id
                            obj.employee = item.employee;
                        }
                        bookingDataServices.push(obj)
                    } if (item.type === 'product') {
                        const obj = {
                            id: item.item_id,
                            quantity: item.quantity,
                            price: item.price,
                            item: {
                                name: item.name,
                                id: item.item_id,
                            }
                        }
                        if (item.employee) {
                            obj.employee_id = item.employee.id
                            obj.employee = item.employee;
                        }
                        bookingDataProducts.push(obj)
                    } if (item.type === 'deal') {
                        const obj = {
                            id: item.item_id,
                            quantity: item.quantity,
                            price: item.price,
                            item: {
                                name: item.name,
                                id: item.item_id,
                            }
                        }
                        if (item.employee) {
                            obj.employee_id = item.employee.id
                            obj.employee = item.employee;
                        }
                        bookingDataDeals.push(obj)
                    }
                })
                dispatch({ type: 'ADD_TO_CART', payload: { services: bookingDataServices, products: bookingDataProducts, deals: bookingDataDeals } });
                setLoading(false);
            }))
            .catch(error => {
                setLoading(false);
            });
    }, [id])
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [fetchData, id]);

    useEffect(() => {
        let total = 0;
        for (let section in cartData) {
            for (let item of cartData[section]) {
                total += item.price * item.quantity;
            }
        }
        total = total - ((total * discount / 100));
        setTotalTaxes(total - (total / 1.15))
        setTotalPrice(total);

    }, [cartData, discount])

    const addToCartHandler = useCallback((type, itemData) => {
        console.log(itemData)
        if (type === 'services') {
            dispatch({
                type: 'ADD_TO_SERVICES',
                payload: itemData
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'ADD_TO_PRODUCTS',
                payload: itemData
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'ADD_TO_DEALS',
                payload: itemData
            })
        }
    }, [])

    const removeFromCartHandler = useCallback((type, itemId) => {
        if (type === 'services') {
            dispatch({
                type: 'REMOVE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'REMOVE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'REMOVE_DEAL',
                payload: itemId
            })
        }
    }, [])

    const increaseItemHandler = useCallback((type, itemId) => {
        if (type === 'services') {
            dispatch({
                type: 'INCREASE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'INCREASE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'INCREASE_DEAL',
                payload: itemId
            })
        }
    }, [])
    const decreaseItemHandler = useCallback((type, itemId) => {
        if (type === 'services') {
            dispatch({
                type: 'DECREASE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'DECREASE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'DECREASE_DEAL',
                payload: itemId
            })
        }
    }, [])

    const changeEmployeeHandler = useCallback((type, itemId, employeeId) => {
        if (type === 'services') {
            dispatch({
                type: 'CHANGE_SERVICE_EMPLOYEE',
                payload: {
                    id: itemId,
                    employeeId: employeeId,
                },
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'CHANGE_PRODUCT_EMPLOYEE',
                payload: {
                    id: itemId,
                    employeeId: employeeId,
                },
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'CHANGE_DEAL_EMPLOYEE',
                payload: {
                    id: itemId,
                    employeeId: employeeId,
                },
            })
        }
    }, [])

    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };
    const bookingStatusChangeHandler = (event) => {
        setBookingStatus(event.target.value);
    }

    const selectedServicesChangeHandler = (event) => {
        setSelectedServices('');
        const selectedServiceIndex = fetchedServices.data.findIndex(service => service.id === event.target.value);
        const selectedServiceData = { ...fetchedServices.data[selectedServiceIndex] }
        const serviceData = {
            id: selectedServiceData.id,
            quantity: 1,
            price: selectedServiceData.price,
            total: selectedServiceData.price,
            item: {
                id: selectedServiceData.id,
                name: selectedServiceData.name,
                type: 'service',
                price: selectedServiceData.price,
            }
        }
        addToCartHandler('services', serviceData)
    }
    const selectedProductsChangeHandler = (event) => {
        setSelectedProducts('');
        const selectedProductIndex = fetchedProducts.data.findIndex(product => product.id === event.target.value);
        const selectedProductData = { ...fetchedProducts.data[selectedProductIndex] }
        const productData = {
            id: selectedProductData.id,
            quantity: 1,
            price: selectedProductData.price,
            total: selectedProductData.price,
            item: {
                id: selectedProductData.id,
                name: selectedProductData.name,
                type: 'product',
                price: selectedProductData.price,
            }
        }
        addToCartHandler('products', productData)
    }
    const selectedDealsChangeHandler = (event) => {
        setSelectedDeals('');
        const selectedDealIndex = fetchedDeals.data.findIndex(deal => deal.id === event.target.value);
        const selectedDealData = { ...fetchedDeals.data[selectedDealIndex] }
        const dealData = {
            id: selectedDealData.id,
            quantity: 1,
            price: selectedDealData.price,
            total: selectedDealData.price,
            item: {
                id: selectedDealData.id,
                name: selectedDealData.title,
                type: 'deal',
                price: selectedDealData.price,
            }
        }
        addToCartHandler('deals', dealData)
    }

    const discountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDiscount(event.target.value)
        }
    }
    const paymentStatusChangeHandler = (event) => {
        setPaymentStatus(event.target.value);
    }
    const paymentGatewayChangeHandler = (event) => {
        setPaymentGateway(event.target.value);
    }
    const EditBookingConfirmHandler = useCallback(() => {
        if (cartData.services.length > 0 && cartData.services.find(item => item.employee_id === null)) {
            setServicesEmployeeError(true)
            return;
        }
        const booking = {
            id: id,
            customerId: bookingData.user.id,
            dateTime: dateTime.format('YYYY-MM-DD hh:mm A'),
            payment_gateway: paymentGateway,
            payment_status: paymentStatus,
            status: bookingStatus,
            booking: {
                services: [
                    ...cartData.services,
                ],
                products: [
                    ...cartData.products,
                ],
                deals: [
                    ...cartData.deals,
                ],
            },
            couponId: bookingData.coupon && bookingData.coupon.id,
            discount: +discount,
            discount_type: 'percent',
        }
        onConfirm(booking);
    }, [bookingData.coupon, bookingData.user.id, bookingStatus, cartData.deals, cartData.products, cartData.services, dateTime, discount, id, onConfirm, paymentGateway, paymentStatus])


    let content;

    if (loading) {
        content = (
            <Loader height='50vh' />
        )
    } else {
        content = (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ClientDetails>
                        <ClientImg >
                            <PersonIcon />
                        </ClientImg>
                        <ClientName>{bookingData.user.name}</ClientName>
                    </ClientDetails>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('email')}</BookingDataHeading>
                        <BookingList>
                            <li><MailIcon sx={{ mr: 1 }} />{bookingData.user.email}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('phone')}</BookingDataHeading>
                        <BookingList>
                            <li><PhoneAndroidIcon sx={{ mr: 1 }} />{bookingData.user.mobile}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <DesktopDatePicker
                                    label={t("Date desktop")}
                                    inputFormat="DD-MM-YYYY"
                                    value={dateTime}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TimePicker
                                    label={t("Time")}
                                    value={dateTime}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField sx={{ width: '100%' }}  {...params} />}
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="booking-status">{t('booking status')}</InputLabel>
                        <Select
                            label={t('booking status')}
                            labelId='booking-status'
                            value={bookingStatus}
                            onChange={bookingStatusChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='approved'>{t('approved')}</MenuItem>
                            <MenuItem value='completed'>{t('completed')}</MenuItem>
                            <MenuItem value='canceled'>{t('canceled')}</MenuItem>
                            <MenuItem value='in progress'>{t('in progress')}</MenuItem>
                            <MenuItem value='pending'>{t('pending')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="services-label">{t('add services')}</InputLabel>
                        <Select
                            label={t('add services')}
                            labelId="services-label"
                            id="select-services"
                            value={selectedServices}
                            onChange={selectedServicesChangeHandler}
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
                <Grid item xs={12}>
                    {cartData.services.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="services table">
                                <SharedTableHead name='services' />
                                <TableBody>
                                    {cartData.services.map((row) => (
                                        <CartItem type='services' key={row.id} row={row} remove={removeFromCartHandler} increase={increaseItemHandler}
                                            decrease={decreaseItemHandler} fetchedEmployees={fetchedEmployees}
                                            changeEmployee={changeEmployeeHandler}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {
                        servicesEmployeeError && (
                            <ValidationMessage notExist>{t('Eash service must have an employee')}</ValidationMessage>
                        )
                    }
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="products-label">{t('add products')}</InputLabel>
                        <Select
                            label={t('add products')}
                            labelId="products-label"
                            id="select-products"
                            value={selectedProducts}
                            onChange={selectedProductsChangeHandler}
                        >
                            {fetchedProducts.data.map((product) => (
                                <MenuItem
                                    key={product.id}
                                    value={product.id}
                                >
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {cartData.products.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="products table">
                                <SharedTableHead name='products' />
                                <TableBody>
                                    {cartData.products.map((row) => (
                                        <CartItem type='products' key={row.id} row={row} remove={removeFromCartHandler} increase={increaseItemHandler} decrease={decreaseItemHandler}
                                            fetchedEmployees={fetchedEmployees} changeEmployee={changeEmployeeHandler} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="deals-label">{t('add deals')}</InputLabel>
                        <Select
                            label={t('add deals')}
                            labelId="deals-label"
                            id="select-deals"
                            value={selectedDeals}
                            onChange={selectedDealsChangeHandler}
                        >
                            {fetchedDeals.data.map((deal) => (
                                <MenuItem
                                    key={deal.id}
                                    value={deal.id}
                                >
                                    {deal.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {cartData.deals.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="deals table">
                                <SharedTableHead name='deals' />
                                <TableBody>
                                    {cartData.deals.map((row) => (
                                        <CartItem type='deals' key={row.id} row={row} remove={removeFromCartHandler} increase={increaseItemHandler} decrease={decreaseItemHandler}
                                            fetchedEmployees={fetchedEmployees} changeEmployee={changeEmployeeHandler} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('payment method')}</BookingDataHeading>
                        <BookingList>
                            <li><MoneyIcon sx={{ mr: 1 }} />{t(paymentGateway)}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('payment status')}</BookingDataHeading>
                        <BookingList>
                            <li>
                                {paymentStatus === 'completed' && <CheckCircleIcon sx={{ mr: 1, color: '#568d00' }} />}
                                {paymentStatus === 'pending' && <CloseIcon sx={{ mr: 1, color: 'rgb(187 163 46)' }} />}
                                {paymentStatus === 'refunded' && <CloseIcon sx={{ mr: 1, color: '#f00' }} />}
                                {t(paymentStatus)}
                            </li>
                        </BookingList>
                    </BookingData>
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
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="payment-status">{t('payment status')}</InputLabel>
                        <Select
                            labelId="payment-status"
                            label={t('payment status')}
                            value={paymentStatus}
                            onChange={paymentStatusChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='completed'>{t('completed')}</MenuItem>
                            <MenuItem value='pending'>{t('pending')}</MenuItem>
                            <MenuItem value='refunded'>{t('refunded')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="number"
                        label={t('Discount')}
                        id="discount-value"
                        sx={{ width: '100%' }}
                        value={discount}
                        onChange={discountChangeHandler}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                </Grid>
                {
                    hasVat && (
                        <Grid item xs={12} md={6}>
                            <BookingData>
                                <BookingDataHeading>{t('taxes ( 15% )')}</BookingDataHeading>
                                <BookingDataInfo>{formatCurrency(totalTaxes)}</BookingDataInfo>
                            </BookingData>
                        </Grid>
                    )
                }
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('total')}</BookingDataHeading>
                        <BookingDataInfo>{formatCurrency(totalPrice)}</BookingDataInfo>
                    </BookingData>
                </Grid>
                <Grid item xs={12}>
                    {/* <BookingActions>
                        <DeleteButton onClick={(id) => onDelete(bookingData.id)} >{t('Delete')}</DeleteButton>
                    </BookingActions> */}
                </Grid>
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={EditBookingConfirmHandler} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedEmployees: state.employees.employees,
        fetchedServices: state.services.services,
        fetchedProducts: state.products.products,
        fetchedDeals: state.deals.deals,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployeesHandler: (language) => dispatch(fetchEmployees(language)),
        fetchProductsHandler: (language, page, perPage, orderBy, orderDir) => dispatch(fetchProducts(language, page, perPage, orderBy, orderDir)),
        fetchServicesHandler: (language, page, perPage, orderBy, orderDir) => dispatch(fetchServices(language, page, perPage, orderBy, orderDir)),
        fetchDealsHandler: (language, page, perPage, orderBy, orderDir) => dispatch(fetchDeals(language, page, perPage, orderBy, orderDir)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
