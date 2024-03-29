import axios from '../../utils/axios-instance';
import * as actionTypes from './actionTypes';


export const fetchServicesStart = () => {
    return {
        type: actionTypes.FETCH_SERVICES_START,
    }
}
export const fetchServicesSuccess = (servicesData) => {
    return {
        type: actionTypes.FETCH_SERVICES_SUCCESS,
        services: servicesData
    }
}
export const fetchServicesFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_SERVICES_FAILED,
        error: errorMessage,
    }
}
export const fetchServicesTable = (language, page, perPage, orderBy, orderDir) => {
    return dispatch => {
        dispatch(fetchServicesStart())
        axios.get(`/vendors/services?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=category&include[]=location&include[]=users`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            const servicesData = response.data.data;
            const convertedServicesData = servicesData.map((service) => {
                let formattedImages = []
                if (typeof service.images !== 'string') {
                    service.images.map((image, index) => {
                        let imageUrl = {
                            'data_url': `https://testbeauty.beautypoint.sa/user-uploads/service/${service.id}/${image}`,
                        }
                        formattedImages.push(imageUrl)
                        return formattedImages;
                    })
                } else if (typeof service.images === 'string') {
                    let imageUrl = {
                        'data_url': `${service.images}`,
                    }
                    formattedImages.push(imageUrl)
                }
                return {
                    ...service,
                    images: formattedImages
                };
            })
            dispatch(fetchServicesSuccess({ ...response.data, data: convertedServicesData }));
        })
            .catch(err => {
                dispatch(fetchServicesFailed(err.message))
            })
    }
}
export const fetchServices = (language, page, perPage, orderBy, orderDir) => {
    return dispatch => {
        dispatch(fetchServicesStart())
        axios.get(`/vendors/services?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=category&include[]=location&include[]=users&include[]=company&include[]=products`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            const servicesData = response.data.data;
            const convertedServicesData = servicesData.map((service) => {
                let formattedImages = []
                if (typeof service.images !== 'string') {
                    service.images.map((image, index) => {
                        let imageUrl = {
                            'data_url': `https://testbeauty.beautypoint.sa/user-uploads/service/${service.id}/${image}`,
                        }
                        formattedImages.push(imageUrl)
                        return formattedImages;
                    })
                } else if (typeof service.images === 'string') {
                    let imageUrl = {
                        'data_url': `${service.images}`,
                    }
                    formattedImages.push(imageUrl)
                }
                return {
                    ...service,
                    images: formattedImages
                };
            })
            dispatch(fetchServicesSuccess({ ...response.data, data: convertedServicesData }));
        })
            .catch(err => {
                dispatch(fetchServicesFailed(err.message))
            })
    }
}

export const deleteServiceStart = () => {
    return {
        type: actionTypes.DELETE_SERVICE_START,
    }
}
export const deleteServiceSuccess = (message, deletedServiceId) => {
    return {
        type: actionTypes.DELETE_SERVICE_SUCCESS,
        message: message,
        serviceId: deletedServiceId,
    }
}
export const deleteServiceFailed = (message) => {
    return {
        type: actionTypes.DELETE_SERVICE_FAILED,
        message: message,
    }
}

export const deleteService = (id) => {
    return dispatch => {
        dispatch(deleteServiceStart())
        axios.delete(`/vendors/services/${id}`)
            .then(response => {
                dispatch(deleteServiceSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteServiceFailed(err.message))
            })
    }
}
export const updateServiceStart = () => {
    return {
        type: actionTypes.UPDATE_SERVICE_START,
    }
}
export const updateServiceSuccess = ( updatedServiceData) => {
    return {
        type: actionTypes.UPDATE_SERVICE_SUCCESS,
        serviceData: updatedServiceData,
    }
}
export const resetUpdateServiceSuccess = () => {
    return {
        type: actionTypes.RESET_UPDATE_SERVICE_SUCCESS,
    }
}
export const updateServiceFailed = (message) => {
    return {
        type: actionTypes.UPDATE_SERVICE_FAILED,
        message: message,
    }
}

