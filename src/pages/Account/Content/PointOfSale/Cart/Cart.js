import CustomCard from '../../../../../components/UI/Card/Card';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SharedTableHead from './SharedTableHead/SharedTableHead';
import CartItem from './CartItem/CartItem';
import InputAdornment from '@mui/material/InputAdornment';
import { ButtonText, ButtonConfirm, CustomButton } from '../../../../../components/UI/Button/Button';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import { connect } from 'react-redux';
import { fetchCoupons, fetchCustomers, addCustomer, fetchEmployees } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AddCustomerModal from './AddCustomerModal/AddCustomerModal';
import { formatCurrency } from '../../../../../shared/utility';


const CustomerCard = styled.div`
    padding: 20px;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
    `
const CustomerName = styled.h4`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    `
const CustomerInfo = styled.ul`
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

const CouponWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
const CardActions = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
`
const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
`
const AddCustomer = styled(CustomButton)`
    &.MuiButton-root {
        margin-left: 20px;
        width: auto;
        padding: 0 10px;
        height: 56px;
        flex-shrink: 0;
    }
`

const Cart = props => {

    const { cartData, removeFromCart, increaseItem, decreaseItem, resetCart, purchase, fetchedCoupons, fetchedCustomers, fetchCouponsHandler, fetchCustomersHandler, addCustomerHandler, fetchedEmployeesHandler } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [customer, setCustomer] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [customerDataError, setCustomerDataError] = useState(false)


    const [dateTime, setDateTime] = useState(new Date());

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [cartDataError, setCartDataError] = useState(false)

    const [coupon, setCoupon] = useState('')
    const [couponExists, setCouponExists] = useState(false)
    const [couponData, setCouponData] = useState({ amount: 0 })

    const [discount, setDiscount] = useState(0)

    const [paymentGateway, setPaymentGateway] = useState('')
    const [paymentGatewayError, setPaymentGatewayError] = useState(false)

    const [addCustomerModalOpened, setAddCustomerModalOpened] = useState(false);

    useEffect(() => {
        fetchCouponsHandler(lang);
        fetchCustomersHandler(lang);
        fetchedEmployeesHandler(lang);
    }, [fetchCouponsHandler, fetchCustomersHandler, fetchedEmployeesHandler, lang])

    useEffect(() => {
        let total = 0;
        for (let section in cartData) {
            for (let item of cartData[section]) {
                total += item.price * item.quantity;
            }
        }
        total = total - ((total * discount / 100) + (total * couponData.amount / 100));
        setTotalTaxes(total - (total / 1.15))
        setTotalPrice(total);

        if (cartData.services.length !== 0 || cartData.products.length !== 0 || cartData.deals.length !== 0) {
            setCartDataError(false)
            return;
        }
    }, [cartData, couponData, discount])


    // Add Customer Modal
    const addCustomerModalOpenHandler = useCallback((id) => {
        setAddCustomerModalOpened(true);
    }, [])
    const addCustomerModalCloseHandler = useCallback(() => {
        setAddCustomerModalOpened(false);
    }, [])

    const addCustomerModalConfirmHandler = useCallback((data) => {
        setAddCustomerModalOpened(false);
        addCustomerHandler(data);
    }, [addCustomerHandler])


    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };

    const handleCustomerChange = (event) => {
        const customerIndex = fetchedCustomers.findIndex(customer => customer.id === event.target.value);
        const updatedCustomerData = fetchedCustomers[customerIndex];
        setCustomerDataError(false)
        setCustomer(event.target.value);
        setCustomerData(updatedCustomerData);
    };

    const paymentGatewayChangeHandler = (event) => {
        setPaymentGateway(event.target.value);
        setPaymentGatewayError(false)
    }


    const couponChangeHandler = (event) => {
        setCoupon(event.target.value)
        const enteredCoupon = fetchedCoupons.filter(coupon => coupon.code === event.target.value)
        if (enteredCoupon.length > 0) {
            setCouponExists(true)
            setCouponData(enteredCoupon[0])
        } else {
            setCouponData({ amount: 0 })
            setCouponExists(false)
        }
    }
    const discountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDiscount(event.target.value)
        }
    }

    const resetCartHandler = () => {
        setCustomer('');
        setCustomerData(null);
        setCustomerDataError(false)
        setDiscount(0)
        setCoupon('')
        setCouponData({ amount: 0 })
        setCouponExists(false)
        resetCart();
    }
    const purchaseCartHandler = (e) => {
        e.preventDefault();
        if (cartData.services.length === 0 && cartData.products.length === 0 && cartData.deals.length === 0) {
            setCartDataError(true)
            return;
        } else if (!customerData) {
            setCustomerDataError(true)
            return;
        } else if (!paymentGateway) {
            setPaymentGatewayError(true)
            return;
        }
        const data = {
            customerId: customerData.id,
            dateTime: dateTime,
            cart: cartData,
            totalPrice: totalPrice,
            totalTaxes: totalTaxes,
            couponId: couponData.id,
            discount: discount,
        }
        purchase(data);
        resetCartHandler();
    }

    return (
        <CustomCard heading='Add To Cart' >
            <Grid container spacing={3}>
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
                <Grid item xs={12} md={6}>
                    <ActionsWrapper>
                        <FormControl fullWidth sx={{minWidth: '200px' }} >
                            <InputLabel id="item-customer">{t('Customer')}</InputLabel>
                            <Select
                                labelId="item-customer"
                                id="item-customer-select"
                                value={customer}
                                label="Customer"
                                onChange={handleCustomerChange}
                            >
                                {fetchedCustomers.map((customer) => (
                                    <MenuItem
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <AddCustomer onClick={addCustomerModalOpenHandler} >{t('add')}</AddCustomer>
                    </ActionsWrapper>
                    {customerDataError && <ValidationMessage notExist>{t(`Please Choose Customer`)}</ValidationMessage>}
                </Grid>
                {
                    customerData && (
                        <Grid item xs={12}>
                            <CustomerCard>
                                <CustomerName>{customerData.name}</CustomerName>
                                <CustomerInfo>
                                    <li><MailIcon sx={{ mr: 1 }} />{customerData.email}</li>
                                    <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customerData.mobile}</li>
                                </CustomerInfo>
                            </CustomerCard>
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    {cartData.services.length === 0 && (
                        <CustomMessage>
                            <p>{t('No Services')}</p>
                        </CustomMessage>
                    )}
                    {cartData.services.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="services table">
                                <SharedTableHead name= 'services' />
                                <TableBody>
                                    {cartData.services.map((row) => (
                                        <CartItem type='services' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
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
                                <SharedTableHead name= 'products' />
                                <TableBody>
                                    {cartData.products.map((row) => (
                                        <CartItem type='products' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {cartData.deals.length === 0 && (
                        <CustomMessage>
                            <p>{t('No Deals')}</p>
                        </CustomMessage>
                    )}
                    {cartData.deals.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="deals table">
                                <SharedTableHead name= 'deals' />
                                <TableBody>
                                    {cartData.deals.map((row) => (
                                        <CartItem type='deals' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {cartDataError && (
                        <ValidationMessage notExist>{t('Please Add Something')}</ValidationMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} >
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
                        <InputLabel id="payment-label">{t('payment method')}</InputLabel>
                        <Select
                            labelId="payment-label"
                            value={paymentGateway}
                            onChange={paymentGatewayChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='cash'>{t('cash')}</MenuItem>
                            <MenuItem value='card'>{t('card')}</MenuItem>
                        </Select>
                    </FormControl>
                    {paymentGatewayError && (
                        <ValidationMessage notExist>{t('Please choose method')}</ValidationMessage>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <CouponWrapper>
                        <TextField
                            label={t('Coupon')}
                            id="coupon-value"
                            sx={{ flexGrow: '1' }}
                            value={coupon}
                            onChange={couponChangeHandler}
                        />
                        {couponExists && <ValidationMessage exist>{t('Coupon Exists')}</ValidationMessage>}
                        {!couponExists && coupon !== '' ? <ValidationMessage notExist>{t(`Coupon Doesn't Exist`)}</ValidationMessage> : null}
                    </CouponWrapper>
                </Grid>
                <Grid item xs={12}>
                    <PriceCalculation>
                        <p>{t('total taxes')}</p>
                        <p>{formatCurrency(totalTaxes)}</p>
                    </PriceCalculation>
                </Grid>
                <Grid item xs={12}>
                    <PriceCalculation>
                        <p>{t('price after discount')}</p>
                        <p>{formatCurrency(totalPrice)}</p>
                    </PriceCalculation>
                </Grid>
                <Grid item xs={12}>
                    <CardActions>
                        <ButtonText variant='text' onClick={resetCartHandler}>{t('reset cart')}</ButtonText>
                        <ButtonConfirm variant='contained' onClick={purchaseCartHandler}>{t('purchase')}</ButtonConfirm>
                    </CardActions>
                </Grid>
            </Grid>
            <AddCustomerModal show={addCustomerModalOpened}
                onClose={addCustomerModalCloseHandler} onConfirm={addCustomerModalConfirmHandler}
                heading='add new customer' confirmText='add' />
        </CustomCard>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedCustomers: state.customers.customers,
        fetchedCoupons: state.coupons.coupons,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomersHandler: (lang) => dispatch(fetchCustomers(lang)),
        fetchCouponsHandler: (lang) => dispatch(fetchCoupons(lang)),
        fetchedEmployeesHandler: (lang) => dispatch(fetchEmployees(lang)),
        addCustomerHandler: (data) => dispatch(addCustomer(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
