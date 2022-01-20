import { Grid, Paper } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react"
import styled from 'styled-components';
import { fetchCoupons } from '../../../../../store/actions/index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import SharedTableHead from "./SharedTableHead/SharedTableHead";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import ThemeContext from "../../../../../store/theme-context";

const CustomMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    flex-grow: 1;
    padding: 20px;
    p {
        font-size: 24px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
`


const ItemsReview = props => {

    const { cartData, fetchedCoupons, fetchCouponsHandler, removeFromCart, increaseItem, decreaseItem, assignCoupon } = props;

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
            assignCoupon(enteredCoupon[0].id)
        } else {
            setCouponData({ amount: 0 })
            setCouponExists(false)
        }
    }

    let content = (
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
                                    <CartItem type='products' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} decrease={decreaseItem} />
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
        </Grid>
    )
    if ( cartData.products.length === 0 && cartData.services.length === 0 && cartData.deals.length === 0 ) {
        content = (
            <CustomMessage>
                <CustomMessage>
                    <p>{t('no items')}</p>
                </CustomMessage>
            </CustomMessage>
        )
    }

    return content;
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