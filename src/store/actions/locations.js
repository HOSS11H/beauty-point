import * as actionTypes from './actionTypes';
import v1 from '../../utils/axios-instance-v1';


export const fetchLocationsStart = (  ) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_START,
    }
}
export const fetchLocationsSuccess = ( locationsData ) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_SUCCESS,
        locations: locationsData
    }
}
export const fetchLocationsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_FAILED,
        error: errorMessage,
    }
}
export const fetchLocations = ( language ) => {
    return dispatch => {
        dispatch( fetchLocationsStart( ) )
        v1.get(`/locations`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchLocationsSuccess( response.data  ) );
            })
            .catch( err => {
                //console.log(err)
                dispatch( fetchLocationsFailed( err.message  ) )
            } )
        }
}