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
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ReactSelect, { components } from 'react-select';

import FormLabel from '@mui/material/FormLabel';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SharedTableHead from './SharedTableHead/SharedTableHead';
import CartItem from './CartItem/CartItem';
import { ButtonText, ButtonConfirm, CustomButton } from '../../../../../components/UI/Button/Button';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import { connect } from 'react-redux';
import { fetchCoupons, searchCustomers, addCustomer, fetchEmployees } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AddCustomerModal from './AddCustomerModal/AddCustomerModal';
import { formatCurrency } from '../../../../../shared/utility';
import { Fragment } from 'react';


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
        padding: 0 15px;
        height: 38px;
        flex-shrink: 0;
    }
`
const CustomTextField = styled(TextField)`
    width: 100%;
`
const CustomFormGroup = styled.div`
    display: flex;
    align-items: center;
`

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#000',
    }),
};
const CustomerSelectOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const CustomerSelectName = styled.h4`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.dark};
    transition: 0.3s ease-in-out;
    margin-bottom: 0px;
`
const CustomerSelectInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.default};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 16px;
            height: 16px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`

const Option = (props) => {
    return (
        <Fragment>
            <components.Option {...props}>
                <CustomerSelectOption>
                    <CustomerSelectName>{props.children}</CustomerSelectName>
                    <CustomerSelectInfo>
                        <li><PhoneAndroidIcon sx={{ mr: 1 }} />{props.data.mobile}</li>
                    </CustomerSelectInfo>
                </CustomerSelectOption>
            </components.Option>
        </Fragment>
    );
};

