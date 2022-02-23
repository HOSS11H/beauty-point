import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    services: { data: [ ], meta: {  } },
    fetchingServices: false,
    errorFetchingServices: false,
    deletingService: false,
    deletingServiceSuccess: false,
    deletingServiceMessage: null,
    updatingService: false,
    updatingServiceSuccess: false,
    updatingServiceFailed: false,
    updatingServiceMessage: null,
    creatingService: false,
    creatingServiceSuccess: false,
    creatingServiceFailed: false,
    creatingServiceMessage: null,
    searchingServices: false,
    searchingServicesSuccess: false,
    servicesByLocation: { 
        services: {
            data: [ ]
        }, 
        fetchingServices: false,
        errorFetchingServices: false,
    },
    posServices: {
        services: { data: [ ], meta: {  } },
        fetchingServices: false,
        errorFetchingServices: false,
    }
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
        case ( actionTypes.DELETE_SERVICE_START ) :
            return updateObject( state , {
                deletingService: true,
                deletingServiceSuccess: false,
                deletingServiceMessage: null,
            })
        case ( actionTypes.DELETE_SERVICE_SUCCESS ) :
            const updatedServices = state.services.data.filter( service => service.id !== action.serviceId );
            //console.log(state.services)
            return updateObject( state , {
                services: {
                    ...state.services,
                    data: updatedServices,
                    meta : {
                        ...state.services.meta,
                        total: state.services.meta.total - 1,
                    }
                },
                deletingService: false,
                deletingServiceSuccess: true,
                deletingServiceMessage: action.message,
            })
        case ( actionTypes.DELETE_SERVICE_FAILED ) :
            return updateObject( state , {
                deletingService: false,
                deletingServiceSuccess: false,
                deletingServiceMessage: action.message,
            })
        case ( actionTypes.UPDATE_SERVICE_START ) :
            return updateObject( state , {
                updatingService: true,
                updatingServiceSuccess: false,
                updatingServiceFailed: false,
                updatingServiceMessage: null,
            })
        case ( actionTypes.UPDATE_SERVICE_SUCCESS ) :
            return updateObject( state , {
                updatingService: false,
                updatingServiceSuccess: true,
            })
        case ( actionTypes.RESET_UPDATE_SERVICE_SUCCESS ) : {
            return updateObject( state , {
                updatingServiceSuccess: false,
                updatingServiceMessage: null,
            })
        }
        case ( actionTypes.UPDATE_SERVICE_FAILED ) :
            return updateObject( state , {
                updatingService: false,
                updatingServiceFailed: true,
                updatingServiceMessage: action.message,
            })
        case ( actionTypes.CREATE_SERVICE_START ) :
            return updateObject( state , {
                creatingService: true,
                creatingServiceSuccess: false,
                creatingServiceFailed: false,
                creatingServiceMessage: null,
            })
        case ( actionTypes.CREATE_SERVICE_SUCCESS ) :
            return updateObject( state , {
                creatingService: false,
                creatingServiceSuccess: true,
            })
        case ( actionTypes.RESET_CREATE_SERVICE_SUCCESS ) : {
            return updateObject( state , {
                creatingServiceSuccess: false,
            })
        }
        case ( actionTypes.CREATE_SERVICE_FAILED ) :
            return updateObject( state , {
                creatingService: false,
                creatingServiceFailed: true,
                creatingServiceMessage: action.message,
            })
        case ( actionTypes.SEARCH_SERVICES_START ) :
            return updateObject( state , {
                fetchingServices: true,
                errorFetchingServices: false,
                searchingServices: true,
                searchingServicesSuccess: false,
            })
        case ( actionTypes.SEARCH_SERVICES_SUCCESS ) :
            return updateObject( state , {
                fetchingServices: false,
                services: action.services,
                searchingServices: false,
                searchingServicesSuccess: true,
            })
        case ( actionTypes.SEARCH_SERVICES_FAILED ) :
            return updateObject( state , {
                fetchingServices: false,
                errorFetchingServices: true,
                searchingServices: false,
                searchingServicesSuccess: false,
            })
        case ( actionTypes.FILTER_SERVICES_START ) :
            return updateObject( state , {
                posServices: {
                    ...state.posServices,
                    fetchingServices: true,
                    errorFetchingServices: false,
                }
            })
        case ( actionTypes.FILTER_SERVICES_SUCCESS ) :
            return updateObject( state , {
                posServices: {
                    ...state.posServices,
                    fetchingServices: false,
                    services: action.services,
                }
            })
        case ( actionTypes.FILTER_SERVICES_FAILED ) :
            return updateObject( state , {
                posServices: {
                    ...state.posServices,
                    fetchingServices: false,
                    errorFetchingServices: true,
                },
            })
        case ( actionTypes.FETCH_SERVICES_BY_LOCATION_START ) :
            return updateObject( state , {
                servicesByLocation: {
                    ...state.servicesByLocation,
                    fetchingServices: true,
                    errorFetchingServices: false,
                }
            })
        case ( actionTypes.FETCH_SERVICES_BY_LOCATION_SUCCESS ) :
            return updateObject( state , {
                servicesByLocation: {
                    ...state.servicesByLocation,
                    services: action.services,
                    fetchingServices: false,
                    errorFetchingServices: false,
                }
            })
        case ( actionTypes.FETCH_SERVICES_BY_LOCATION_FAILED ) :
            return updateObject( state , {
                servicesByLocation: {
                    ...state.servicesByLocation,
                    fetchingServices: false,
                    errorFetchingServices: true,
                },
            })
        default :
            return state;
    }
}

export default reducer;
