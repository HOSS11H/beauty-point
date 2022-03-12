import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    products: { data: [], meta: {} },
    fetchingProducts: false,
    errorFetchingProducts: false,
    deletingProduct: false,
    deletingProductSuccess: false,
    deletingProductMessage: null,
    updatingProduct: false,
    updatingProductSuccess: false,
    updatingProductFailed: false,
    updatingProductMessage: null,
    searchingProducts: false,
    searchingProductsSuccess: false,
    creatingProduct: false,
    creatingProductSuccess: false,
    creatingProductFailed: false,
    creatingProductMessage: null,
    posProducts: {
        products: { data: [], meta: {} },
        fetchingProducts: false,
        errorFetchingProducts: false,
    }
};

const reducer = (state = intialState, action) => {

    switch (action.type) {
        case (actionTypes.FETCH_PRODUCTS_START):
            return updateObject(state, {
                fetchingProducts: true,
                errorFetchingProducts: false,
            })
        case (actionTypes.FETCH_PRODUCTS_SUCCESS):
            return updateObject(state, {
                fetchingProducts: false,
                products: action.products,
            })
        case (actionTypes.FETCH_PRODUCTS_FAILED):
            return updateObject(state, {
                fetchingProducts: false,
                errorFetchingProducts: true,
            })
        case (actionTypes.DELETE_PRODUCT_START):
            return updateObject(state, {
                deletingProduct: true,
                deletingProductSuccess: false,
                deletingProductMessage: null,
            })
        case (actionTypes.DELETE_PRODUCT_SUCCESS):
            const updatedProducts = state.products.data.filter(product => product.id !== action.productId);
            return updateObject(state, {
                products: {
                    ...state.products,
                    data: updatedProducts,
                    total: state.products.total - 1,
                },
                deletingProduct: false,
                deletingProductSuccess: true,
                deletingProductMessage: action.message,
            })
        case (actionTypes.DELETE_PRODUCT_FAILED):
            return updateObject(state, {
                deletingProduct: false,
                deletingProductSuccess: false,
                deletingProductMessage: action.message,
            })
        case (actionTypes.UPDATE_PRODUCT_START):
            return updateObject(state, {
                updatingProduct: true,
                updatingProductSuccess: false,
                updatingProductFailed: false,
                updatingProductMessage: null,
            })
        case (actionTypes.UPDATE_PRODUCT_SUCCESS):
            return updateObject(state, {
                updatingProduct: false,
                updatingProductSuccess: true,
            })
        case (actionTypes.UPDATE_PRODUCT_FAILED):
            return updateObject(state, {
                updatingProduct: false,
                updatingProductFailed: true,
                updatingProductMessage: action.message,
            })
        case (actionTypes.CREATE_PRODUCT_START):
            return updateObject(state, {
                creatingProduct: true,
                creatingProductSuccess: false,
                creatingProductFailed: false,
                creatingProductMessage: null,
            })
        case (actionTypes.CREATE_PRODUCT_SUCCESS):
            return updateObject(state, {
                creatingProduct: false,
                creatingProductSuccess: true,
            })
        case (actionTypes.RESET_CREATE_PRODUCT_SUCCESS):
            return updateObject(state, {
                creatingProductSuccess: false,
            })
        case (actionTypes.CREATE_PRODUCT_FAILED):
            return updateObject(state, {
                creatingProduct: false,
                creatingProductFailed: true,
                creatingProductMessage: action.message,
            })
        case (actionTypes.SEARCH_PRODUCTS_START):
            return updateObject(state, {
                fetchingProducts: true,
                errorFetchingProducts: false,
                searchingProducts: true,
                searchingProductsSuccess: false,
            })
        case (actionTypes.SEARCH_PRODUCTS_SUCCESS):
            return updateObject(state, {
                fetchingProducts: false,
                products: action.products,
                searchingProducts: false,
                searchingProductsSuccess: true,
            })
        case (actionTypes.SEARCH_PRODUCTS_FAILED):
            return updateObject(state, {
                fetchingProducts: false,
                errorFetchingProducts: true,
                searchingProducts: false,
                searchingProductsSuccess: false,
            })
        case (actionTypes.FILTER_PRODUCTS_START):
            return updateObject(state, {
                posProducts: {
                    ...state.posProducts,
                    fetchingProducts: true,
                    errorFetchingProducts: false,
                }
            })
        case (actionTypes.FILTER_PRODUCTS_SUCCESS):
            return updateObject(state, {
                posProducts: {
                    ...state.posProducts,
                    fetchingProducts: false,
                    products: action.products,
                }
            })
        case (actionTypes.FILTER_PRODUCTS_FAILED):
            return updateObject(state, {
                posProducts: {
                    ...state.posProducts,
                    fetchingProducts: false,
                    errorFetchingProducts: true,
                }
            })
        default:
            return state;
    }
}

export default reducer;