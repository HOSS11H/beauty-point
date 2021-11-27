import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


export const fetchCategoriesStart = (  ) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_START,
    }
}
export const fetchCategoriesSuccess = ( categoriesData ) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categoriesData
    }
}
export const fetchCategoriesFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAILED,
        error: errorMessage,
    }
}
export const fetchCategories = ( language ) => {
    return dispatch => {
        dispatch( fetchCategoriesStart( ) )
        axios.get(`/vendors/categories`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchCategoriesSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchCategoriesFailed( err.message  ) )
            } )
        }
}