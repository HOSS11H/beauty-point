import CustomCard from '../../../../../components/UI/Card/Card';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid } from '@mui/material';
import styled, { css } from 'styled-components';
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
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SharedTableHead from './SharedTableHead/SharedTableHead';
import CartItem from './CartItem/CartItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import { ButtonText, ButtonConfirm } from '../../../../../components/UI/Button/Button';


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
const Message = styled.p`
    flex-basis: 100%;
    font-size: 15px;
    line-height:1.5;
    text-transform: uppercase;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.success.main};
    margin-top: 10px;;
    ${({ exist }) => exist && css`
        color: ${({ theme }) => theme.palette.success.main};
    `}
    ${({ notExist }) => notExist && css`
        color: ${({ theme }) => theme.palette.error.main};
    `}
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

const customers = [
    { id: 0, name: 'ahmed', email: 'mail.com', phone: '0123456789' },
    { id: 1, name: 'ali', email: 'mail.com', phone: '0123456789' },
    { id: 2, name: 'mahmoud', email: 'mail.com', phone: '0123456789' },
]
const coupons = [
    {
        "id": 1,
        "title": "SAVE $20",
        "code": "SAVE20",
        "startDateTime": "2021-10-28T14:15:09.000000Z",
        "usesLimit": 0,
        "amount": 20,
        "discountType": "percentage",
        "minimumPurchaseAmount": 20,
        "days": [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "description": "Limited Time Coupon !! HURRY UP.",
        "status": "active",
        "endDateTime": "2021-12-27T14:15:09.000000Z"
    },
    {
        "id": 7,
        "title": "SAVE $10",
        "code": "SAVE10",
        "startDateTime": "2021-10-28T14:15:09.000000Z",
        "usesLimit": 0,
        "amount": 10,
        "discountType": "percentage",
        "minimumPurchaseAmount": 20,
        "days": [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "description": "Limited Time Coupon !! HURRY UP.",
        "status": "active",
        "endDateTime": "2021-12-27T14:15:09.000000Z"
    }
]


const Cart = props => {

    const { cartData, removeFromCart, increaseItem, decreaseItem, resetCart, purchase } = props;

    const { t } = useTranslation()

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

    useEffect(() => {
        let total = 0;
        for (let section in cartData) {
            for (let item of cartData[section]) {
                total += item.price * item.quantity;
            }
        }
        total = total - ((total * discount / 100) + (total * couponData.amount / 100));
        setTotalTaxes(total - (total / 1.15))
        setTotalPrice(total - (total - (total / 1.15)));

        if (cartData.services.length !== 0 || cartData.products.length !== 0 || cartData.deals.length !== 0) {
            setCartDataError(false)
            return;
        }
    }, [cartData, couponData, discount])

    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };

    const handleCustomerChange = (event) => {
        const customerIndex = customers.findIndex(customer => customer.id === event.target.value);
        const updatedCustomerData = customers[customerIndex];
        setCustomerDataError(false)
        setCustomer(event.target.value);
        setCustomerData(updatedCustomerData);
    };


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
    const discountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setDiscount(event.target.value)
        }
    }

    const resetCartHandler = (  ) => {
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
        }
        const data = {
            customer: customerData,
            dateTime: dateTime,
            cart: cartData,
            totalPrice: totalPrice,
            totalTaxes: totalTaxes,
            coupon: couponData,
            discount: discount,
        }
        purchase(data);
        console.log(data)
        resetCartHandler();
    }

    return (
        <CustomCard heading='Add To Cart' >
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <DesktopDatePicker
                                        label="Date desktop"
                                        inputFormat="MM/dd/yyyy"
                                        value={dateTime}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TimePicker
                                        label="Time"
                                        value={dateTime}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField sx={{ width: '100%' }}  {...params} />}
                                    />
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="item-customer">{t('Customer')}</InputLabel>
                            <Select
                                labelId="item-customer"
                                id="item-customer-select"
                                value={customer}
                                label="Customer"
                                onChange={handleCustomerChange}
                            >
                                {
                                    customers.map(customer => {
                                        return <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        {customerDataError && <Message notExist>{t(`Please Choose Customer`)}</Message>}
                    </Grid>
                    {
                        customerData && (
                            <Grid item xs={12}>
                                <CustomerCard>
                                    <CustomerName>{customerData.name}</CustomerName>
                                    <CustomerInfo>
                                        <li><MailIcon sx={{ mr: 1 }} />{customerData.email}</li>
                                        <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customerData.phone}</li>
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
                                    <SharedTableHead />
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
                                    <SharedTableHead />
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
                                    <SharedTableHead />
                                    <TableBody>
                                        {cartData.deals.map((row) => (
                                            <CartItem type='deals' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {cartDataError && (
                            <Message notExist>{t('Please Add Something')}</Message>
                        )}
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <CouponWrapper>
                            <TextField
                                label={t('Coupon')}
                                id="coupon-value"
                                sx={{ flexGrow: '1' }}
                                value={coupon}
                                onChange={couponChangeHandler}
                            />
                            {couponExists && <Message exist>{t('Coupon Exists')}</Message>}
                            {!couponExists && coupon !== '' ? <Message notExist>{t(`Coupon Doesn't Exist`)}</Message> : null}
                        </CouponWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <PriceCalculation>
                            <p>{t('total taxes')}</p>
                            <p>{totalTaxes.toFixed(2)}</p>
                        </PriceCalculation>
                    </Grid>
                    <Grid item xs={12}>
                        <PriceCalculation>
                            <p>{t('price after discount')}</p>
                            <p>{totalPrice.toFixed(2)}</p>
                        </PriceCalculation>
                    </Grid>
                    <Grid item xs={12}>
                        <CardActions>
                            <ButtonText variant='text' onClick={resetCartHandler}>{t('reset cart')}</ButtonText>
                            <ButtonConfirm variant='contained' onClick={purchaseCartHandler}>{t('purchase')}</ButtonConfirm>
                        </CardActions>
                    </Grid>
                </Grid>
            </form>
        </CustomCard>
    )
}

export default Cart;