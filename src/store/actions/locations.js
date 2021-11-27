import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


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
        axios.get(`/vendors/locations`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchLocationsSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchLocationsFailed( err.message  ) )
            } )
        }
}