import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import cashImg from "../../../../images/pages/cart/cash.png";
import cardImg from "../../../../images/pages/cart/card.png";
import { formatCurrency } from "../../../../shared/utility";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ValidationMessage from "../../../../components/UI/ValidationMessage/ValidationMessage";

const Wrapper = styled.div`

`

const InfoMessage = styled.div`
    text-align: center;
    margin-bottom: 30px;
    h5 {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 600;
        color :${({ theme }) => theme.vars.theme};
    }
    p {
        font-size: 18px;
        line-height: 1.5;
        font-weight: 500;
        color :${({ theme }) => theme.vars.theme};
    }
`

const PaymentMethod = styled.div`
    text-align: center;
    padding: 40px;
    border-radius: 20px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.vars.theme};
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    @media screen and (max-width: 899.98px) {
        max-height: 180px;
        padding: 20px
    }
    @media screen and (max-width: 599.98px) {
        padding: 20px;
        height: 150px;
    }
    &.disabled{
        cursor: not-allowed;
        filter: grayscale(1);
    }
    img {
        max-width: 100%;
        margin-bottom: 10px;
        object-fit: cover;
        @media screen and (max-width: 899.98px) {
            max-width: 100px;
        }
        @media screen and (max-width: 599.98px) {
            max-width: 70px;
        }
    }
    h5 {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 600;
        color :${({ theme }) => theme.vars.theme};
        text-transform:capitalize;
        @media screen and (max-width: 599.98px) {
            font-size: 16px;
        }
    }
`
const CouponWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 20px;
`

const DepositPanel = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: rgba(150,36,142, 0.1);
    h6 {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 600;
        color :${({ theme }) => theme.vars.theme};
        text-transform:capitalize;
    }
`

const ChoosePayment = props => {

    const { handlePayment, assignCoupon, assignCouponData, fetchedCoupons, couponData } = props;

    const { t } = useTranslation();

    const [coupon, setCoupon] = useState(couponData.code ? couponData.code : "");
    const [couponExists, setCouponExists] = useState(false)

    useEffect(() => {
        if (couponData.code) {
            const enteredCoupon = fetchedCoupons.filter(coupon => coupon.code === couponData.code)
            if (enteredCoupon.length > 0) {
                setCouponExists(true)
                assignCouponData(enteredCoupon[0])
                assignCoupon(enteredCoupon[0].id)
            } else {
                assignCouponData({ amount: 0 })
                setCouponExists(false)
            }
        }
    }, [assignCoupon, assignCouponData, coupon, couponData.code, fetchedCoupons])

        const couponChangeHandler = (event) => {
            setCoupon(event.target.value)
            const enteredCoupon = fetchedCoupons.filter(coupon => coupon.code === event.target.value)
            if (enteredCoupon.length > 0) {
                setCouponExists(true)
                assignCouponData(enteredCoupon[0])
                assignCoupon(enteredCoupon[0].id)
            } else {
                assignCouponData({ amount: 0 })
                setCouponExists(false)
            }
        }

        return (
            <Wrapper>
                <InfoMessage>
                    <h5>{t('When would you like to pay for the service?')}</h5>
                    <p>{t('You can either pay now or pay locally on arrival. You will be able to select payment method in the next step.')}</p>
                </InfoMessage>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <PaymentMethod onClick={() => handlePayment('cash')}>
                            <img src={cashImg} alt='vector' />
                            <h5>{t('cash')}</h5>
                        </PaymentMethod>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <PaymentMethod /* onClick={() => handlePayment('card')} */ className='disabled'>
                            <img src={cardImg} alt='vector' />
                            <h5>{t('credit card')}</h5>
                        </PaymentMethod>
                    </Grid>
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
                {/* <DepositPanel>
                <h6>{`${t('Deposit amount :')} ${formatCurrency(10)}`}</h6>
            </DepositPanel> */}
            </Wrapper>
        )
    }
const mapStateToProps = (state) => {
        return {
            fetchedCoupons: state.coupons.coupons,
        }
    }

    export default connect(mapStateToProps, null)(ChoosePayment);