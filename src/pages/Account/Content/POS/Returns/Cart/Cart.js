import CloseIcon from '@mui/icons-material/Close';
import DateAdapter from '@mui/lab/AdapterMoment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Button, Card, IconButton, TextField, useMediaQuery } from "@mui/material";
import { Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import Loader from "../../../../../../components/UI/Loader/Loader";
import { formatCurrency } from "../../../../../../shared/utility";
import ThemeContext from '../../../../../../store/theme-context';
import v1 from '../../../../../../utils/axios-instance-v1';
import CartItem from "./CartItem/CartItem";
import ChooseCustomer from "./ChooseCustomer/ChooseCustomer";
import PaymentModal from "./PaymentModal/PaymentModal";

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
        @media screen and (max-width: ${ ({theme}) => theme.breakpoints.values.md }px ) {
            position: fixed;
            top: 0;
            right: 0;
            left:0;
            botom: 0;
            height: 100vh;
            z-index: ${ ({ theme }) => theme.zIndex.modal - 2 };
            opacity: 0;
            visibility: hidden;
            transform: translateY(-100%);
            transition: 0.3s ease-in-out;
            ${ ( { $show } ) => $show && css`
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            ` }
        }
    }
`

const ItemsWrapper = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    height: calc(100vh - 444px);
    max-height: calc(100vh - 444px);
    padding-right: 10px;
    overflow-y: auto;
    min-height: 0;
    @media screen and (max-width: ${ ({theme}) => theme.breakpoints.values.md }px ) {
        height: calc(100vh - 435px);
        max-height: calc(100vh - 435px);
    }
    // Scroll //
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        height: 7px;
        width: 8px;
        background-color: ${({ theme }) => theme.palette.divider};
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        margin-left: 2px;
        background: ${({ theme }) => theme.vars.primary};
        border-radius: 10px;
        cursor: pointer;
    }
`

const CartInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    padding-bottom: 5px;
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

const Cart = props => {

    const themeCtx = useContext(ThemeContext)

    const isTablet = useMediaQuery(themeCtx.theme.breakpoints.down('md'), { noSsr: true });

    const { items, bookingData, removeItem, increaseItem, resetCartItems,resetBooking,  showCart, hideCart } = props;

    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [hasVat, setHasVat] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [paymentModalOpened, setPaymentModalOpened] = useState(false)

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() =>
            setDateTime(new Date())
            , 60000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        let total = 0;
        for (let section in items) {
            for (let item of items[section]) {
                total += item.price * item.quantity;
            }
        }

        setTotalTaxes((total - (total / 1.15)).toFixed(2))
        setTotalPrice(total.toFixed(2));
    }, [items])


    const fetchVatInfos = useCallback(() => {
        setLoading(true)
        v1.get(`/vendors/settings/company`)
            .then(response => {
                setLoading(false);
                setHasVat(response.data.has_vat);
            })
            .catch(err => {
                setLoading(false);
                if (err.response.data.errors) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        toast.error(errs[key][0])
                    }
                } else {
                    toast.error(err.response.data.message)
                }
            })
    }, [])

    useEffect(() => {
        fetchVatInfos()
    }, [fetchVatInfos])

    const openPaymentModalHandler = useCallback(() => {
        setPaymentModalOpened(true)
    }, [])
    const closePaymentModalHandler = useCallback(() => {
        setPaymentModalOpened(false)
    }, [])

    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };

    const formatedItems = useMemo(() => {
        let returnedItems = [];
        Object.keys(items).forEach(item => {
            returnedItems.push(...items[item])
        })
        return returnedItems
    }, [items])

    const payDisabled = formatedItems.length <= 0

    const resetCartHandler = () => {
        resetCartItems()
        resetBooking()
    }

    if (loading) {
        return <Loader height='75vh' />
    }

    return (
        <Fragment>
            <Wrapper $show={showCart} >
                {isTablet && (
                    <Box sx={{ display:'flex', alignItems: 'center', height: '40px', mb:1 }}>
                        <IconButton onClick={hideCart} >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ) }
                <ChooseCustomer customerData={bookingData?.user} />
                <Box sx={{ mt: '10px' }} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                            label={t("Booking Date & time")}
                            inputFormat="DD-MM-YYYY hh:mm a"
                            value={dateTime}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <ItemsWrapper>
                    {formatedItems.map((item, index) => {
                        return (
                            <CartItem key={index} item={item} remove={removeItem} increase={increaseItem} 
                                type={item.type} />
                        )
                    })}
                </ItemsWrapper>
                <div>
                    {hasVat && (
                        <CartInfoWrapper>
                            <span>{t('total taxes')}</span>
                            <span>{formatCurrency(totalTaxes)}</span>
                        </CartInfoWrapper>
                    )}
                    <CartInfoWrapper>
                        <span>{t('amount')}</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </CartInfoWrapper>
                </div>
                <Button
                    disabled={payDisabled} variant='contained'
                    onClick={openPaymentModalHandler}
                    color='secondary' sx={{ width: '100%', mt: 1 }} >{t('pay')}</Button>
            </Wrapper>
            {paymentModalOpened && (
                <PaymentModal
                    open={paymentModalOpened} handleClose={closePaymentModalHandler}
                    dateTime={dateTime} hasVat={hasVat}
                    items={items} bookingId={bookingData?.id}
                    resetCart={resetCartHandler} />
            )}
        </Fragment>
    )
}
export default Cart;