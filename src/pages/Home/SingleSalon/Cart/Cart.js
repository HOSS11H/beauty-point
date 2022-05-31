import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid } from '@mui/material';
import { useCallback, useEffect, useReducer, useState } from 'react';
import CartHeadliner from './CartHeadliner/CartHeadliner';
import ChooseType from './ChooseType/ChooseType';
import ChooseItem from './ChooseItem/ChooseItem';
import ChooseAppointment from './ChooseAppointment/ChooseAppointment';
import UserAuth from './UserAuth/UserAuth';
import ChoosePayment from './ChoosePayment/ChoosePayment';
import axios from '../../../../utils/axios-instance';
import { updateObject } from '../../../../shared/utility';
import ItemsReview from './ItemsReview/ItemsReview';
import PrintBooking from './PrintBooking/PrintBooking';
import { format } from 'date-fns/esm';
import CartSummary from './CartSummary/CartSummary';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCoupons } from '../../../../store/actions/index';
import { useContext } from 'react';
import ThemeContext from '../../../../store/theme-context';
import { useSearchParams } from 'react-router-dom';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        z-index:1290;
        width: 70%;
        @media screen and (max-width: 1399.98px) {
            width: 90%;
        }
        @media screen and (max-width: 899.98px) {
            width: 90%;
        }
    }
`;

const CartContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    height: 100%;
`
const CartBody = styled.div`
    margin-top: 25px;
    flex-grow: 1;
    width: 100%;
    padding: 0 25px 25px;
    max-height: 70vh;
    overflow-y: auto;
    // Scroll //
    -webkit-overflow-scrolling: touch;
    @media screen and (max-width: 899.98px) {
        max-height: 40vh;
        padding:  0 15px 25px;
    }
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

const CartButton = styled(Button)`
    &.MuiButton-root {
        background: ${({ theme }) => theme.vars.primary};
        color: ${({ theme }) => theme.palette.common.white};
        transition: 0.3s ease-in-out;
        border-radius: 10px;
        &:disabled {
            background: #eee;
            color: #999;
            box-shadow: none;
        }
        &:hover {
            background: ${({ theme }) => theme.palette.secondary.dark};
        }
    }
