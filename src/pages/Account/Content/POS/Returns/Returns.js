import { IconButton, useMediaQuery } from '@mui/material';
import { useCallback, useContext, useReducer, useState } from 'react';
import styled from 'styled-components'
import { updateObject } from '../../../../../shared/utility';
import ThemeContext from '../../../../../store/theme-context';
import Cart from './Cart/Cart';
import Orders from './Orders/Orders';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 468px;
    grid-gap: 20px;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px ) {
        grid-template-columns: auto;
    }
`

const CartMobileButton = styled(IconButton)`
    &.MuiIconButton-root {
        position: fixed;
        right: 40px;
        bottom: 30px;
        background-color: ${({ theme }) => theme.palette.secondary.main};
        color: ${({ theme }) => theme.palette.common.white};
        width: 46px;
        height: 46px;
        @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.md}px ) {
            display: none;
        }
    }
`

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return updateObject(state, action.payload)
        case 'REMOVE_SERVICE':
            const filteredServices = state.services.filter(service => service.id !== action.payload)
            return updateObject(state, {
                services: filteredServices,
            })
        case 'INCREASE_SERVICE':
            const increasedServiceIndex = state.services.findIndex(service => service.id === action.payload);
            const increasedService = { ...state.services[increasedServiceIndex] }
            if ( increasedService.quantity === -1 ) {
                const filteredServices = state.services.filter(service => service.id !== action.payload)
                return updateObject(state, {
                    services: filteredServices,
                })
            }
            increasedService.quantity = increasedService.quantity + 1;
            const increasedServices = [...state.services]
            increasedServices[increasedServiceIndex] = increasedService
            return updateObject(state, {
                services: increasedServices,
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

const Returns = props => {
    const themeCtx = useContext(ThemeContext)
    const isTablet = useMediaQuery(themeCtx.theme.breakpoints.down('md'), { noSsr: true });

    const [showTabletCart, setShowTabletCart] = useState(false)

    const [cart, dispatch] = useReducer(cartReducer, {
        services: [],
        products: [],
        deals: [],
    });

    const [bookingData, setBookingData] = useState(null)

    const assignCartHandler = useCallback((data) => {
        dispatch({ type: 'ADD_TO_CART', payload: data });
    }, [])

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
    const resetCartHandler = useCallback(() => {
        dispatch({
            type: 'RESET_CART',
        })
    }, [])

    const addBookingData = useCallback((data) => {
        setBookingData(data)
    }, [])
    const resetBookingData = useCallback((data) => {
        setBookingData(null)
    }, [])

    const showTabletCartHandler = () => {
        isTablet && setShowTabletCart(true)
    }
    const hideTabletCartHandler = useCallback(() => {
        isTablet && setShowTabletCart(false)
    }, [isTablet])

    return (
        <Wrapper>
            <Orders assignCart={assignCartHandler} addBookingData={addBookingData} />
            <Cart
                bookingData={bookingData} items={cart} removeItem={removeFromCartHandler} increaseItem={increaseItemHandler}
                showCart={showTabletCart} hideCart={hideTabletCartHandler} resetCartItems={resetCartHandler}  resetBooking={resetBookingData} />
            <CartMobileButton onClick={showTabletCartHandler} >
                <AddShoppingCartIcon />
            </CartMobileButton>
        </Wrapper>
    )
}
export default Returns;