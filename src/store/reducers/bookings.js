import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    bookings: { data: [ ] } ,
    totalBookings: [ ],
    fetchingBookings: false,
    errorFetchingBookings: false,
    fetchingTotalBookings: false,
    errorFetchingTotalBookings: false,
} ;

const reducer = ( state = intialState , action ) => {
    switch( action.type ) {
        case ( actionTypes.FETCH_BOOKINGS_START ): 
            return updateObject( state , {
                fetchingBookings: true,
                errorFetchingBookings: false,
            } )
        case ( actionTypes.FETCH_BOOKINGS_SUCCESS ): 
            return updateObject( state , {
                fetchingBookings: false,
                bookings: action.bookings,
            } )
        case ( actionTypes.FETCH_BOOKINGS_FAILED ): 
            return updateObject( state , {
                fetchingBookings: false,
                errorFetchingBookings: action.error,
            } )
        case ( actionTypes.FETCH_TOTAL_BOOKINGS_START ): 
            return updateObject( state , {
                fetchingTotalBookings: true,
                errorFetchingTotalBookings: false,
            } )
        case ( actionTypes.FETCH_TOTAL_BOOKINGS_SUCCESS ): 
            return updateObject( state , {
                fetchingTotalBookings: false,
                totalBookings: action.totalBookings,
            } )
        case ( actionTypes.FETCH_TOTAL_BOOKINGS_FAILED ): 
            return updateObject( state , {
                fetchingTotalBookings: false,
                errorFetchingTotalBookings: action.error,
            } )
        default : 
            return state
    }
};
export default reducer;