export const updateService = (data) => {
    return dispatch => {
        dispatch(updateServiceStart())
        axios.post(`/vendors/services/${data.get('id')}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
                dispatch(updateServiceSuccess(data));
                setTimeout(() => {
                    dispatch(resetUpdateServiceSuccess())
                }, 2000)
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateServiceFailed(errs[key][0]))
                }
            })
    }
}
export const createServiceStart = () => {
    return {
        type: actionTypes.CREATE_SERVICE_START,
    }
}
export const createServiceSuccess = (message, createdServiceData) => {
    return {
        type: actionTypes.CREATE_SERVICE_SUCCESS,
        serviceData: createdServiceData,
    }
}
export const resetCreateServiceSuccess = () => {
    return {
        type: actionTypes.RESET_CREATE_SERVICE_SUCCESS,
    }
}
export const createServiceFailed = (message) => {
    return {
        type: actionTypes.CREATE_SERVICE_FAILED,
        message: message,
    }
}

export const createService = (data) => {
    return dispatch => {
        dispatch(createServiceStart())
        axios.post(`/vendors/services`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
                dispatch(createServiceSuccess(null, { ...data, ...response.data }));
                setTimeout(() => {
                    dispatch(resetCreateServiceSuccess())
                }, 2000)
            })
            .catch(err => {
                if ( err.response.data.errors ) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        dispatch(createServiceFailed(errs[key][0]))
                    }

                } else {
                    dispatch(createServiceFailed(err.response.data.message))
                }
            })
    }
}


export const searchServicesStart = () => {
    return {
        type: actionTypes.SEARCH_SERVICES_START,
    }
}
export const searchServicesSuccess = (servicesData) => {
    return {
        type: actionTypes.SEARCH_SERVICES_SUCCESS,
        services: servicesData
    }
}
export const searchServicesFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_SERVICES_FAILED,
        error: errorMessage,
    }
}
export const searchServices = (language, word) => {
    return dispatch => {
        dispatch(searchServicesStart())
        axios.get(`/vendors/services?term=${word}&page=1&per_page=15&include[]=category&include[]=location&include[]=users&include[]=company&include[]=products`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchServicesSuccess(response.data));
        })
            .catch(err => {
                dispatch(searchServicesFailed(err.message))
            })
    }
}
export const filterServicesStart = () => {
    return {
        type: actionTypes.FILTER_SERVICES_START,
    }
}
export const filterServicesSuccess = (servicesData) => {
    return {
        type: actionTypes.FILTER_SERVICES_SUCCESS,
        services: servicesData
    }
}
export const filterServicesFailed = (errorMessage) => {
    return {
        type: actionTypes.FILTER_SERVICES_FAILED,
        error: errorMessage,
    }
}
export const filterServices = (language, type, category, location, search, page, perPage) => {
    return dispatch => {
        dispatch(filterServicesStart())
        axios.get(`/vendors/${type}?page=${page + 1}&per_page=${perPage}&term=${search}&location_id=${location}&category_id=${category}`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(filterServicesSuccess(response.data));
        })
            .catch(err => {
                dispatch(filterServicesFailed(err.message))
            })
    }
}

export const fetchServicesByLocationStart = () => {
    return {
        type: actionTypes.FETCH_SERVICES_BY_LOCATION_START,
    }
}
export const fetchServicesByLocationSuccess = (servicesData) => {
    return {
        type: actionTypes.FETCH_SERVICES_BY_LOCATION_SUCCESS,
        services: servicesData
    }
}
export const fetchServicesByLocationFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_SERVICES_BY_LOCATION_FAILED,
        error: errorMessage,
    }
}

export const fetchServicesByLocation = (language, location) => {
    return dispatch => {
        dispatch(fetchServicesByLocationStart())
        axios.get(`/vendors/services?location_id=${location}`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(fetchServicesByLocationSuccess(response.data));
        })
            .catch(err => {
                dispatch(fetchServicesByLocationFailed(err.message))
            })
    }
}