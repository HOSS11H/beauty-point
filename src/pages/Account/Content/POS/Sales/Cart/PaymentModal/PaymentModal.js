import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { FormControl, Grid, IconButton, MenuItem, Select, TextField } from "@mui/material";
import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loader from "../../../../../../../components/UI/Loader/Loader";
import { POSModal } from "../../../../../../../components/UI/POSModal/POSModal";
import ValidationMessage from "../../../../../../../components/UI/ValidationMessage/ValidationMessage";
import { formatCurrency } from "../../../../../../../shared/utility";
import ThemeContext from "../../../../../../../store/theme-context";
import axios from '../../../../../../../utils/axios-instance';
import PrintBooking from './PrintBooking/PrintBooking';

const CouponWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const CartInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    padding-bottom: 5px;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px ) {
        font-size: 15px;
    }
    &:not(:first-child) {
        padding-top: 5px;
    }
    &:last-child {
        border-bottom: 0;
    }
    span {
        font-weight: 700;
    }
`

const PaymentAction = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 5px 0 10px;
    height: 40px;
`

const CustomTextField = styled(TextField)`
    &.MuiTextField-root {
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }

        /* Firefox */
        input[type=number] {
        -moz-appearance: textfield;
        }
    }
`

const PaymentsWrapper = styled.div`

`
const Payment = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
    span {
        &:first-child {
            margin-right: 15px;
        }
    }
`
const Chip = styled.span`
    background: ${({ theme }) => theme.palette.secondary.main};
    color: ${({ theme }) => theme.palette.common.white};
    text-transform: capitalize;
    padding: 5px 10px;
    border-radius: 10px;
    margin-right: auto;
