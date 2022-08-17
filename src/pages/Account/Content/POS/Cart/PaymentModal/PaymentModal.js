import { Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { POSModal } from "../../../../../../components/UI/POSModal/POSModal";
import DateAdapter from '@mui/lab/AdapterMoment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import ValidationMessage from "../../../../../../components/UI/ValidationMessage/ValidationMessage";
import axios from '../../../../../../utils/axios-instance';
import { toast } from 'react-toastify';
import { formatCurrency } from "../../../../../../shared/utility";


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

const PaymentModal = props => {

    const { open, handleClose, items, discount, discountType, resetCart, dateTime } = props;

    const { t } = useTranslation()

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [paymentGateway, setPaymentGateway] = useState('card')
    const [paymentGatewayError, setPaymentGatewayError] = useState(false)

    const [paidAmount, setPaidAmount] = useState(0)
    const [paidAmountError, setPaidAmountError] = useState(false)
    const [cashToReturn, setCashToReturn] = useState(0)
    const [cashRemainig, setCashRemainig] = useState(0)

    const [coupons, setCoupons] = useState([]);
    const [loadingCoupons, setLoadingCoupons] = useState(false);

    const [coupon, setCoupon] = useState('')
    const [couponExists, setCouponExists] = useState(false)
    const [couponData, setCouponData] = useState({ discountType: 'amount', amount: 0 })


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

        setTotalTaxes(total - (total / 1.15))
        setTotalPrice(total);
        setPaidAmount(total);
    }, [couponData, discount, discountType, items])



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

    return (
        <POSModal open={open} handleClose={handleClose} heading='Pay' >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CouponWrapper>
                        <TextField
                            label={t('Discount Coupon')}
                            id="coupon-value"
                            sx={{ flexGrow: '1' }}
                            value={coupon}
                            onChange={couponChangeHandler}
                        />
                        {couponExists && <ValidationMessage small exist>{t('Coupon Exists')}</ValidationMessage>}
                        {!couponExists && coupon !== '' && <ValidationMessage small notExist>{t(`Coupon Doesn't Exist`)}</ValidationMessage>}
                    </CouponWrapper>
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
                        <CartInfoWrapper>
                            <span>{t('total taxes')}</span>
                            <span>{formatCurrency(totalTaxes)}</span>
                        </CartInfoWrapper>
                        <CartInfoWrapper>
                            <span>{t('price after discount')}</span>
                            <span>{formatCurrency(totalPrice)}</span>
                        </CartInfoWrapper>
                </Grid>
            </Grid>
        </POSModal>
    )
}
export default PaymentModal;