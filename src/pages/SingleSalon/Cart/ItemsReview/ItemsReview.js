import { Grid, Paper, TextField } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react"
import styled from 'styled-components';
import ValidationMessage from "../../../../components/UI/ValidationMessage/ValidationMessage";
import { formatCurrency } from "../../../../shared/utility";
import { fetchCoupons  } from '../../../../store/actions/index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import SharedTableHead from "./SharedTableHead/SharedTableHead";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import ThemeContext from "../../../../store/theme-context";

const CouponWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
`

const PriceCalculation = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
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


const ItemsReview = props => {

    const { cartData, fetchedCoupons, fetchCouponsHandler, removeFromCart, increaseItem, decreaseItem } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [coupon, setCoupon] = useState('')
    const [couponExists, setCouponExists] = useState(false)
    const [couponData, setCouponData] = useState({ amount: 0 })


    useEffect(() => {
        let total = 0;
        for (let section in cartData) {
            for (let item of cartData[section]) {
                total += item.price * item.quantity;
            }
        }

        if (couponData.discountType === 'percentage') {
            total = total - ((total * couponData.amount / 100));
        } else if (couponData.discountType === 'fixed') {
            total = total - couponData.amount;
        }

        setTotalTaxes(total - (total / 1.15))
        setTotalPrice(total);
    }, [cartData, couponData])

    useEffect(() => {
        fetchCouponsHandler(lang);
    }, [fetchCouponsHandler, lang])

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
    return (
        <Grid container>
            <Grid item xs={12}>
                {cartData.services.length > 0 && (
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="services table">
                            <SharedTableHead name='services' />
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
                {cartData.products.length > 0 && (
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="products table">
                            <SharedTableHead name='products' />
                            <TableBody>
                                {cartData.products.map((row) => (
                                    <CartItem type='products' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem}  />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>
            <Grid item xs={12}>
                {cartData.deals.length > 0 && (
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="deals table">
                            <SharedTableHead name='deals' />
                            <TableBody>
                                {cartData.deals.map((row) => (
                                    <CartItem type='deals' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedCoupons: state.coupons.coupons,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCouponsHandler: (lang) => dispatch(fetchCoupons(lang)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsReview);