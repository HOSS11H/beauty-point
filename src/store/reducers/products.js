import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    products: { data: [ ] } ,
    fetchingProducts: false,
    errorFetchingProducts: false,
    deletingProduct: false,
    deletingProductSuccess: false,
    deletingProductMessage: null,
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
            console.log(action.productId)

            const updatedProducts = state.products.data.filter( product => product.id !== action.productId );
            console.log( state.products.data, updatedProducts );
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
        default :
            return state;
    }
}

export default reducer;