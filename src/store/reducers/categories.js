import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    categories: [],
    fetchingCategories: false,
    errorFetchingCategories: false,
}

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case (actionTypes.FETCH_CATEGORIES_START):
            return updateObject( state, {
                fetchingCategories: true,
                errorFetchingCategories: false,
            });
        case (actionTypes.FETCH_CATEGORIES_SUCCESS):
            return updateObject( state, {
                categories: action.categories,
                fetchingCategories: false,
            });
        case (actionTypes.FETCH_CATEGORIES_FAILED):
            return updateObject( state, {
                fetchingCategories: false,
                errorFetchingCategories: true,
            });
        default:
            return state;
    }
}

export default reducer;