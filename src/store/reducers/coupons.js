import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    coupons: [],
    fetchingCoupons: false,
    errorFetchingCoupons: false,
}

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case (actionTypes.FETCH_COUPONS_START):
            return updateObject( state, {
                fetchingCoupons: true,
                errorFetchingCoupons: false,
            });
        case (actionTypes.FETCH_COUPONS_SUCCESS):
            return updateObject( state, {
                coupons: action.coupons,
                fetchingCoupons: false,
            });
        case (actionTypes.FETCH_COUPONS_FAILED):
            return updateObject( state, {
                fetchingCoupons: false,
                errorFetchingCoupons: true,
            });
        default:
            return state;
    }
}

export default reducer;