const Cart = props => {

    const { cartData, removeFromCart, increaseItem, decreaseItem, resetCart, reserved, reset, purchase, print, fetchedCoupons, fetchedCustomers, addedCustomerData, addingCustomerSuccess, fetchCouponsHandler, searchCustomersHandler, addCustomerHandler, fetchedEmployeesHandler, bookingCreated, priceChangeHandler, changeEmployee } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [customerInput, setCustomerInput] = useState('');
    const [customer, setCustomer] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [customerDataError, setCustomerDataError] = useState(false)

    const [options, setOptions] = useState([])

    const [dateTime, setDateTime] = useState(new Date());

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [ servicesEmployeeError , setServicesEmployeeError ] = useState(false)
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

    useEffect(() => {
        fetchCouponsHandler(lang);
        fetchedEmployeesHandler(lang);
    }, [fetchCouponsHandler, fetchedEmployeesHandler, lang])

    useEffect(() => {
        if ( addedCustomerData && addingCustomerSuccess ) {
            setCustomerData(addedCustomerData);
        }
    },[addedCustomerData, addingCustomerSuccess])

    useEffect(() => {
        let total = 0;
        for (let section in cartData) {
            for (let item of cartData[section]) {
                total += item.price * item.quantity;
            }
        }

        if ( discountType === 'percent' ) {
            total = total - ((total * discount / 100) );
        } else if ( discountType === 'fixed') {
            total = total - discount ;
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

    useEffect(() => {
        if (fetchedCustomers) {
            setOptions(fetchedCustomers.map(customer => {
                return {
                    value: customer.id,
                    label: customer.name,
                    mobile: customer.mobile,
                }
            }))
        }
    }, [fetchedCustomers])

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

    const handleSelectOptions = (value, actions) => {
        if (value.length !== 0) {
            setCustomerInput(value);
        }
    }

    useEffect(() => {
        if (customerInput.length !== 0) {
            const searchTimeout = setTimeout(() => {
                searchCustomersHandler(lang, customerInput)
            }, 1000)
            return () => clearTimeout(searchTimeout);
        }
    }, [customerInput, lang, searchCustomersHandler])

    const filterOption = (option, inputValue) => {
        if (option.data?.mobile?.includes(inputValue)) {
            return true
        }
        if (option.label.toLowerCase().includes(inputValue.toLowerCase())) {
            return true
        }
    }

    const handleSelectCustomer = (value, actions) => {
        if (value) {
            const customerIndex = fetchedCustomers.findIndex(customer => customer.id === value.value);
            const updatedCustomerData = fetchedCustomers[customerIndex];
            setCustomerDataError(false)
            setCustomer(value);
            setCustomerData(updatedCustomerData);
        } else {
            setCustomerDataError(true)
            setCustomer(null)
            setCustomerData(null);
        }
    }

    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }

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

    const paidAmountChangeHandler = (event) => {
        const value = +event.target.value;
        if (value >= 0) {
            setPaidAmountError(false)
            setPaidAmount(value)
            if ( value > totalPrice) {
                setCashToReturn( value - totalPrice )
                setCashRemainig(0)
            } else if ( value === totalPrice) {
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

    const resetCartHandler = useCallback(() => {
        setCustomer(null);
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
        resetCart();
    }, [resetCart])


    useEffect(() => {
        bookingCreated && resetCartHandler();
    }, [bookingCreated, resetCartHandler])

    useEffect(() => {
        reserved && resetCartHandler();
    }, [reserved, reset, resetCartHandler])


    const purchaseCartHandler = (e) => {
        e.preventDefault();
        if (cartData.services.length === 0 && cartData.products.length === 0 && cartData.deals.length === 0) {
            setCartDataError(true)
            return;
        } else if ( cartData.services.length > 0 && cartData.services.find( item => item.employee_id === null  ) ) {
            setServicesEmployeeError(true)
            return;
        } else if (!customerData) {
            setCustomerDataError(true)
            return;
        } else if (!paymentGateway) {
            setPaymentGatewayError(true)
            return;
        } else if (!couponExists && coupon) {
            return;
        } else if (paidAmount < 1) {
            setPaidAmountError(true)
            return;
        }
        const data = {
            customerId: customerData.id,
            dateTime: dateTime,
            cart: cartData,
            totalPrice: totalPrice,
            totalTaxes: totalTaxes,
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
        } else if ( cartData.services.length > 0 && cartData.services.find( item => item.employee_id === null  ) ) {
            setServicesEmployeeError(true)
            return;
        } else if (!customerData) {
            setCustomerDataError(true)
            return;
        } else if (!paymentGateway) {
            setPaymentGatewayError(true)
            return;
        } else if (!couponExists && coupon) {
            return;
        } else if (paidAmount < 1) {
            setPaidAmountError(true)
            return;
        }
        const data = {
            customerId: customerData.id,
            dateTime: dateTime,
            cart: cartData,
            totalPrice: totalPrice,
            totalTaxes: totalTaxes,
            couponId: couponData.id ? couponData.id : null,
            discount: discount,
            discount_type: discountType,
            payment_gateway: paymentGateway,
            paid_amount: paidAmount,
        }
        print(data);
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
                    <FormLabel component="legend" sx={{ textAlign: 'left', textTransform: 'capitalize', marginBottom: '8px' }} >{t('select customer')}</FormLabel>
                    <ActionsWrapper>
                        <FormControl fullWidth sx={{ minWidth: '250px' }} >
                            <ReactSelect styles={customStyles} options={options} isClearable isRtl={lang === 'ar'} filterOption={filterOption} components={{ Option }}
                                value={customer} onChange={handleSelectCustomer} onInputChange={handleSelectOptions} />
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
                        <Fragment>
                            <TableContainer component={Paper} sx={{ my: 2 }}>
                                <Table aria-label="services table">
                                    <SharedTableHead name='services' />
                                    <TableBody>
                                        {cartData.services.map((row) => (
                                            <CartItem type='services' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} priceChangeHandler={priceChangeHandler} changeEmployee={changeEmployee} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {
                                servicesEmployeeError && (
                                    <ValidationMessage notExist>{t('Eash service must have an employee')}</ValidationMessage>
                                )
                            }
                        </Fragment>
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
                                <SharedTableHead name='products' />
                                <TableBody>
                                    {cartData.products.map((row) => (
                                        <CartItem type='products' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} priceChangeHandler={priceChangeHandler} />
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
                                <SharedTableHead name='deals' />
                                <TableBody>
                                    {cartData.deals.map((row) => (
                                        <CartItem type='deals' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} priceChangeHandler={priceChangeHandler} />
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
                    <TextField
                        fullWidth
                        type="number"
                        label={t('paid amount')}
                        id="paid-amount"
                        sx={{ flexGrow: '1' }}
                        value={paidAmount}
                        onChange={paidAmountChangeHandler}
                        />
                    {paidAmountError &&<ValidationMessage notExist>{t(`you must add the paid Amount`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AmountCalculator>
                        <p>{t('cash remaing')}</p>
                        <p>{formatCurrency(cashRemainig)}</p>
                    </AmountCalculator>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AmountCalculator>
                        <p>{t('cash to return')}</p>
                        <p>{formatCurrency(cashToReturn)}</p>
                    </AmountCalculator>
                </Grid>
                <Grid item xs={12}>
                    <CardActions>
                        <ButtonText variant='text' onClick={resetCartHandler}>{t('reset cart')}</ButtonText>
                        <ButtonConfirm variant='contained' onClick={purchaseCartHandler}>{t('book')}</ButtonConfirm>
                        <ButtonConfirm variant='contained' onClick={purchasePrintCartHandler}>{t('book & print')}</ButtonConfirm>
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
        fetchedCustomers: state.customers.posCustmers.customers,
        addedCustomerData: state.customers.posCustmers.addedCustomerData,
        addingCustomerSuccess: state.customers.addingCustomerSuccess,
        fetchedCoupons: state.coupons.coupons,
        bookingCreated: state.bookings.bookingCreated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchCustomersHandler: (lang, word) => dispatch(searchCustomers(lang, word)),
        fetchCouponsHandler: (lang) => dispatch(fetchCoupons(lang)),
        fetchedEmployeesHandler: (lang) => dispatch(fetchEmployees(lang)),
        addCustomerHandler: (data) => dispatch(addCustomer(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
