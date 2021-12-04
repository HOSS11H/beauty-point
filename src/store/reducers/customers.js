import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    customers: [],
    fetchingCustomers: false,
    errorFetchingCustomers: false,
}

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case (actionTypes.FETCH_CUSTOMERS_START):
            return updateObject( state, {
                fetchingCustomers: true,
                errorFetchingCustomers: false,
            });
        case (actionTypes.FETCH_CUSTOMERS_SUCCESS):
            return updateObject( state, {
                customers: action.customers,
                fetchingCustomers: false,
            });
        case (actionTypes.FETCH_CUSTOMERS_FAILED):
            return updateObject( state, {
                fetchingCustomers: false,
                errorFetchingCustomers: true,
            });
        default:
            return state;
    }
}

export default reducer;