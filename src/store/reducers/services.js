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
    updatingServiceMessage: null,
    creatingService: false,
    creatingServiceSuccess: false,
    creatingServiceMessage: null,
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
            console.log(state.services)
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
                updatingServiceMessage: null,
            })
        case ( actionTypes.UPDATE_SERVICE_SUCCESS ) :
            const editedServiceIndex = state.services.data.findIndex(service => service.id === action.serviceData.id);
            let editedService = {...state.services.data[editedServiceIndex]}
            const updatedEditedService = updateObject(editedService, {
                name: action.serviceData.name,
                description: action.serviceData.description,
                price: action.serviceData.price,
                price_after_discount: action.serviceData.price_after_discount,
                discount: action.serviceData.discount,
                discount_type: action.serviceData.discount_type,
                users: action.serviceData.users,
                status: action.serviceData.status,
                image: action.serviceData.image,
                images: action.serviceData.images,
            })
            console.log(updatedEditedService);
            const editedServices = [...state.services.data]
            editedServices[editedServiceIndex] = updatedEditedService
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
        case ( actionTypes.CREATE_SERVICE_START ) :
            return updateObject( state , {
                creatingService: true,
                creatingServiceSuccess: false,
                creatingServiceMessage: null,
            })
        case ( actionTypes.CREATE_SERVICE_SUCCESS ) :
            const upgradedServices = [...state.services.data]
            upgradedServices.push(action.serviceData);

            return updateObject( state , {
                services: {
                    ...state.services,
                    data: upgradedServices,
                    meta : {
                        ...state.services.meta,
                        total: state.services.meta.total + 1,
                    }
                },
                creatingService: false,
                creatingServiceSuccess: true,
                creatingServiceMessage: action.message,
            })
        case ( actionTypes.CREATE_SERVICE_FAILED ) :
            return updateObject( state , {
                creatingService: false,
                creatingServiceSuccess: false,
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
        default :
            return state;
    }
}

export default reducer;