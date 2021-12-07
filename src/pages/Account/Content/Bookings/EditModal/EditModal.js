import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DateAdapter from '@mui/lab/AdapterDateFns';
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
import PendingIcon from '@mui/icons-material/Pending';
import { formatCurrency, updateObject } from '../../../../../shared/utility';
import { CustomButton } from '../../../../../components/UI/Button/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees, fetchProducts, fetchServices } from '../../../../../store/actions/index';
import InputAdornment from '@mui/material/InputAdornment';
import ThemeContext from '../../../../../store/theme-context';

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
const BookingActions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`
const CustomMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 70px;
    flex-grow: 1;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
    p {
        font-size: 24px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
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
        default:
            return state;
    }
}


const EditModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedBookings, onDelete, fetchedEmployees, fetchEmployeesHandler, fetchedProducts, fetchProductsHandler, fetchedServices, fetchServicesHandler } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    const bookingIndex = fetchedBookings.data.findIndex(booking => booking.id === id);

    let bookingData = fetchedBookings.data[bookingIndex];

    const { status, date_time, users, payment } = bookingData;

    let employeesIds = [];
    users.map(employee => {
        employeesIds.push(employee.id)
        return employeesIds;
    })

    let bookingDataServices = [];
    let bookingDataProducts = [];
    const splittedItems = bookingData.items.map(item => {
        if (item.item.type === 'service') {
            bookingDataServices.push(item)
        } if (item.item.type === 'product') {
            bookingDataProducts.push(item)
        }
        return bookingDataServices;
    })
    console.log(splittedItems)

    const [cartData, dispatch] = useReducer(cartReducer, {
        services: bookingDataServices,
        products: bookingDataProducts,
    });
    const [dateTime, setDateTime] = useState(new Date(date_time));

    const [bookingStatus, setBookingStatus] = useState(status);

    const [employeeName, setEmployeeName] = useState(employeesIds);

    const [selectedServices, setSelectedServices] = useState('');

    const [selectedProducts, setSelectedProducts] = useState('');

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [discount, setDiscount] = useState(0)

    const [paymentStatus, setPaymentStatus] = useState(payment.status);

    useEffect(() => {
        fetchEmployeesHandler(lang);
        fetchProductsHandler(lang, 1, 'all', 'name', 'desc');
        fetchServicesHandler(lang, 1, 'all', 'name', 'desc');
    }, [fetchEmployeesHandler, fetchProductsHandler, fetchServicesHandler, lang])

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

    const addToCartHandler = useCallback(( type, itemData ) => {
        if ( type === 'services' ) {
            dispatch({
                type: 'ADD_TO_SERVICES',
                payload: itemData
            })
        }
        if ( type === 'products' ) {
            dispatch({
                type: 'ADD_TO_PRODUCTS',
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
    }, [])


    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };
    const bookingStatusChangeHandler = (event) => {
        setBookingStatus(event.target.value);
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

    const discountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDiscount(event.target.value)
        }
    }
    const paymentStatusChangeHandler = (event) => {
        setPaymentStatus(event.target.value);
    }
    const EditBookingConfirmHandler = useCallback(() => {

        const employeesData = [];
        employeeName.map(employeeId => {
            const employeeIndex = fetchedEmployees.findIndex(employee => employee.id === employeeId);
            employeesData.push(fetchedEmployees[employeeIndex]);
            return employeesData;
        })

        const booking = {
            ...bookingData,
            id: id,
            date_time: dateTime,
            status: bookingStatus,
            users: employeesData,
            items: [
                cartData.services,
                cartData.products,
            ]
        }
        onConfirm(booking);
    }, [bookingData, bookingStatus, cartData.products, cartData.services, dateTime, employeeName, fetchedEmployees, id, onConfirm])


    let content;

    if (bookingData) {

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
                                    inputFormat="MM/dd/yyyy"
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
                        <Select
                            value={bookingStatus}
                            onChange={bookingStatusChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='approved'>{t('approved')}</MenuItem>
                            <MenuItem value='completed'>{t('completed')}</MenuItem>
                            <MenuItem value='canceled'>{t('canceled')}</MenuItem>
                            <MenuItem value='in progress'>{t('in progress')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="employee-label">{t('employee')}</InputLabel>
                        <Select
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
                                >
                                    {employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="services-label">{t('add services')}</InputLabel>
                        <Select
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
                    {cartData.services.length === 0 && (
                        <CustomMessage>
                            <p>{t('No Services')}</p>
                        </CustomMessage>
                    )}
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
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="products-label">{t('add products')}</InputLabel>
                        <Select
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
                    {cartData.products.length === 0 && (
                        <CustomMessage>
                            <p>{t('No Products')}</p>
                        </CustomMessage>
                    )}
                    {cartData.products.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="products table">
                                <SharedTableHead name='products' />
                                <TableBody>
                                    {cartData.products.map((row) => (
                                        <CartItem type='products' key={row.id} row={row} remove={removeFromCartHandler} increase={increaseItemHandler} decrease={decreaseItemHandler} />
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
                            <li><MoneyIcon sx={{ mr: 1 }} />{bookingData.payment.gateway}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('payment status')}</BookingDataHeading>
                        <BookingList>
                            <li>{paymentStatus === 'completed' ? <CheckCircleIcon sx={{ mr: 1, color: '#568d00' }} /> : <PendingIcon sx={{ mr: 1, color: '#f9b904' }} />}{t(paymentStatus)}</li>
                        </BookingList>
                    </BookingData>
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
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                        <Select
                            value={paymentStatus}
                            onChange={paymentStatusChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='completed'>{t('completed')}</MenuItem>
                            <MenuItem value='pending'>{t('pending')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('taxes ( 15% )')}</BookingDataHeading>
                        <BookingDataInfo>{formatCurrency(totalTaxes)}</BookingDataInfo>
                    </BookingData>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('total')}</BookingDataHeading>
                        <BookingDataInfo>{formatCurrency(totalPrice)}</BookingDataInfo>
                    </BookingData>
                </Grid>
                <Grid item xs={12}>
                    <BookingActions>
                        <DeleteButton onClick={(id) => onDelete(bookingData.id)} >{t('Delete')}</DeleteButton>
                    </BookingActions>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployeesHandler: (language) => dispatch(fetchEmployees(language)),
        fetchProductsHandler: (language, page, perPage, orderBy, orderDir) => dispatch(fetchProducts(language, page, perPage, orderBy, orderDir)),
        fetchServicesHandler: (language, page, perPage, orderBy, orderDir) => dispatch(fetchServices(language, page, perPage, orderBy, orderDir)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);