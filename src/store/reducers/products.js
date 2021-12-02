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
    updatingProductMessage: null,
    searchingProducts: false,
    searchingProductsSuccess: false,
    creatingProduct: false,
    creatingProductSuccess: false,
    creatingProductMessage: null,
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
                updatingProductMessage: null,
            })
        case (actionTypes.UPDATE_PRODUCT_SUCCESS):
            const editedProductIndex = state.products.data.findIndex(product => product.id === action.productData.id);
            let editedProduct = { ...state.products.data[editedProductIndex] }
            const updatedEditedProduct = updateObject(editedProduct, {
                name: action.productData.name,
                description: action.productData.description,
                price: action.productData.price,
                discount_price: action.productData.discount_price,
                discount: action.productData.discount,
                discount_type: action.productData.discount_type,
                status: action.productData.status,
                image: action.productData.image,
                location: action.productData.location,
                quantity: action.productData.quantity,
            })
            const editedProducts = [...state.products.data]
            editedProducts[editedProductIndex] = updatedEditedProduct
            return updateObject(state, {
                products: {
                    ...state.products,
                    data: editedProducts,
                },
                updatingProduct: false,
                updatingProductSuccess: true,
                updatingProductMessage: action.message,
            })
        case (actionTypes.UPDATE_PRODUCT_FAILED):
            return updateObject(state, {
                updatingProduct: false,
                updatingProductSuccess: false,
                updatingProductMessage: action.message,
            })
        case (actionTypes.CREATE_PRODUCT_START):
            return updateObject(state, {
                creatingProduct: true,
                creatingProductSuccess: false,
                creatingProductMessage: null,
            })
        case (actionTypes.CREATE_PRODUCT_SUCCESS):
            const upgradedProducts = [...state.products.data]
            upgradedProducts.push(action.productData);
            return updateObject(state, {
                products: {
                    ...state.products,
                    data: upgradedProducts,
                    meta: {
                        ...state.products.meta,
                        total: state.products.meta.total + 1,
                    }
                },
                creatingProduct: false,
                creatingProductSuccess: true,
                creatingProductMessage: action.message,
            })
        case (actionTypes.CREATE_PRODUCT_FAILED):
            return updateObject(state, {
                creatingProduct: false,
                creatingProductSuccess: false,
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
        default:
            return state;
    }
}

export default reducer;