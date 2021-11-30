import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    services: { data: [ ] } ,
    fetchingServices: false,
    errorFetchingServices: false,
    deletingService: false,
    deletingServiceSuccess: false,
    deletingServiceMessage: null,
    updatingService: true,
    updatingServiceSuccess: false,
    updatingServiceMessage: null,
    searchingServices: false,
    searchingServicesSuccess: false,
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
            return updateObject( state , {
                services: {
                    ...state.services,
                    data: updatedServices,
                    total: state.services.total - 1,
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
                updatingServiceMessage: null,
            })
        case ( actionTypes.UPDATE_SERVICE_SUCCESS ) :
            const editedServiceIndex = state.services.findIndex(service => service.id === action.serviceData.id);
            const editedService = {...state.services[editedServiceIndex]}
            
            const editedServices = [...state.services]
            editedServices[editedServiceIndex] = editedService
            
            return updateObject( state , {
                services: {
                    ...state.services,
                    data: editedServices,
                },
                updatingService: false,
                updatingServiceSuccess: true,
                updatingServiceMessage: action.message,
            })
        case ( actionTypes.UPDATE_SERVICE_FAILED ) :
            return updateObject( state , {
                updatingService: false,
                updatingServiceSuccess: false,
                updatingServiceMessage: action.message,
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
        default :
            return state;
    }
}

export default reducer;