import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    locations: [],
    fetchingLocations: false,
    errorFetchingLocations: false,
}

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case (actionTypes.FETCH_LOCATIONS_START):
            return updateObject( state, {
                fetchingLocations: true,
                errorFetchingLocations: false,
            });
        case (actionTypes.FETCH_LOCATIONS_SUCCESS):
            return updateObject( state, {
                locations: action.locations,
                fetchingLocations: false,
            });
        case (actionTypes.FETCH_LOCATIONS_FAILED):
            return updateObject( state, {
                fetchingLocations: false,
                errorFetchingLocations: true,
            });
        default:
            return state;
    }
}

export default reducer;