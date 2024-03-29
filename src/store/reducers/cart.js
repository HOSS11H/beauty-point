import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    services: [],
    deals: [],
}

const reudcer = (state = intialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_TO_SERVICES):
            const serviceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const updatedServices = [...state.services]
            if (serviceIndex === -1) {
                const obj = {
                    ...action.payload,
                    quantity: 1,
                }
                updatedServices.push(obj)
            } else {
                const updatedItem = { ...updatedServices[serviceIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedServices[serviceIndex] = updatedItem
            }
            return updateObject(state, {
                services: updatedServices,
            })
        case (actionTypes.REMOVE_SERVICE):
            const filteredServices = state.services.filter(service => service.id !== action.payload)
            return updateObject(state, {
                services: filteredServices,
            })
        case (actionTypes.ADD_TO_DEALS):
            const dealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const updatedDeals = [...state.deals]
            if (dealIndex === -1) {
                const obj = {
                    ...action.payload,
                    quantity: 1,
                }
                updatedDeals.push(obj)
            } else {
                const updatedItem = { ...updatedDeals[dealIndex] }
                updatedItem.quantity = updatedItem.quantity + 1
                updatedDeals[dealIndex] = updatedItem
            }
            return updateObject(state, {
                deals: updatedDeals,
            })
        case (actionTypes.REMOVE_DEAL):
            const filteredDeals = state.deals.filter(deal => deal.id !== action.payload)
            return updateObject(state, {
                deals: filteredDeals,
            })
        case (actionTypes.RESET_CART):
            return updateObject(state, intialState)
        default:
            return state;
    }
}
export default reudcer;