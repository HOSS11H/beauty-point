import { useCallback, useReducer } from 'react';
import styled from 'styled-components'
import { updateObject } from '../../../../../shared/utility';
import Cart from '../Cart/Cart';
import Results from './Results/Results';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 468px;
    grid-gap: 20px;
`
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_SERVICES':
            const serviceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const updatedServices = [...state.services]
            if (serviceIndex === -1) {
                updatedServices.push(action.payload)
            } else {
                const updatedItem = { ...updatedServices[serviceIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedServices[serviceIndex] = updatedItem
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
        case 'CHANGE_SERVICE_PRICE':
            const changedServiceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const changedService = { ...state.services[changedServiceIndex] }
            changedService.price = action.payload.price
            const changedServices = [...state.services]
            changedServices[changedServiceIndex] = changedService
            return updateObject(state, {
                services: changedServices,
            })
        case 'CHANGE_SERVICE_EMPLOYEE':
            const changedEmployeeServiceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const changedEmployeeService = { ...state.services[changedEmployeeServiceIndex] }
            changedEmployeeService.employee_id = action.payload.employeeId
            const changedEmployeeServices = [...state.services]
            changedEmployeeServices[changedEmployeeServiceIndex] = changedEmployeeService
            return updateObject(state, {
                services: changedEmployeeServices,
            })
        case 'ADD_TO_PRODUCTS':
            const productIndex = state.products.findIndex(product => product.id === action.payload.id);
            const updatedProducts = [...state.products]
            if (productIndex === -1) {
                updatedProducts.push(action.payload)
            } else {
                const updatedItem = { ...updatedProducts[productIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedProducts[productIndex] = updatedItem
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
        case 'CHANGE_PRODUCT_PRICE':
            const changedProductIndex = state.products.findIndex(product => product.id === action.payload.id);
            const changedProduct = { ...state.products[changedProductIndex] }
            changedProduct.price = action.payload.price
            const changedProducts = [...state.products]
            changedProducts[changedProductIndex] = changedProduct
            return updateObject(state, {
                products: changedProducts,
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
        case 'ADD_TO_DEALS':
            const dealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const updatedDeals = [...state.deals]
            if (dealIndex === -1) {
                updatedDeals.push(action.payload)
            } else {
                const updatedItem = { ...updatedDeals[dealIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedDeals[dealIndex] = updatedItem
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
        case 'CHANGE_DEAL_PRICE':
            const changedDealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const changedDeal = { ...state.deals[changedDealIndex] }
            changedDeal.price = action.payload.price
            const changedDeals = [...state.deals]
            changedDeals[changedDealIndex] = changedDeal
            return updateObject(state, {
                deals: changedDeals,
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

const Sales = props => {
    const [cart, dispatch] = useReducer(cartReducer, {
        services: [],
        products: [],
        deals: [],
    });
    const addToCartHandler = useCallback((type, itemData) => {
        if (type === 'services') {
            dispatch({
                type: 'ADD_TO_SERVICES',
                payload: itemData
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'ADD_TO_PRODUCTS',
                payload: itemData
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'ADD_TO_DEALS',
                payload: itemData
            })
        }
    }, [])

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
    }, [])
    return (
        <Wrapper>
            <Results addToCart={addToCartHandler} />
            <Cart />
        </Wrapper>
    )
}
export default Sales;