`

const PaymentModal = props => {

    const { open, handleClose, items, discount, discountType, hasVat, resetCart, dateTime, customerId } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)

    const { city } = themeCtx

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [paymentGateway, setPaymentGateway] = useState('card')

    const [amountToPay, setAmountToPay] = useState(0)


    const [payments, setPayments] = useState([])

    const [coupons, setCoupons] = useState([]);
    const [loadingCoupons, setLoadingCoupons] = useState(false);

    const [coupon, setCoupon] = useState('')
    const [couponExists, setCouponExists] = useState(false)
    const [couponData, setCouponData] = useState({ discountType: 'amount', amount: 0 })

    const [reservingBooking, setReservingBooking] = useState(false)
    const [reservedBookingData, setReservedBookingData] = useState(null)

    const fetchCoupons = useCallback((searchParams) => {
        setLoadingCoupons(true)
        axios.get(`/vendors/coupons`)
            .then(response => {
                setCoupons(response.data.data);
                setLoadingCoupons(false)
            })
            .catch(err => {
                toast.error(t('Error Getting Coupons'))
                setLoadingCoupons(false)
            })
    }, [t])

    useEffect(() => {
        fetchCoupons()
    }, [fetchCoupons])

    useEffect(() => {
        let total = 0;
        for (let section in items) {
            for (let item of items[section]) {
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
        } else if (couponData.discountType === 'amount') {
            total = total - couponData.amount;
        }

        setTotalTaxes((total - (total / 1.15)).toFixed(2))
        setTotalPrice(total.toFixed(2));
        setAmountToPay(total.toFixed(2));
    }, [couponData, discount, discountType, items])

    useEffect(() => {
        let totalPaid = 0;
        if (payments.length > 0) {
            totalPaid = payments.reduce((acc, cur) => {
                return acc + cur.amount
            }, 0)
        }
        setAmountToPay(totalPrice - totalPaid)
    }, [payments, totalPrice])

    const amountToPayChangeHandler = (e) => {
        const value = +e.target.value;
        !isNaN(value) && setAmountToPay(value)
    }

    const paymentGatewayChangeHandler = (event) => {
        setPaymentGateway(event.target.value);
    }

    const addPaymentHandler = () => {
        if (+amountToPay > +totalPrice) { return; }
        if (+amountToPay <= 0) return ;
        let totalPaid = payments.reduce((acc, cur) => {
            return acc + cur?.amount
        }, 0)
        if ((+amountToPay + totalPaid) > totalPrice  ) {return; }
        const obj = {
            amount: +amountToPay,
            type: paymentGateway
        }
        setPayments(prevState => {
            return [
                ...prevState,
                obj,
            ]
        })
    }

    const deletePaymentHandler = (index) => {
        let updatedPayments = [...payments]
        updatedPayments.splice(index, 1)
        setPayments(updatedPayments)
    }

    const couponChangeHandler = (event) => {
        setCoupon(event.target.value)
        const enteredCoupon = coupons.find(coupon => coupon.code === event.target.value)
        if (enteredCoupon) {
            setCouponExists(true)
            setCouponData(enteredCoupon)
            return;
        }
        setCouponData({ amount: 0 })
        setCouponExists(false)
    }

    const bookOrderHandler = () => {
        const data = {
            customerId: customerId,
            dateTime: moment(dateTime).format('YYYY-MM-DD hh:mm A'),
            cart: items,
            couponId: couponData.id ? couponData.id : null,
            discount: discount,
            discount_type: discountType,
            payments: payments,
            location_id: city,
        }
        setReservingBooking(true);
        axios.post(`/vendors/bookings`, data)
            .then(response => {
                setReservingBooking(false);
                setReservedBookingData(response.data);
                resetCart()
            })
            .catch(err => {
                setReservingBooking(false);
                const errs = err.response.data ? err.response.data.errors : { message: [err.response.data.message] };
                for (let key in errs) {
                    toast.error(errs[key][0], {
                        position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                        closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                    });
                }
            })
    }

    let content;

    if (reservedBookingData) {
        content = (
            <PrintBooking bookingData={reservedBookingData} />
        )
    } else {
        content = (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {loadingCoupons ? <Loader height='40px' /> : (
                        <CouponWrapper>
                            <TextField
                                label={t('Discount Coupon')}
                                id="coupon-value"
                                sx={{ flexGrow: '1' }}
                                value={coupon}
                                size="small"
                                onChange={couponChangeHandler}
                                disabled={payments.length > 0}
                            />
                            {couponExists && <ValidationMessage small exist>{t('Coupon Exists')}</ValidationMessage>}
                            {!couponExists && coupon !== '' && <ValidationMessage small notExist>{t(`Coupon Doesn't Exist`)}</ValidationMessage>}
                        </CouponWrapper>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <PaymentsWrapper>
                        {payments.map((payment, index) => {
                            return (
                                <Payment key={index} >
                                    <span>
                                        {formatCurrency(payment.amount)}
                                    </span>
                                    <Chip>
                                        {t(payment.type)}
                                    </Chip>
                                    <IconButton color='error' onClick={deletePaymentHandler.bind(null, index)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </Payment>
                            )
                        })}
                    </PaymentsWrapper>
                </Grid>
                <Grid item xs={12}>
                    <PaymentAction>
                        <CustomTextField type="number" sx={{ width: 120 }} id="amount-value" variant='standard' value={amountToPay} onChange={amountToPayChangeHandler} />
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <Select id="payment-type" value={paymentGateway} onChange={paymentGatewayChangeHandler} inputProps={{ 'aria-label': 'Without label' }} label={t('Payment Type')} >
                                <MenuItem value='cash'>{t('cash')}</MenuItem>
                                <MenuItem value='card'>{t('card')}</MenuItem>
                                <MenuItem value='transfer'>{t('transfer')}</MenuItem>
                                <MenuItem value='online'>{t('online')}</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton color='secondary' onClick={addPaymentHandler} >
                            <AddCircleIcon />
                        </IconButton>
                    </PaymentAction>
                </Grid>
                <Grid item xs={12}>
                    <CartInfoWrapper>
                        <span>{t('Discount')}</span>
                        <span>{formatCurrency(discount)}</span>
                    </CartInfoWrapper>
                    {couponExists && (
                        <CartInfoWrapper>
                            <span>{t('Coupon Discount')}</span>
                            <span>{formatCurrency(couponData.amount)}</span>
                        </CartInfoWrapper>
                    )}
                    {hasVat && (
                        <CartInfoWrapper>
                            <span>{t('total taxes')}</span>
                            <span>{formatCurrency(totalTaxes)}</span>
                        </CartInfoWrapper>
                    )}
                    <CartInfoWrapper>
                        <span>{t('price after discount')}</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </CartInfoWrapper>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={reservingBooking}
                        disabled={payments.length <= 0} variant='contained'
                        onClick={bookOrderHandler}
                        color='secondary' sx={{ width: '100%', mt: 1 }} >{t('book')}</LoadingButton>
                </Grid>
            </Grid>
        )
    }

    return (
        <POSModal open={open} handleClose={handleClose} heading='Pay' >
            {content}
        </POSModal>
    )
}
export default PaymentModal;