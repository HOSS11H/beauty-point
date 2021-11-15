import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    services: { data: [ ] } ,
    fetchingServices: false,
    errorFetchingServices: false,
} ;

const reducer = ( state = intialState , action ) => {

    switch( action.type ) {
        case ( actionTypes.FETCH_SERVICES_START ) :
            return updateObject( state , {
                fetchingServices: true,
                errorFetchingServices: false,
            })
        case ( actionTypes.FETCH_SERVICES_SUCCESS ) :
            return updateObject( state , {
                fetchingServices: false,
                services: action.services,
            })
        case ( actionTypes.FETCH_SERVICES_FAILED ) :
            return updateObject( state , {
                fetchingServices: false,
                errorFetchingServices: true,
            })
        default :
            return state;
    }
}

export default reducer;