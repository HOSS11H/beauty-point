import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


export const fetchServicesStart = (  ) => {
    return {
        type: actionTypes.FETCH_SERVICES_START,
    }
}
export const fetchServicesSuccess = ( servicesData ) => {
    return {
        type: actionTypes.FETCH_SERVICES_SUCCESS,
        services: servicesData
    }
}
export const fetchServicesFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_SERVICES_FAILED,
        error: errorMessage,
    }
}
export const fetchServices = ( language, token , page ) => {
    return dispatch => {
        dispatch( fetchServicesStart( ) )
        axios.get(`/vendors/services?page=${page + 1}`, { 
            headers: {
                'Accept-Language': language,
                'Authorization': `Bearer ${token}`,
            }
        }).then( response => {
                console.log('services fetched')
                dispatch( fetchServicesSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchServicesFailed( err.message  ) )
            } )
        }
}