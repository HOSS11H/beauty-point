import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START,
    }
}
export const fetchProductsSuccess = (productsData) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: productsData
    }
}
export const fetchProductsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAILED,
        error: errorMessage,
    }
}
export const fetchProducts = (language, page, perPage, orderBy, orderDir) => {
    return dispatch => {
        dispatch(fetchProductsStart())
        axios.get(`/vendors/products?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=location&include[]=unit`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(fetchProductsSuccess(response.data));
        })
            .catch(err => {
                //console.log(err)
                dispatch(fetchProductsFailed(err.message))
            })
    }
}

export const deleteProductStart = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_START,
    }
}
export const deleteProductSuccess = (message, deletedProductId) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        message: message,
        productId: deletedProductId,
    }
}
export const deleteProductFailed = (message) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAILED,
        message: message,
    }
}

export const deleteProduct = ( id ) => {
    return dispatch => {
        dispatch(deleteProductStart())
        axios.delete(`/vendors/products/${id}`)
            .then(response => {
                dispatch(deleteProductSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteProductFailed(err.message))
            })
    }
}

export const updateProductStart = () => {
    return {
        type: actionTypes.UPDATE_PRODUCT_START,
    }
}
export const updateProductSuccess = ( updatedProductData) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        productData: updatedProductData,
    }
}
export const updateProductFailed = (message) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_FAILED,
        message: message,
    }
}

export const updateProduct = (data) => {
    return dispatch => {
        dispatch(updateProductStart())
        axios.post(`/vendors/products/${data.get('id')}`, data, {headers: {   'Content-Type': 'multipart/form-data'}})
            .then(response => {
                dispatch(updateProductSuccess( data));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateProductFailed(errs[key][0]))
                }
            })
    }
}
export const createProductStart = () => {
    return {
        type: actionTypes.CREATE_PRODUCT_START,
    }
}
export const createProductSuccess = (createdProductData) => {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        productData: createdProductData,
    }
}
export const resetCreateProductSuccess = () => {
    return {
        type: actionTypes.RESET_CREATE_PRODUCT_SUCCESS,
    }
}
export const createProductFailed = (message) => {
    return {
        type: actionTypes.CREATE_PRODUCT_FAILED,
        message: message,
    }
}

export const createProduct = (data) => {
    return dispatch => {
        dispatch(createProductStart())
        axios.post(`/vendors/products`, data, {headers: {   'Content-Type': 'multipart/form-data'}})
            .then(response => {
                dispatch(createProductSuccess({ ...data, ...response.data }));
                setTimeout(() => {
                    dispatch(resetCreateProductSuccess())
                })
            })
            .catch(err => {
                if ( err.response.data.errors ) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        dispatch(createProductFailed(errs[key][0]))
                    }

                } else {
                    dispatch(createProductFailed(err.response.data.message))
                }
            })
    }
}

export const searchProductsStart = () => {
    return {
        type: actionTypes.SEARCH_PRODUCTS_START,
    }
}
export const searchProductsSuccess = (productsData) => {
    return {
        type: actionTypes.SEARCH_PRODUCTS_SUCCESS,
        products: productsData
    }
}
export const searchProductsFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_PRODUCTS_FAILED,
        error: errorMessage,
    }
}
export const searchProducts = (language, word) => {
    return dispatch => {
        dispatch(searchProductsStart())
        axios.get(`/vendors/products?term=${word}&page=1&per_page=15&include[]=location&include[]=unit`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchProductsSuccess(response.data));
        })
            .catch(err => {
                //console.log(err)
                dispatch(searchProductsFailed(err.message))
            })
    }
}
export const filterProductsStart = () => {
    return {
        type: actionTypes.FILTER_PRODUCTS_START,
    }
}
export const filterProductsSuccess = (productsData) => {
    return {
        type: actionTypes.FILTER_PRODUCTS_SUCCESS,
        products: productsData
    }
}
export const filterProductsFailed = (errorMessage) => {
    return {
        type: actionTypes.FILTER_PRODUCTS_FAILED,
        error: errorMessage,
    }
}

export const filterProducts = (language, type, location, search, page, perPage) => {
    return dispatch => {
        dispatch(filterProductsStart())
        axios.get(`/vendors/${type}?page=${page + 1}&per_page=${perPage}&term=${search}&location_id=${location}`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(filterProductsSuccess(response.data));
        })
            .catch(err => {
                //console.log(err)
                dispatch(filterProductsFailed(err.message))
            })
    }
}