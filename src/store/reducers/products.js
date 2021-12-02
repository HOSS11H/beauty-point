import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    products: { data: [ ], meta: {  } } ,
    fetchingProducts: false,
    errorFetchingProducts: false,
    deletingProduct: false,
    deletingProductSuccess: false,
    deletingProductMessage: null,
    searchingProducts: false,
    searchingProductsSuccess: false,
} ;

const reducer = ( state = intialState , action ) => {

    switch( action.type ) {
        case ( actionTypes.FETCH_PRODUCTS_START ) :
            return updateObject( state , {
                fetchingProducts: true,
                errorFetchingProducts: false,
            })
        case ( actionTypes.FETCH_PRODUCTS_SUCCESS ) :
            return updateObject( state , {
                fetchingProducts: false,
                products: action.products,
            })
        case ( actionTypes.FETCH_PRODUCTS_FAILED ) :
            return updateObject( state , {
                fetchingProducts: false,
                errorFetchingProducts: true,
            })
        case ( actionTypes.DELETE_PRODUCT_START ) :
            return updateObject( state , {
                deletingProduct: true,
                deletingProductSuccess: false,
                deletingProductMessage: null,
            })
        case ( actionTypes.DELETE_PRODUCT_SUCCESS ) :
            const updatedProducts = state.products.data.filter( product => product.id !== action.productId );
            return updateObject( state , {
                products: {
                    ...state.products,
                    data: updatedProducts,
                    total: state.products.total - 1,
                },
                deletingProduct: false,
                deletingProductSuccess: true,
                deletingProductMessage: action.message,
            })
        case ( actionTypes.DELETE_PRODUCT_FAILED ) :
            return updateObject( state , {
                deletingProduct: false,
                deletingProductSuccess: false,
                deletingProductMessage: action.message,
            })
            case ( actionTypes.SEARCH_PRODUCTS_START ) :
                return updateObject( state , {
                    fetchingProducts: true,
                    errorFetchingProducts: false,
                    searchingProducts: true,
                    searchingProductsSuccess: false,
                })
            case ( actionTypes.SEARCH_PRODUCTS_SUCCESS ) :
                return updateObject( state , {
                    fetchingProducts: false,
                    products: action.products,
                    searchingProducts: false,
                    searchingProductsSuccess: true,
                })
            case ( actionTypes.SEARCH_PRODUCTS_FAILED ) :
                return updateObject( state , {
                    fetchingProducts: false,
                    errorFetchingProducts: true,
                    searchingProducts: false,
                    searchingProductsSuccess: false,
                })
        default :
            return state;
    }
}

export default reducer;