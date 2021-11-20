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
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchServicesSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchServicesFailed( err.message  ) )
            } )
        }
}

export const deleteServiceStart = (  ) => {
    return {
        type: actionTypes.DELETE_SERVICE_START,
    }
}
export const deleteServiceSuccess = ( message, deletedServiceId ) => {
    return {
        type: actionTypes.DELETE_SERVICE_SUCCESS,
        message: message,
        serviceId: deletedServiceId,
    }
}
export const deleteServiceFailed = ( message ) => {
    return {
        type: actionTypes.DELETE_SERVICE_FAILED,
        message: message,
    }
}

export const deleteService = (token , id ) => {
    return dispatch => {
        dispatch( deleteServiceStart( ) )
        axios.delete(`/vendors/services/${id}`)
            .then( response => {
                dispatch( deleteServiceSuccess( response.data , id  ) );
            })
            .catch( err => {
                dispatch( deleteServiceFailed( err.message  ) )
            } )
        }
}


export const searchServicesStart = (  ) => {
    return {
        type: actionTypes.SEARCH_SERVICES_START,
    }
}
export const searchServicesSuccess = ( servicesData ) => {
    return {
        type: actionTypes.SEARCH_SERVICES_SUCCESS,
        services: servicesData
    }
}
export const searchServicesFailed = ( errorMessage ) => {
    return {
        type: actionTypes.SEARCH_SERVICES_FAILED,
        error: errorMessage,
    }
}
export const searchServices = ( language , word ) => {
    return dispatch => {
        dispatch( searchServicesStart( ) )
        axios.get(`/vendors/services?term=${word}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( searchServicesSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( searchServicesFailed( err.message  ) )
            } )
        }
}