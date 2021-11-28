import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';

export const fetchDealsStart = (  ) => {
    return {
        type: actionTypes.FETCH_DEALS_START,
    }
}
export const fetchDealsSuccess = ( dealsData ) => {
    return {
        type: actionTypes.FETCH_DEALS_SUCCESS,
        deals: dealsData
    }
}
export const fetchDealsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_DEALS_FAILED,
        error: errorMessage,
    }
}
export const fetchDeals = ( language, token , page ) => {
    return dispatch => {
        dispatch( fetchDealsStart( ) )
        axios.get(`/vendors/deals?page=${page + 1}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                let editedData = response.data.data.map( item => {
                    const formattedStartDate = item.start_date_time.split(" ");
                    const formattedEndDate = item.end_date_time.split(" ");
                    let startDate = formattedStartDate[0]
                    let startTime = formattedStartDate[1]
                    let endDate = formattedEndDate[0]
                    let endTime = formattedEndDate[1]
                    return {
                        ...item,
                        formattedDate: {
                            startDate: startDate,
                            endDate: endDate,
                        },
                        formattedTime: {
                            startTime: startTime,
                            endTime: endTime,
                        }
                    }
                }) 
                dispatch( fetchDealsSuccess( { ...response.data , data: editedData } ) );
            })
            .catch( err => {
                dispatch( fetchDealsFailed( err.message  ) )
            } )
        }
}

export const deleteDealStart = (  ) => {
    return {
        type: actionTypes.DELETE_DEAL_START,
    }
}
export const deleteDealSuccess = ( message, deletedDealId ) => {
    return {
        type: actionTypes.DELETE_DEAL_SUCCESS,
        message: message,
        dealId: deletedDealId,
    }
}
export const deleteDealFailed = ( message ) => {
    return {
        type: actionTypes.DELETE_DEAL_FAILED,
        message: message,
    }
}

export const deleteDeal = (token , id ) => {
    return dispatch => {
        dispatch( deleteDealStart( ) )
        axios.delete(`/vendors/deals/${id}`)
            .then( response => {
                dispatch( deleteDealSuccess( response.data , id  ) );
            })
            .catch( err => {
                dispatch( deleteDealFailed( err.message  ) )
            } )
        }
}

export const searchDealsStart = (  ) => {
    return {
        type: actionTypes.SEARCH_DEALS_START,
    }
}
export const searchDealsSuccess = ( dealsData ) => {
    return {
        type: actionTypes.SEARCH_DEALS_SUCCESS,
        deals: dealsData
    }
}
export const searchDealsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.SEARCH_DEALS_FAILED,
        error: errorMessage,
    }
}
export const searchDeals = ( language , word ) => {
    return dispatch => {
        dispatch( searchDealsStart( ) )
        axios.get(`/vendors/deals?term=${word}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                let editedData = response.data.data.map( item => {
                    const formattedStartDate = item.start_date_time.split(" ");
                    const formattedEndDate = item.end_date_time.split(" ");
                    let startDate = formattedStartDate[0]
                    let startTime = formattedStartDate[1]
                    let endDate = formattedEndDate[0]
                    let endTime = formattedEndDate[1]
                    return {
                        ...item,
                        formattedDate: {
                            startDate: startDate,
                            endDate: endDate,
                        },
                        formattedTime: {
                            startTime: startTime,
                            endTime: endTime,
                        }
                    }
                }) 
                dispatch( searchDealsSuccess( { ...response.data , data: editedData } ) );
            })
            .catch( err => {
                dispatch( searchDealsFailed( err.message  ) )
            } )
        }
}

export const filterDeals = ( language, page , type, category , location, search ) => {
    return dispatch => {
        dispatch( fetchDealsStart( ) )
        axios.get(`/vendors/${type}?page=${page + 1}term=${search}&location=${location}&category=${category}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchDealsSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchDealsFailed( err.message  ) )
            } )
        }
}