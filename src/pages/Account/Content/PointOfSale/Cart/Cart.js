import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { Box, Grid, IconButton, useMediaQuery } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { format } from 'date-fns';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { ButtonConfirm, ButtonText, CustomButton } from '../../../../../components/UI/Button/Button';
import CustomCard from '../../../../../components/UI/Card/Card';
import Loader from '../../../../../components/UI/Loader/Loader';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import { formatCurrency } from '../../../../../shared/utility';
import { addCustomer } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import v2 from '../../../../../utils/axios-instance';
import v1 from '../../../../../utils/axios-instance-v1';
import AddCustomerModal from './AddCustomerModal/AddCustomerModal';
import CartItem from './CartItem/CartItem';
import SearchCustomer from './SearchCustomer/SearchCustomer';
import SharedTableHead from './SharedTableHead/SharedTableHead';

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
const AmountCalculator = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    p {
        font-size: 16px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 10px;
        color: ${({ theme }) => theme.palette.text.primary};
        &:last-child {
            margin-bottom: 0px;
        }
    }
`
const CartActions = styled.div`
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
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm - 1}px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
    }
`
const ActionsWrapper = styled.div`
    display: flex;
`
const AddCustomer = styled(CustomButton)`
    &.MuiButton-root {
        margin-bottom: 0;
        margin-left: 0px;
        width: auto;
        padding: 0 15px;
        height: 56px;
        min-width: unset;
        margin-left: 20px;
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md - 1}px) {
            margin-left: 10px;
            padding: 0 10px;
        }
    }
`


const CustomTextField = styled(TextField)`
    width: 100%;
`
const CustomFormGroup = styled.div`
    display: flex;
    align-items: center;
`
const OpenCartButton = styled(IconButton)`
    &.MuiIconButton-root {
        position        : fixed;
        display         : flex;
        align-items     : center;
        justify-content : center;
        width           : 50px;
        height          : 50px;
        bottom : 40px;
        right  : 15px;
        background-color: ${({ theme }) => theme.vars.secondary};
        color           : #FFF;
        border-radius   : 50%;
        text-align      : center;
        font-size       : 30px;
        box-shadow      : 2px 2px 3px rgba(0, 0, 0, 0.2);
        z-index         : 100;
        @media screen and ( min-width: ${({ theme }) => theme.breakpoints.values.md}px ) { 
            display: none;
        };
    }
