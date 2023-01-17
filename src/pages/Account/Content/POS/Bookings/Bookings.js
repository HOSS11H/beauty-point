import { IconButton, useMediaQuery } from '@mui/material';
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components'
import { updateObject } from '../../../../../shared/utility';
import ThemeContext from '../../../../../store/theme-context';
import Cart from './Cart/Cart';
import Orders from './Orders/Orders';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import moment from 'moment';

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
        case 'CHANGE_SERVICE_EMPLOYEE':
            const changedEmployeeServiceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const changedEmployeeService = { ...state.services[changedEmployeeServiceIndex] }
            changedEmployeeService.employee_id = action.payload.employeeId
            const changedEmployeeServices = [...state.services]
            changedEmployeeServices[changedEmployeeServiceIndex] = changedEmployeeService
            return updateObject(state, {
                services: changedEmployeeServices,
            })
        case 'CHANGE_PRODUCT_EMPLOYEE':
            const changedEmployeeProductIndex = state.products.findIndex(product => product.id === action.payload.id);
            const changedEmployeeProduct = { ...state.products[changedEmployeeProductIndex] }
            changedEmployeeProduct.employee_id = action.payload.employeeId
            const changedEmployeeProducts = [...state.products]
            changedEmployeeProducts[changedEmployeeProductIndex] = changedEmployeeProduct
            return updateObject(state, {
                products: changedEmployeeProducts,
            })
        case 'CHANGE_DEAL_EMPLOYEE':
            const changedEmployeeDealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const changedEmployeeDeal = { ...state.deals[changedEmployeeDealIndex] }
            changedEmployeeDeal.employee_id = action.payload.employeeId
            const changedEmployeeDeals = [...state.deals]
            changedEmployeeDeals[changedEmployeeDealIndex] = changedEmployeeDeal
            return updateObject(state, {
                deals: changedEmployeeDeals,
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

const Bookings = props => {
    const themeCtx = useContext(ThemeContext)
    const isTablet = useMediaQuery(themeCtx.theme.breakpoints.down('md'), { noSsr: true });

    const [showTabletCart, setShowTabletCart] = useState(false)

    const [cart, dispatch] = useReducer(cartReducer, {
        services: [],
        products: [],
        deals: [],
    });

    const [bookingData, setBookingData] = useState(null)
    const [dateTime, setDateTime] = useState(moment());
    const [bookingStatus, setBookingStatus] = useState('')
    const [resetFilters, setResetFilters] = useState(0)

    useEffect(() => {
        if (bookingData) {
            return;
        }
        const interval = setInterval(() =>
            setDateTime(moment())
            , 60000);
        return () => clearInterval(interval);
    }, [bookingData])

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
    const changeItemPriceHandler = useCallback((type, itemId, price) => {
        if (type === 'services') {
            dispatch({
                type: 'CHANGE_SERVICE_PRICE',
                payload: {
                    id: itemId,
                    price: +price,
                },
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'CHANGE_PRODUCT_PRICE',
                payload: {
                    id: itemId,
                    price: +price,
                },
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'CHANGE_DEAL_PRICE',
                payload: {
                    id: itemId,
                    price: +price,
                },
            })
        }
    }, [])
    const changeEmployeeHandler = useCallback((type, itemId, employeeId) => {
        if (type === 'services') {
            dispatch({
                type: 'CHANGE_SERVICE_EMPLOYEE',
                payload: {
                    id: itemId,
                    employeeId: employeeId,
                },
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'CHANGE_PRODUCT_EMPLOYEE',
                payload: {
                    id: itemId,
                    employeeId: employeeId,
                },
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'CHANGE_DEAL_EMPLOYEE',
                payload: {
                    id: itemId,
                    employeeId: employeeId,
                },
            })
        }
    }, [])
    const resetCartHandler = useCallback(() => {
        dispatch({
            type: 'RESET_CART',
        })
        setResetFilters(prevState => prevState + 1)
    }, [])

    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };
    const bookingStatusChangeHandler = useCallback((event) => {
        setBookingStatus(event.target.value);
    }, [])

    const resetBookingStatus = useCallback(() => {
        setBookingStatus('')
    }, [])

    const addBookingData = useCallback((data) => {
        setBookingData(data)
        setBookingStatus(data.status);
        setDateTime(moment.utc(data.date_time))
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
            <Orders assignCart={assignCartHandler} addBookingData={addBookingData} resetFilters={resetFilters} />
            <Cart
                bookingData={bookingData} items={cart} removeItem={removeFromCartHandler} increaseItem={increaseItemHandler}
                decreaseItem={decreaseItemHandler} changePrice={changeItemPriceHandler} changeEmployee={changeEmployeeHandler}
                dateTime={dateTime} changeDateTime={handleDateChange} status={bookingStatus} 
                resetStatus={resetBookingStatus}  changeStatus={bookingStatusChangeHandler}
                showCart={showTabletCart} hideCart={hideTabletCartHandler} resetCartItems={resetCartHandler} 
                resetBooking={resetBookingData} />
            <CartMobileButton onClick={showTabletCartHandler} >
                <AddShoppingCartIcon />
            </CartMobileButton>
        </Wrapper>
    )
}
export default Bookings;