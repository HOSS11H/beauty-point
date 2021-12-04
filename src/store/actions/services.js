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
export const fetchServices = ( language, page, perPage, orderBy, orderDir ) => {
    return dispatch => {
        dispatch( fetchServicesStart( ) )
        axios.get(`/vendors/services?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=category&include[]=location&include[]=users&include[]=bookingItems&include[]=company`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                const servicesData = response.data.data;
                console.log( servicesData );
                const convertedServicesData = servicesData.map((service) => {
                    let formattedImages = []
                    if (typeof service.images !== 'string') {
                        service.images.map( (image, index) => {
                            let imageUrl = {
                                'data_url' : `https://testbeauty.beautypoint.sa/user-uploads/service/${service.id}/${image}`,
                            }
                            formattedImages.push(imageUrl)
                            return formattedImages;
                        })
                    } else if ( typeof service.images === 'string' ) {
                        let imageUrl = {
                            'data_url' : `${service.images}`,
                        }
                        formattedImages.push(imageUrl)
                    }
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

export const deleteService = (id ) => {
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
export const updateServiceStart = (  ) => {
    return {
        type: actionTypes.UPDATE_SERVICE_START,
    }
}
export const updateServiceSuccess = ( message, updatedServiceData ) => {
    return {
        type: actionTypes.UPDATE_SERVICE_SUCCESS,
        message: message,
        serviceData: updatedServiceData,
    }
}
export const updateServiceFailed = ( message ) => {
    return {
        type: actionTypes.UPDATE_SERVICE_FAILED,
        message: message,
    }
}

export const updateService = ( data ) => {
    return dispatch => {
        dispatch( updateServiceStart( ) )
        axios.put(`/vendors/services/${data.id}`, data)
            .then( response => {
                dispatch( updateServiceSuccess( response.data, data ) );
            })
            .catch( err => {
                dispatch( updateServiceFailed( err.message  ) )
            } )
        }
}
export const createServiceStart = (  ) => {
    return {
        type: actionTypes.CREATE_SERVICE_START,
    }
}
export const createServiceSuccess = ( message, createdServiceData ) => {
    return {
        type: actionTypes.CREATE_SERVICE_SUCCESS,
        message: message,
        serviceData: createdServiceData,
    }
}
export const createServiceFailed = ( message ) => {
    return {
        type: actionTypes.CREATE_SERVICE_FAILED,
        message: message,
    }
}

export const createService = ( data ) => {
    return dispatch => {
        dispatch( createServiceStart( ) )
        axios.post(`/vendors/services`, data)
        .then( response => {
            console.log(response)
            dispatch( createServiceSuccess( null , {...data,  ...response.data } ) );
            })
            .catch( err => {
                dispatch( createServiceFailed( err.message  ) )
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
        axios.get(`/vendors/services?term=${word}&per_page=15&include[]=category&include[]=location&include[]=users&include[]=bookingItems&include[]=company`, { 
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

export const filterServices = ( language, type, category , location, search ) => {
    return dispatch => {
        dispatch( fetchServicesStart( ) )
        axios.get(`/vendors/${type}?per_page=all&term=${search}&location=${location}&category=${category}&include[]=users`, { 
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