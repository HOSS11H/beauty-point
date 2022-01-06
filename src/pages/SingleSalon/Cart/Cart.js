import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { useCallback, useReducer, useState } from 'react';
import CartHeadliner from './CartHeadliner/CartHeadliner';
import ChooseType from './ChooseType/ChooseType';
import ChooseItem from './ChooseItem/ChooseItem';
import ChooseAppointment from './ChooseAppointment/ChooseAppointment';
import UserAuth from './UserAuth/UserAuth';
import ChoosePayment from './ChoosePayment/ChoosePayment';
import axios from '../../../utils/axios-instance';
import { updateObject } from '../../../shared/utility';
import ItemsReview from './ItemsReview/ItemsReview';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        display:flex;
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        z-index:1;
        width: 70%;
        @media screen and (max-width: 1399.98px) {
            width: 90%;
        }
        @media screen and (max-width: 899.98px) {
            width: 90%;
            flex-direction: column;
        }
    }
`;

const CartContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
`
const CartBody = styled.div`
    flex-grow: 1;
    width: 100%;
    padding: 25px;
    max-height: 80vh;
    overflow-y: auto;
    // Scroll //
    -webkit-overflow-scrolling: touch;
    @media screen and (max-width: 599.98px) {
        max-height: 400px;
        padding: 25px 15px;
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
        case 'INCREASE_SERVICE':
            const increasedServiceIndex = state.services.findIndex(service => service.id === action.payload);
            const increasedService = { ...state.services[increasedServiceIndex] }
            increasedService.quantity = increasedService.quantity + 1;
            const increasedServices = [...state.services]
            increasedServices[increasedServiceIndex] = increasedService
            return updateObject(state, {
                services: increasedServices,
            })
        case 'DECREASE_SERVICE':
            const decreasedServiceIndex = state.services.findIndex(service => service.id === action.payload);
            const decreasedService = { ...state.services[decreasedServiceIndex] }
            const decreasedServices = [...state.services]
            if (decreasedService.quantity === 1) {
                decreasedServices.splice(decreasedServiceIndex, 1)
            } else {
                decreasedService.quantity = decreasedService.quantity - 1
                decreasedServices[decreasedServiceIndex] = decreasedService
            }
            return updateObject(state, {
                services: decreasedServices,
            })
        case 'ADD_TO_PRODUCTS':
            const productIndex = state.products.findIndex(product => product.id === action.payload.id);
            const updatedProducts = [...state.products]
            if (productIndex === -1) {
                updatedProducts.push(action.payload)
            } else {
                updatedProducts.splice(productIndex, 1)
            }
            return updateObject(state, {
                products: updatedProducts,
            })
        case 'REMOVE_PRODUCT':
            const filteredProducts = state.products.filter(product => product.id !== action.payload)
            return updateObject(state, {
                products: filteredProducts,
            })
        case 'INCREASE_PRODUCT':
            const increasedProductIndex = state.products.findIndex(product => product.id === action.payload);
            const increasedProduct = { ...state.products[increasedProductIndex] }
            increasedProduct.quantity = increasedProduct.quantity + 1
            const increasedProducts = [...state.products]
            increasedProducts[increasedProductIndex] = increasedProduct
            return updateObject(state, {
                products: increasedProducts,
            })
        case 'DECREASE_PRODUCT':
            const decreasedProductIndex = state.products.findIndex(product => product.id === action.payload);
            const decreasedProduct = { ...state.products[decreasedProductIndex] }
            const decreasedProducts = [...state.products]
            if (decreasedProduct.quantity === 1) {
                decreasedProducts.splice(decreasedProductIndex, 1)
            } else {
                decreasedProduct.quantity = decreasedProduct.quantity - 1
                decreasedProducts[decreasedProductIndex] = decreasedProduct
            }
            return updateObject(state, {
                products: decreasedProducts,
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
        case 'INCREASE_DEAL':
            const increasedDealIndex = state.deals.findIndex(deal => deal.id === action.payload);
            const increasedDeal = { ...state.deals[increasedDealIndex] }
            increasedDeal.quantity = increasedDeal.quantity + 1
            const increasedDeals = [...state.deals]
            increasedDeals[increasedDealIndex] = increasedDeal
            return updateObject(state, {
                deals: increasedDeals,
            })
        case 'DECREASE_DEAL':
            const decreasedDealIndex = state.deals.findIndex(deal => deal.id === action.payload);
            const decreasedDeal = { ...state.deals[decreasedDealIndex] }
            const decreasedDeals = [...state.deals]
            if (decreasedDeal.quantity === 1) {
                decreasedDeals.splice(decreasedDealIndex, 1)
            } else {
                decreasedDeal.quantity = decreasedDeal.quantity - 1
                decreasedDeals[decreasedDealIndex] = decreasedDeal
            }
            return updateObject(state, {
                deals: decreasedDeals,
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

const steps = ['Select type', 'select items', 'review items', 'Select appointment', 'user infos', 'choose Payment'];

const Cart = props => {

    const { t } = useTranslation();

    const { show, onClose, salonData } = props;

    const [cart, dispatch] = useReducer(cartReducer, {
        services: [],
        products: [],
        deals: [],
    });

    const [activeStep, setActiveStep] = useState(0);

    const [selectedType, setSelectedType] = useState('');

    const [appointment, setAppointment] = useState(new Date());
    const [ slot, setSlot] = useState('');
    const [hasSelectedAppointment, setHasSelectedAppointment] = useState(false);

    const [paymentMethod, setPaumentMethod] = useState('');

    const [resevedBookingData, setReservedBookingData] = useState(null);

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
        console.log(type, itemId)
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

    const increaseItemHandler = useCallback((type, itemId) => {
        if (type === 'services') {
            dispatch({
                type: 'INCREASE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'INCREASE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'INCREASE_DEAL',
                payload: itemId
            })
        }
    }, [])
    const decreaseItemHandler = useCallback((type, itemId) => {
        if (type === 'services') {
            dispatch({
                type: 'DECREASE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'DECREASE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'DECREASE_DEAL',
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

    const handleChoosePayment = useCallback((payment) => {
        setPaumentMethod(payment);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (payment === 'cash') {
            let data = {
                dateTime: appointment,
                payment_gateway: payment,
                cart: cart,
            };
            axios.post(`/vendors/bookings`, data)
                .then(response => {
                    setReservedBookingData(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [appointment, cart])

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
            }}
        >
            <Fade in={show}>
                <CustomCardMui>
                    <CartHeadliner activeStep={activeStep} salonNum={salonData.companyPhone} steps={steps} />
                    <CartContent sx={{ width: '100%' }}>
                        <CartBody>
                            {
                                activeStep === 0 && <ChooseType handleChoosetype={handleChoosetype} />
                            }
                            {
                                activeStep === 1 && <ChooseItem id={salonData.id} cartData={cart} type={selectedType} onChoose={addToCartHandler} />
                            }
                            {
                                activeStep === 2 && <ItemsReview  cartData={cart} removeFromCart={removeFromCartHandler} increaseItem={increaseItemHandler} decreaseItem={decreaseItemHandler} />
                            }
                            {
                                activeStep === 3 && <ChooseAppointment id={salonData.id} appointment={appointment} handleAppointment={handleAppointment} handleSlot={handleSlot} activeSlot={slot} />
                            }
                            {
                                activeStep === 4 && <UserAuth id={salonData.id} handleNext={handleNext} />
                            }
                            {
                                activeStep === 5 && <ChoosePayment handlePayment={handleChoosePayment} />
                            }
                        </CartBody>
                        {
                            activeStep === 1 && (
                                <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                    <Button
                                        color="inherit"
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        {t('Back')}
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button color="secondary" onClick={handleNext} disabled={cart.services.length === 0 && cart.deals.length === 0 && cart.products.length === 0 } >
                                        {t(activeStep === steps.length - 1 ? 'Finish' : 'Next')}
                                    </Button>
                                </Box>
                            )
                        }
                        {
                            activeStep === 2 && (
                                <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                    <Button
                                        color="inherit"
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        {t('Back')}
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button color="secondary" onClick={handleNext} disabled={cart.services.length === 0 && cart.deals.length === 0 && cart.products.length === 0 } >
                                        {t(activeStep === steps.length - 1 ? 'Finish' : 'Next')}
                                    </Button>
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
                                    <Button color="secondary" onClick={handleNext} disabled={!hasSelectedAppointment} >
                                        {t(activeStep === steps.length - 1 ? 'Finish' : 'Next')}
                                    </Button>
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
                                    <Button color="secondary" onClick={handleNext} disabled >
                                        {t(activeStep === steps.length - 1 ? 'Finish' : 'Next')}
                                    </Button>
                                </Box>
                            )
                        }
                    </CartContent>
                </CustomCardMui>
            </Fade>
        </Modal>
    )
}
export default Cart;