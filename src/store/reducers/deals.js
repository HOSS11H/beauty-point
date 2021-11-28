import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    deals: { data: [ ] } ,
    fetchingDeals: false,
    errorFetchingDeals: false,
    deletingDeal: false,
    deletingDealSuccess: false,
    deletingDealMessage: null,
    searchingDeals: false,
    searchingDealsSuccess: false,
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
        default :
            return state;
    }
}

export default reducer;