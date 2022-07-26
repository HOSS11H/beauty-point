import * as actionTypes from './actionTypes';

export const addToServices = (data) => {
    return {
        type: actionTypes.ADD_TO_SERVICES,
        payload: data,
    }
}

export const removeService = (id) => {
    return {
        type: actionTypes.ADD_TO_SERVICES,
        payload: id,
    }
}
export const addToDeals = (data) => {
    return {
        type: actionTypes.ADD_TO_DEALS,
        payload: data,
    }
}

export const removeDeal = (id) => {
    return {
        type: actionTypes.REMOVE_DEAL,
        payload: id,
    }
}

export const resetCart = (id) => {
    return {
        type: actionTypes.RESET_CART,
    }
}