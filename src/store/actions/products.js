import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';

export const fetchProductsStart = (  ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START,
    }
}
export const fetchProductsSuccess = ( productsData ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: productsData
    }
}
export const fetchProductsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAILED,
        error: errorMessage,
    }
}
export const fetchProducts = ( language, page, perPage, orderBy, orderDir ) => {
    return dispatch => {
        dispatch( fetchProductsStart( ) )
        axios.get(`/vendors/products?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=category&include[]=location&include[]=users&include[]=bookingItems&include[]=company`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchProductsSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchProductsFailed( err.message  ) )
            } )
        }
}

export const deleteProductStart = (  ) => {
    return {
        type: actionTypes.DELETE_PRODUCT_START,
    }
}
export const deleteProductSuccess = ( message, deletedProductId ) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        message: message,
        productId: deletedProductId,
    }
}
export const deleteProductFailed = ( message ) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAILED,
        message: message,
    }
}

export const deleteProduct = (token , id ) => {
    return dispatch => {
        dispatch( deleteProductStart( ) )
        axios.delete(`/vendors/products/${id}`)
            .then( response => {
                dispatch( deleteProductSuccess( response.data , id  ) );
            })
            .catch( err => {
                dispatch( deleteProductFailed( err.message  ) )
            } )
        }
}

export const searchProductsStart = (  ) => {
    return {
        type: actionTypes.SEARCH_PRODUCTS_START,
    }
}
export const searchProductsSuccess = ( productsData ) => {
    return {
        type: actionTypes.SEARCH_PRODUCTS_SUCCESS,
        products: productsData
    }
}
export const searchProductsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.SEARCH_PRODUCTS_FAILED,
        error: errorMessage,
    }
}
export const searchProducts = ( language , word ) => {
    return dispatch => {
        dispatch( searchProductsStart( ) )
        axios.get(`/vendors/products?term=${word}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( searchProductsSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( searchProductsFailed( err.message  ) )
            } )
        }
}

export const filterProducts = ( language, page , type, category , location, search ) => {
    return dispatch => {
        dispatch( fetchProductsStart( ) )
        axios.get(`/vendors/${type}?page=${page + 1}term=${search}&location=${location}&category=${category}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchProductsSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchProductsFailed( err.message  ) )
            } )
        }
}