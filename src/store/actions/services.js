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
export const fetchServices = ( language, token , page, perPage ) => {
    return dispatch => {
        dispatch( fetchServicesStart( ) )
        axios.get(`/vendors/services?page=${page + 1}&per_page=15&include[]=category&include[]=location&include[]=bookingItems&include[]=company`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                const servicesData = response.data.data;
                const convertedServicesData = servicesData.map((service) => {
                    let formattedImages = []
                    service.images.map( (image, index) => {
                        let imageUrl = {
                            'data_url' : `https://testbeauty.beautypoint.sa/user-uploads/service/${service.id}/${image}`,
                        }
                        formattedImages.push(imageUrl)
                        return formattedImages;
                    })
                    return {
                        ...service,
                        images: formattedImages
                    };
                })
                dispatch( fetchServicesSuccess( {...response.data, data: convertedServicesData}  ) );
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

export const filterServices = ( language, page , type, category , location, search ) => {
    return dispatch => {
        dispatch( fetchServicesStart( ) )
        axios.get(`/vendors/${type}?page=${page + 1}term=${search}&location=${location}&category=${category}`, { 
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