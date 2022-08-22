import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoneyIcon from '@mui/icons-material/Money';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { formatCurrency, updateObject } from '../../../../../shared/utility';
import CartItem from './CartItem/CartItem';
import SharedTableHead from './SharedTableHead/SharedTableHead';
//import { CustomButton } from '../../../../../components/UI/Button/Button';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import moment from 'moment';
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../../components/UI/Loader/Loader';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import { fetchDeals, fetchEmployees, fetchProducts, fetchServices } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import v2 from '../../../../../utils/axios-instance';

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

    const { show, heading, confirmText, onConfirm, onClose, id, } = props;

    const { t } = useTranslation();

    const [bookingData, setBookingData] = useState({ items: [], user: { name: '', email: '', mobile: '' } });

    const [loading, setLoading] = useState(true);

    const [dateTime, setDateTime] = useState(new Date());

    const [bookingStatus, setBookingStatus] = useState('');


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

        const getBookingData = axios.get(bookingDataEndpoint, headers);

        axios.all([getBookingData])
            .then(axios.spread((...responses) => {
                setBookingData(responses[0].data);
                setBookingStatus(responses[0].data.status);
                setDateTime(moment.utc(responses[0].data.date_time));
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


    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };
    const bookingStatusChangeHandler = (event) => {
        setBookingStatus(event.target.value);
    }

    const EditBookingConfirmHandler = useCallback(() => {
        const booking = {
            id: id,
            dateTime: dateTime.format('YYYY-MM-DD hh:mm A'),
            status: bookingStatus,
        }
        onConfirm(booking);
    }, [bookingStatus, dateTime, id, onConfirm])


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