`


const Cart = props => {

    const { cartData, removeFromCart, increaseItem, decreaseItem, resetCart, reserved, reset, purchase, print,
        addCustomerHandler, addedCustomerData, addingCustomerSuccess, addingCustomerFailed, addingCustomerMessage,
        creatingBooking, bookingCreated, creatingBookingFailed, creatingBookingMessage, priceChangeHandler, changeEmployee } = props;

    const { t } = useTranslation()


    const themeCtx = useContext(ThemeContext);
    const { lang, theme } = themeCtx;

    const [searchParams] = useSearchParams();

    const hasCustomer = searchParams.get('customer') !== null;
    const customer = hasCustomer ? searchParams.get('customer') : null;
    const customerName = hasCustomer ? searchParams.get('name') : null;
    const customerMobile = hasCustomer ? searchParams.get('number') : null;
    const intialCustomerData = {
        id: customer,
        name: customerName,
        mobile: customerMobile,
    }
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    const [mobileCartOpened, setMobileCartOpened] = useState(false);

    const [customerData, setCustomerData] = useState(hasCustomer ? intialCustomerData : {
        id: '',
        name: t('passing customer'),
    });
    const [customerDataError, setCustomerDataError] = useState(false)
    const [resetSearchData, setResetSearchData] = useState(false)

    const [dateTime, setDateTime] = useState(new Date());

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [cartDataError, setCartDataError] = useState(false)

    const [coupon, setCoupon] = useState('')
    const [couponExists, setCouponExists] = useState(false)
    const [couponData, setCouponData] = useState({ amount: 0 })

    const [discount, setDiscount] = useState(0)
    const [discountType, setDiscountType] = useState('percent');

    const [paymentGateway, setPaymentGateway] = useState('card')
    const [paymentGatewayError, setPaymentGatewayError] = useState(false)

    const [paidAmount, setPaidAmount] = useState(0)
    const [paidAmountError, setPaidAmountError] = useState(false)
    const [cashToReturn, setCashToReturn] = useState(0)
    const [cashRemainig, setCashRemainig] = useState(0)

    const [addCustomerModalOpened, setAddCustomerModalOpened] = useState(false);

    const [loading, setLoading] = useState(true);
    const [hasVat, setHasVat] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const interval = setInterval(() =>
            setDateTime(new Date())
        , 60000);
        return () => clearInterval(interval);
    } , [])

    useEffect(() => {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const vendorCouponsEndpoint = `${v2.defaults.baseURL}/vendors/coupons`;
        const vendorEmployeesEndpoint = `${v2.defaults.baseURL}/vendors/employees`;

        const getVendorCouponsData = axios.get(vendorCouponsEndpoint, headers);
        const getVendorEmployeesData = axios.get(vendorEmployeesEndpoint, headers);

        axios.all([getVendorCouponsData, getVendorEmployeesData])
            .then(axios.spread(( couponsRes, employeesRes) => {
                setLoading(false);
                setCoupons(couponsRes.data.data);
                setEmployees(employeesRes.data.data);
            }))
            .catch(err => {
                setLoading(false);
                if ( err.response.data.errors ) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        toast.error(errs[key][0])
                    }

                } else {
                    toast.error(err.response.data.message)
                }
            })
    }, [lang])
    useEffect(() => {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const generalSettingsEndpoint = `${v1.defaults.baseURL}/vendors/settings/company`;

        const getGeneralSettingsData = axios.get(generalSettingsEndpoint, headers);

        axios.all([getGeneralSettingsData])
            .then(axios.spread((settingsRes) => {
                setLoading(false);
                setHasVat(settingsRes.data.has_vat);
            }))
            .catch(err => {
                setLoading(false);
                if ( err.response.data.errors ) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        toast.error(errs[key][0])
                    }
                } else {
                    toast.error(err.response.data.message)
                }
            })
    }, [lang])

    useEffect(() => {
        if (addedCustomerData && addingCustomerSuccess) {
            setAddCustomerModalOpened(false);
            setCustomerData(addedCustomerData);
            toast.success(t('Customer added'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [addedCustomerData, addingCustomerSuccess, t])

    useEffect(() => {
        if (addingCustomerFailed && addingCustomerMessage) {
            toast.error(addingCustomerMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [addingCustomerFailed, addingCustomerMessage, t])

    useEffect(() => {
        let total = 0;
        for (let section in cartData) {
            for (let item of cartData[section]) {
                total += item.price * item.quantity;
            }
        }

        if (discountType === 'percent') {
            total = total - ((total * discount / 100));
        } else if (discountType === 'fixed') {
            total = total - discount;
        }
        if (couponData.discountType === 'percentage') {
            total = total - ((total * couponData.amount / 100));
        } else if (couponData.discountType === 'fixed') {
            total = total - couponData.amount;
        }

        setTotalTaxes(total - (total / 1.15))
        setTotalPrice(total);
        setPaidAmount(total);
        if (cartData.services.length !== 0 || cartData.products.length !== 0 || cartData.deals.length !== 0) {
            setCartDataError(false)
            return;
        }
    }, [cartData, couponData, discount, discountType])

    // Add Customer Modal
    const addCustomerModalOpenHandler = useCallback((id) => {
        setAddCustomerModalOpened(true);
    }, [])
    const addCustomerModalCloseHandler = useCallback(() => {
        setAddCustomerModalOpened(false);
    }, [])

    const addCustomerModalConfirmHandler = useCallback((data) => {
        addCustomerHandler(data);
    }, [addCustomerHandler])

    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };

    const selectCustomer = useCallback((value) => {
        if (value) {
            setCustomerDataError(false)
            setCustomerData(value);
        } else {
            setCustomerDataError(true)
            setCustomerData(null);
        }
        setResetSearchData(false)
    }, [])

    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }

    const paymentGatewayChangeHandler = (event) => {
        setPaymentGateway(event.target.value);
        setPaymentGatewayError(false)
    }

    const couponChangeHandler = (event) => {
        setCoupon(event.target.value)
        const enteredCoupon = coupons.filter(coupon => coupon.code === event.target.value)
        if (enteredCoupon.length > 0) {
            setCouponExists(true)
            setCouponData(enteredCoupon[0])
        } else {
            setCouponData({ amount: 0 })
            setCouponExists(false)
        }
    }

    const paidAmountChangeHandler = (event) => {
        const value = +event.target.value;
        if (value >= 0) {
            setPaidAmountError(false)
            setPaidAmount(value)
            if (value > totalPrice) {
                setCashToReturn(value - totalPrice)
                setCashRemainig(0)
            } else if (value === totalPrice) {
                setCashToReturn(0)
                setCashRemainig(0)
            } else if (value < totalPrice) {
                setCashToReturn(0)
                setCashRemainig(totalPrice - parseFloat(event.target.value))
            }
        }
    }

    const discountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDiscount(event.target.value)
        }
    }

    const mobileCartCloseHandler = useCallback(() => {
        setMobileCartOpened(false)
    }, [])

    const resetCartHandler = useCallback(() => {
        setCustomerData(null);
        setCustomerDataError(false)
        setDiscount(0)
        setDiscountType('percent')
        setCoupon('')
        setCouponData({ amount: 0 })
        setCouponExists(false)
        setPaymentGateway('card')
        setPaymentGatewayError(false)
        setPaidAmount(0)
        setCashToReturn(0)
        setCashRemainig(0)
        setCartDataError(false)
        setResetSearchData(true)
        resetCart();
    }, [resetCart])


    useEffect(() => {
        if (bookingCreated) {
            resetCartHandler();
            isMobile && mobileCartCloseHandler();
            toast.success(t('Booking Created'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [bookingCreated, isMobile, mobileCartCloseHandler, resetCartHandler, t])

    useEffect(() => {
        if (creatingBookingFailed && creatingBookingMessage) {
            toast.error(creatingBookingMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [bookingCreated, creatingBookingFailed, creatingBookingMessage, t])

    useEffect(() => {
        reserved && resetCartHandler();
        reserved && isMobile && mobileCartCloseHandler();
    }, [isMobile, mobileCartCloseHandler, reserved, reset, resetCartHandler])

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
        } else if (!couponExists && coupon) {
            return;
        } else if (paidAmount < 0) {
            setPaidAmountError(true)
            return;
        }
        const data = {
            customerId: customerData.id,
            dateTime: format(dateTime, 'yyyy-MM-dd hh:mm a'),
            cart: cartData,
            totalPrice: totalPrice,
            couponId: couponData.id ? couponData.id : null,
            discount: discount,
            discount_type: discountType,
            payment_gateway: paymentGateway,
            paid_amount: paidAmount,
        }
        purchase(data);
    }

    const purchasePrintCartHandler = (e) => {
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
        } else if (!couponExists && coupon) {
            return;
        } else if (paidAmount < 0) {
            setPaidAmountError(true)
            return;
        }
        const data = {
            customerId: customerData.id,
            dateTime: format(dateTime, 'yyyy-MM-dd hh:mm a'),
            cart: cartData,
            totalPrice: totalPrice,
            couponId: couponData.id ? couponData.id : null,
            discount: discount,
            discount_type: discountType,
            payment_gateway: paymentGateway,
            paid_amount: paidAmount,
        }
        print(data);
    }


    if (loading) {
        return <Loader height='80vh' />;
    }

    let mobileContent;
    if (isMobile) {
        mobileContent = <OpenCartButton onClick={() => setMobileCartOpened(true)} ><ShoppingCartIcon /></OpenCartButton>
    }

    return (
        <>
            <CustomCard heading='Add To Cart' isMobileModal={true} open={mobileCartOpened} handleClose={mobileCartCloseHandler} >
                <Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} >
                        <Grid item xs={12} >
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={6}>
                                        <DesktopDatePicker
                                            label={t("Date desktop")}
                                            inputFormat="MM/dd/yyyy"
                                            value={dateTime}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
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
                            <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select customer')}</FormLabel>
                            <ActionsWrapper>
                                <FormControl fullWidth sx={{ minWidth: '250px' }} >
                                    <SearchCustomer selectCustomer={selectCustomer} resetSearchData={resetSearchData} />
                                </FormControl>
                                <AddCustomer onClick={addCustomerModalOpenHandler} >{isMobile ? <PersonAddIcon /> : t('add')}</AddCustomer>
                            </ActionsWrapper>
                            {customerDataError && <ValidationMessage notExist>{t(`Please Choose Customer`)}</ValidationMessage>}
                        </Grid>
                        {
                            customerData && customerData.id !== '' && (
                                <Grid item xs={12}>
                                    <CustomerCard>
                                        <CustomerName>{customerData.name}</CustomerName>
                                        {
                                            customerData.mobile && (
                                                <CustomerInfo>
                                                    <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customerData.mobile}</li>
                                                </CustomerInfo>
                                            )
                                        }
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
                                <Grid container spacing={2}>
                                    {cartData.services.map((row) => (
                                        <Grid item xs={12} key={row.id}>
                                            <CartItem type='services' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem}
                                                fetchedEmployees={employees}
                                                priceChangeHandler={priceChangeHandler} changeEmployee={changeEmployee} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {cartData.products.length === 0 && (
                                <CustomMessage>
                                    <p>{t('No Products')}</p>
                                </CustomMessage>
                            )}
                            {cartData.products.length > 0 && (
                                <Grid container spacing={2}>
                                    {cartData.products.map((row) => (
                                        <Grid item xs={12} key={row.id}>
                                            <CartItem type='products' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem}
                                                fetchedEmployees={employees}
                                                priceChangeHandler={priceChangeHandler} changeEmployee={changeEmployee} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {cartData.deals.length === 0 && (
                                <CustomMessage>
                                    <p>{t('No Deals')}</p>
                                </CustomMessage>
                            )}
                            {cartData.deals.length > 0 && (
                                <Grid container spacing={2}>
                                    {cartData.deals.map((row) => (
                                        <Grid item xs={12} key={row.id}>
                                            <CartItem type='deals' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem}
                                                fetchedEmployees={employees}
                                                priceChangeHandler={priceChangeHandler} changeEmployee={changeEmployee} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                            {cartDataError && (
                                <ValidationMessage notExist>{t('Please Add Something')}</ValidationMessage>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <CustomFormGroup>
                                <CustomTextField
                                    type="number"
                                    label={t('Discount')}
                                    id="discount-value"
                                    sx={{ width: '100%' }}
                                    value={discount}
                                    onChange={discountChangeHandler}
                                />
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
                            {paymentGatewayError && (
                                <ValidationMessage notExist>{t('Please choose method')}</ValidationMessage>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <CouponWrapper>
                                <TextField
                                    label={t('Discount Coupon')}
                                    id="coupon-value"
                                    sx={{ flexGrow: '1' }}
                                    value={coupon}
                                    onChange={couponChangeHandler}
                                />
                                {couponExists && <ValidationMessage exist>{t('Coupon Exists')}</ValidationMessage>}
                                {!couponExists && coupon !== '' ? <ValidationMessage notExist>{t(`Coupon Doesn't Exist`)}</ValidationMessage> : null}
                            </CouponWrapper>
                        </Grid>
                        {hasVat && (
                            <Grid item xs={12}>
                                <PriceCalculation>
                                    <p>{t('total taxes')}</p>
                                    <p>{formatCurrency(totalTaxes)}</p>
                                </PriceCalculation>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <PriceCalculation>
                                <p>{t('price after discount')}</p>
                                <p>{formatCurrency(totalPrice)}</p>
                            </PriceCalculation>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="number"
                                label={t('paid amount')}
                                id="paid-amount"
                                sx={{ flexGrow: '1' }}
                                value={paidAmount}
                                onChange={paidAmountChangeHandler}
                            />
                            {paidAmountError && <ValidationMessage notExist>{t(`you must add the paid Amount`)}</ValidationMessage>}
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <AmountCalculator>
                                <p>{t('cash remaing')}</p>
                                <p>{formatCurrency(cashRemainig)}</p>
                            </AmountCalculator>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <AmountCalculator>
                                <p>{t('cash to return')}</p>
                                <p>{formatCurrency(cashToReturn)}</p>
                            </AmountCalculator>
                        </Grid>
                        <Grid item xs={12}>
                            <CartActions>
                                <ButtonConfirm disabled={creatingBooking} variant='contained' onClick={purchaseCartHandler}>{t('book')}</ButtonConfirm>
                                <ButtonConfirm disabled={creatingBooking} variant='contained' onClick={purchasePrintCartHandler}>{t('book & print')}</ButtonConfirm>
                                <ButtonText variant='text' onClick={resetCartHandler}>{t('reset cart')}</ButtonText>
                            </CartActions>
                        </Grid>
                    </Grid>
                </Box>
                <AddCustomerModal show={addCustomerModalOpened}
                    onClose={addCustomerModalCloseHandler} onConfirm={addCustomerModalConfirmHandler}
                    heading='add new customer' confirmText='add' />
            </CustomCard>
            {mobileContent}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        addedCustomerData: state.customers.posCustmers.addedCustomerData,
        addingCustomerSuccess: state.customers.addingCustomerSuccess,
        addingCustomerFailed: state.customers.addingCustomerFailed,
        addingCustomerMessage: state.customers.addingCustomerMessage,
        creatingBooking: state.bookings.creatingBooking,
        bookingCreated: state.bookings.bookingCreated,
        creatingBookingFailed: state.bookings.creatingBookingFailed,
        creatingBookingMessage: state.bookings.creatingBookingMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCustomerHandler: (data) => dispatch(addCustomer(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
