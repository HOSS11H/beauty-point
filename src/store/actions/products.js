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
        axios.get(`/vendors/products?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=location`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(fetchProductsSuccess(response.data));
        })
            .catch(err => {
                console.log(err)
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
export const updateProductSuccess = (message, updatedProductData) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        message: message,
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
        console.log(data)
        axios.put(`/vendors/products/${data.id}`, data)
            .then(response => {
                dispatch(updateProductSuccess(response.data, data));
            })
            .catch(err => {
                dispatch(updateProductFailed(err.message))
            })
    }
}
export const createProductStart = () => {
    return {
        type: actionTypes.CREATE_PRODUCT_START,
    }
}
export const createProductSuccess = (message, createdProductData) => {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        message: message,
        productData: createdProductData,
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
        console.log(data, 'excuted')
        axios.post(`/vendors/products`, data)
            .then(response => {
                dispatch(createProductSuccess(null, { ...data, ...response.data }));
            })
            .catch(err => {
                dispatch(createProductFailed(err.message))
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
        axios.get(`/vendors/products?term=${word}&page=1&per_page=15&include[]=location`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchProductsSuccess(response.data));
        })
            .catch(err => {
                console.log(err)
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
        axios.get(`/vendors/${type}?page=${page + 1}&per_page=${perPage}&term=${search}&location_id=${location}&include[]=location`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(filterProductsSuccess(response.data));
        })
            .catch(err => {
                console.log(err)
                dispatch(filterProductsFailed(err.message))
            })
    }
}