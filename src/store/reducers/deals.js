import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    deals: { data: [ ], meta: {} } ,
    fetchingDeals: false,
    errorFetchingDeals: false,
    deletingDeal: false,
    deletingDealSuccess: false,
    deletingDealMessage: null,
    updatingDeal: false,
    updatingDealSuccess: false,
    updatingDealMessage: null,
    creatingDeal: false,
    creatingDealSuccess: false,
    creatingDealMessage: null,
    searchingDeals: false,
    searchingDealsSuccess: false,
    posDeals: {
        deals: { data: [ ], meta: {} } ,
        fetchingDeals: false,
        errorFetchingDeals: false,
    }
} ;

const reducer = ( state = intialState , action ) => {

    switch( action.type ) {
        case ( actionTypes.FETCH_DEALS_START ) :
            return updateObject( state , {
                fetchingDeals: true,
                errorFetchingDeals: false,
            })
        case ( actionTypes.FETCH_DEALS_SUCCESS ) :
            return updateObject( state , {
                fetchingDeals: false,
                deals: action.deals,
            })
        case ( actionTypes.FETCH_DEALS_FAILED ) :
            return updateObject( state , {
                fetchingDeals: false,
                errorFetchingDeals: true,
            })
        case ( actionTypes.DELETE_DEAL_START ) :
            return updateObject( state , {
                deletingDeal: true,
                deletingDealSuccess: false,
                deletingDealMessage: null,
            })
        case ( actionTypes.DELETE_DEAL_SUCCESS ) :
            const updatedDeals = state.deals.data.filter( deal => deal.id !== action.dealId );
            return updateObject( state , {
                deals: {
                    ...state.deals,
                    data: updatedDeals,
                    total: state.deals.total - 1,
                },
                deletingDeal: false,
                deletingDealSuccess: true,
                deletingDealMessage: action.message,
            })
        case ( actionTypes.DELETE_DEAL_FAILED ) :
            return updateObject( state , {
                deletingDeal: false,
                deletingDealSuccess: false,
                deletingDealMessage: action.message,
            })
        case (actionTypes.UPDATE_DEAL_START):
            return updateObject(state, {
                updatingDeal: true,
                updatingDealSuccess: false,
                updatingDealMessage: null,
            })
        case (actionTypes.UPDATE_DEAL_SUCCESS):
            const editedDealIndex = state.deals.data.findIndex(deal => deal.id === action.dealData.id);
            let editedDeal = { ...state.deals.data[editedDealIndex] }

            const updatedEditedDeal = updateObject(editedDeal, {
                ...action.dealData,
                location: action.dealData.locationData,
            })
            const editedDeals = [...state.deals.data]
            editedDeals[editedDealIndex] = updatedEditedDeal
            return updateObject(state, {
                deals: {
                    ...state.deals,
                    data: editedDeals,
                },
                updatingDeal: false,
                updatingDealSuccess: true,
                updatingDealMessage: action.message,
            })
        case (actionTypes.UPDATE_DEAL_FAILED):
            return updateObject(state, {
                updatingDeal: false,
                updatingDealSuccess: false,
                updatingDealMessage: action.message,
            })
        case (actionTypes.CREATE_DEAL_START):
            return updateObject(state, {
                creatingDeal: true,
                creatingDealSuccess: false,
                creatingDealMessage: null,
            })
        case (actionTypes.CREATE_DEAL_SUCCESS):
            const upgradedDeals = [...state.deals.data]
            upgradedDeals.push(action.dealData);
            return updateObject(state, {
                deals: {
                    ...state.deals,
                    data: upgradedDeals,
                    meta: {
                        ...state.deals.meta,
                        total: state.deals.meta.total + 1,
                    }
                },
                creatingDeal: false,
                creatingDealSuccess: true,
                creatingDealMessage: action.message,
            })
        case (actionTypes.CREATE_DEAL_FAILED):
            return updateObject(state, {
                creatingDeal: false,
                creatingDealSuccess: false,
                creatingDealMessage: action.message,
            })
        case ( actionTypes.SEARCH_DEALS_START ) :
            return updateObject( state , {
                fetchingDeals: true,
                errorFetchingDeals: false,
                searchingDeals: true,
                searchingDealsSuccess: false,
            })
        case ( actionTypes.SEARCH_DEALS_SUCCESS ) :
            return updateObject( state , {
                fetchingDeals: false,
                deals: action.deals,
                searchingDeals: false,
                searchingDealsSuccess: true,
            })
        case ( actionTypes.SEARCH_DEALS_FAILED ) :
            return updateObject( state , {
                fetchingDeals: false,
                errorFetchingDeals: true,
                searchingDeals: false,
                searchingDealsSuccess: false,
            })
        case ( actionTypes.FILTER_DEALS_START ) :
            return updateObject( state , {
                posDeals: {
                    ...state.posDeals,
                    fetchingDeals: true,
                    errorFetchingDeals: false,
                }
            })
        case ( actionTypes.FILTER_DEALS_SUCCESS ) :
            return updateObject( state , {
                posDeals: {
                    ...state.posDeals,
                    fetchingDeals: false,
                    deals: action.deals,
                }
            })
        case ( actionTypes.FILTER_DEALS_FAILED ) :
            return updateObject( state , {
                posDeals: {
                    ...state.posDeals,
                    fetchingDeals: false,
                    errorFetchingDeals: true,
                }
            })
        default :
            return state;
    }
}

export default reducer;