`

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_SERVICES':
            const serviceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const updatedServices = [...state.services]
            if (serviceIndex === -1) {
                updatedServices.push(action.payload)
            } else {
                updatedServices.splice(serviceIndex, 1)
            }
            return updateObject(state, {
                services: updatedServices,
            })
        case 'REMOVE_SERVICE':
            const filteredServices = state.services.filter(service => service.id !== action.payload)
            return updateObject(state, {
                services: filteredServices,
            })
        case 'ADD_TO_DEALS':
            const dealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const updatedDeals = [...state.deals]
            if (dealIndex === -1) {
                updatedDeals.push(action.payload)
            } else {
                updatedDeals.splice(dealIndex, 1)
            }
            return updateObject(state, {
                deals: updatedDeals,
            })
        case 'REMOVE_DEAL':
            const filteredDeals = state.deals.filter(deal => deal.id !== action.payload)
            return updateObject(state, {
                deals: filteredDeals,
            })
        case 'RESET_CART':
            const intialState = {
                services: [],
                products: [],
                deals: [],
            }
            return updateObject(state, intialState)
        default:
            return state;
    }
}

const steps = ['Select type', 'select items', 'review items', 'Select appointment', 'user infos', 'choose Payment', 'print receipt'];

const Cart = props => {

    const { t } = useTranslation();

    const [searchParams] = useSearchParams();

    const itemType = searchParams.get('t');
    const itemId = searchParams.get('i');
    const itemName = searchParams.get('n');
    const itemPrice = searchParams.get('p');

    let intialCart = {
        services: [],
        deals: [],
    };
    let intialType = '';
    if (itemType) {
        const purchasedItem = {
            id: +itemId,
            name: itemName,
            price: +itemPrice,
            quantity: 1,
        }
        if (itemType === 'service') {
            intialCart = {
                services: [purchasedItem],
                deals: [],
            }
        } else if (itemType === 'deal') {
            intialCart = {
                services: [],
                deals: [purchasedItem],
            }
        }
        if (itemType === 'service') {
            intialType = 'services'
        } else if (itemType === 'deal') {
            intialType = 'deals'
        }
    }

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const { show, onClose, salonData, fetchCouponsHandler } = props;

    const [cart, dispatch] = useReducer(cartReducer, intialCart);

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [activeStep, setActiveStep] = useState(itemType ? 1 : 0);

    const [selectedType, setSelectedType] = useState(intialType);

    const [appointment, setAppointment] = useState(new Date());
    const [slot, setSlot] = useState('');
    const [hasSelectedAppointment, setHasSelectedAppointment] = useState(false);

    const [userInfos, setUserInfos] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('');

    const [couponId, setCouponId] = useState(null);
    const [couponData, setCouponData] = useState({ amount: 0 })

    const [resevedBookingData, setReservedBookingData] = useState(null);

    const [bookingDone, setBookingDone] = useState(false);



    useEffect(() => {
        let total = 0;
        for (let section in cart) {
            for (let item of cart[section]) {
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
    }, [cart, couponData])

    useEffect(() => {
        fetchCouponsHandler(lang);
    }, [fetchCouponsHandler, lang])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChoosetype = useCallback((type) => {
        setSelectedType(type);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, [])

    const addToCartHandler = useCallback((itemData) => {
        if (selectedType === 'services') {
            dispatch({
                type: 'ADD_TO_SERVICES',
                payload: itemData
            })
        }
        if (selectedType === 'products') {
            dispatch({
                type: 'ADD_TO_PRODUCTS',
                payload: itemData
            })
        }
        if (selectedType === 'deals') {
            dispatch({
                type: 'ADD_TO_DEALS',
                payload: itemData
            })
        }
    }, [selectedType])

    const removeFromCartHandler = useCallback((type, itemId) => {
        //console.log(type, itemId)
        if (type === 'services') {
            dispatch({
                type: 'REMOVE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'REMOVE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'REMOVE_DEAL',
                payload: itemId
            })
        }
    }, [])

    const resetCartHandler = useCallback(() => {
        dispatch({
            type: 'RESET_CART',
        })
    }, [])

    const handleAppointment = useCallback((date) => {
        setAppointment(date);
        setSlot('');
    }, [])

    const handleSlot = useCallback((slot) => {
        setSlot(slot);
        setHasSelectedAppointment(true);
    }, [])

    const handleCoupon = useCallback(id => {
        setCouponId(id);
    }, [])
    const handleCouponData = useCallback(data => {
        setCouponData(data);
    }, [])

    const handleChoosePayment = useCallback((payment) => {
        setPaymentMethod(payment);
        const chosenDate = format(appointment, 'yyyy-MM-dd');
        const combined = chosenDate + " " + slot;
        if (payment === 'cash') {
            let data = {
                company_id: salonData.id,
                dateTime: combined,
                payment_gateway: payment,
                cart: cart,
                couponId: couponId,
            };
            axios.post(`/bookings`, data)
                .then(response => {
                    setReservedBookingData(response.data);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                })
                .catch(err => {
                    //console.log(err);
                })
        }
    }, [appointment, cart, couponId, salonData.id, slot])

    const storeUserInfos = useCallback((infos) => {
        setUserInfos(infos);
    }, [])

    const handleBookingDone = useCallback(() => {
        setBookingDone(true);
    }, [])

    const ResetCart = () => {
        if (bookingDone) {
            handleReset();
            setSelectedType('');
            setAppointment(new Date());
            setSlot('');
            setHasSelectedAppointment(false);
            setUserInfos('');
            setPaymentMethod('');
            setCouponId(null);
            setReservedBookingData(null);
            setBookingDone(false);
            resetCartHandler();
            onClose();
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={show}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '1299',
            }}
        >
            <Fade in={show}>
                <CustomCardMui>
                    <Grid container spacing={0} >
                        <Grid item xs={12} md={3}>
                            <CartHeadliner activeStep={activeStep} salonName={salonData.companyName} steps={steps} />
                        </Grid>
                        <Grid item xs={12} md={activeStep === 0 || activeStep === 6 ? 9 : 6}>
                            <CartContent sx={{ width: '100%' }}>
                                <CartBody>
                                    {
                                        activeStep === 0 && <ChooseType handleChoosetype={handleChoosetype} />
                                    }
                                    {
                                        activeStep === 1 && <ChooseItem id={salonData.id} cartData={cart} type={selectedType} onChoose={addToCartHandler} />
                                    }
                                    {
                                        activeStep === 2 && <ItemsReview cartData={cart} removeFromCart={removeFromCartHandler} /* increaseItem={increaseItemHandler} decreaseItem={decreaseItemHandler} */ />
                                    }
                                    {
                                        activeStep === 3 && <ChooseAppointment id={salonData.id} appointment={appointment} handleAppointment={handleAppointment} handleSlot={handleSlot} activeSlot={slot} />
                                    }
                                    {
                                        activeStep === 4 && <UserAuth id={salonData.id} handleNext={handleNext} storeUserData={storeUserInfos} />
                                    }
                                    {
                                        activeStep === 5 && <ChoosePayment handlePayment={handleChoosePayment} assignCoupon={handleCoupon} assignCouponData={handleCouponData} couponData={couponData} />
                                    }
                                    {
                                        activeStep === 6 && <PrintBooking bookingData={resevedBookingData} userData={userInfos} handleBookingDone={handleBookingDone} salonName={salonData.companyName} appointment={appointment} slot={slot} />
                                    }
                                </CartBody>
                                <Fragment>
                                    {
                                        activeStep === 1 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                                                <Button
                                                    color="inherit"
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                >
                                                    {t('Back')}
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <CartButton color="secondary" variant='contained' onClick={handleNext} disabled={cart.services.length === 0 && cart.deals.length === 0} >
                                                    {t('Next')}
                                                </CartButton>
                                            </Box>
                                        )
                                    }
                                    {
                                        activeStep === 2 && (
                                            <Box sx={{ pb: 2, }}>
                                                <Button
                                                    color="inherit"
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                    >
                                                    {t('Back')}
                                                </Button>
                                                <CartButton color="secondary" variant='contained' onClick={handleReset}
                                                    sx={{ mr: 1 }} >
                                                    {t('Go Back To Items')}
                                                </CartButton>
                                                <CartButton color="secondary" variant='contained' onClick={handleNext} disabled={cart.services.length === 0 && cart.deals.length === 0} >
                                                    {t('Next')}
                                                </CartButton>
                                            </Box>
                                        )
                                    }
                                    {
                                        activeStep === 3 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                                <Button
                                                    color="inherit"
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                >
                                                    {t('Back')}
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <CartButton color="secondary" variant='contained' onClick={handleNext} disabled={!hasSelectedAppointment} >
                                                    {t('Next')}
                                                </CartButton>
                                            </Box>
                                        )
                                    }
                                    {
                                        activeStep === 4 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                >
                                                    {t('Back')}
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <CartButton color="secondary" variant='contained' onClick={handleNext} disabled >
                                                    {t('Next')}
                                                </CartButton>
                                            </Box>
                                        )
                                    }
                                    {
                                        activeStep === 5 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={() => setActiveStep(activeStep - 2)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    {t('Back')}
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                            </Box>
                                        )
                                    }
                                    {
                                        activeStep === 6 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <CartButton color="secondary" variant='contained' onClick={ResetCart} disabled={!bookingDone} >
                                                    {t('Finish')}
                                                </CartButton>
                                            </Box>
                                        )
                                    }
                                </Fragment>
                            </CartContent>
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ display: activeStep === 0 || activeStep === 6 ? 'none' : 'block' }} >
                            <CartSummary cartData={cart} taxes={totalTaxes} total={totalPrice} hasSelectedAppointment={hasSelectedAppointment} appointment={appointment} slot={slot} hasSelectedCoupon={couponId} couponDiscount={couponData.amount} />
                        </Grid>
                    </Grid>
                </CustomCardMui>
            </Fade>
        </Modal>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCouponsHandler: (lang) => dispatch(fetchCoupons(lang)),
    }
}

export default connect(null, mapDispatchToProps)(Cart);
