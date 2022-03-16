import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';

export const fetchDealsStart = () => {
    return {
        type: actionTypes.FETCH_DEALS_START,
    }
}
export const fetchDealsSuccess = (dealsData) => {
    return {
        type: actionTypes.FETCH_DEALS_SUCCESS,
        deals: dealsData
    }
}
export const fetchDealsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_DEALS_FAILED,
        error: errorMessage,
    }
}
export const fetchDeals = (language, page, perPage, orderBy, orderDir) => {
    return dispatch => {
        dispatch(fetchDealsStart())
        axios.get(`/vendors/deals?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=services&include[]=location`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            let editedData = response.data.data.map(item => {
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
            dispatch(fetchDealsSuccess({ ...response.data, data: editedData }));
        })
            .catch(err => {
                //console.log(err)
                dispatch(fetchDealsFailed(err.message))
            })
    }
}

export const deleteDealStart = () => {
    return {
        type: actionTypes.DELETE_DEAL_START,
    }
}
export const deleteDealSuccess = (message, deletedDealId) => {
    return {
        type: actionTypes.DELETE_DEAL_SUCCESS,
        message: message,
        dealId: deletedDealId,
    }
}
export const deleteDealFailed = (message) => {
    return {
        type: actionTypes.DELETE_DEAL_FAILED,
        message: message,
    }
}

export const deleteDeal = (id) => {
    return dispatch => {
        dispatch(deleteDealStart())
        axios.delete(`/vendors/deals/${id}`)
            .then(response => {
                dispatch(deleteDealSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteDealFailed(err.message))
            })
    }
}
export const updateDealStart = () => {
    return {
        type: actionTypes.UPDATE_DEAL_START,
    }
}
export const updateDealSuccess = ( updatedDealData) => {
    return {
        type: actionTypes.UPDATE_DEAL_SUCCESS,
        dealData: updatedDealData,
    }
}
export const resetUpdateDealSuccess = () => {
    return {
        type: actionTypes.RESET_UPDATE_DEAL_SUCCESS,
    }
}
export const updateDealFailed = (message) => {
    return {
        type: actionTypes.UPDATE_DEAL_FAILED,
        message: message,
    }
}
export const updateDeal = (data) => {
    return dispatch => {
        dispatch(updateDealStart())
        axios.post(`/vendors/deals/${data.get('id')}`, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                dispatch(updateDealSuccess(data));
                setTimeout(() => {
                    dispatch(resetUpdateDealSuccess())
                }, 1000)
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateDealFailed(errs[key][0]))
                }
            })
    }
}
export const createDealStart = () => {
    return {
        type: actionTypes.CREATE_DEAL_START,
    }
}
export const createDealSuccess = ( createdDealData) => {
    return {
        type: actionTypes.CREATE_DEAL_SUCCESS,
        dealData: createdDealData,
    }
}
export const resetCreateDealSuccess = () => {
    return {
        type: actionTypes.RESET_CREATE_DEAL_SUCCESS,
    }
}
export const createDealFailed = (message) => {
    return {
        type: actionTypes.CREATE_DEAL_FAILED,
        message: message,
    }
}

export const createDeal = (data) => {
    return dispatch => {
        dispatch(createDealStart())
        axios.post(`/vendors/deals`, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                dispatch(createDealSuccess(response.data));
                setTimeout(() => {
                    dispatch(resetCreateDealSuccess())
                }, 1000)
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(createDealFailed(errs[key][0]))
                }
            })
    }
}

export const searchDealsStart = () => {
    return {
        type: actionTypes.SEARCH_DEALS_START,
    }
}
export const searchDealsSuccess = (dealsData) => {
    return {
        type: actionTypes.SEARCH_DEALS_SUCCESS,
        deals: dealsData
    }
}
export const searchDealsFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_DEALS_FAILED,
        error: errorMessage,
    }
}
export const searchDeals = (language, word) => {
    return dispatch => {
        dispatch(searchDealsStart())
        axios.get(`/vendors/deals?term=${word}&page=1&per_page=15&include[]=services&include[]=location`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            let editedData = response.data.data.map(item => {
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
            dispatch(searchDealsSuccess({ ...response.data, data: editedData }));
        })
            .catch(err => {
                dispatch(searchDealsFailed(err.message))
            })
    }
}
export const filterDealsStart = () => {
    return {
        type: actionTypes.FILTER_DEALS_START,
    }
}
export const filterDealsSuccess = (dealsData) => {
    return {
        type: actionTypes.FILTER_DEALS_SUCCESS,
        deals: dealsData
    }
}
export const filterDealsFailed = (errorMessage) => {
    return {
        type: actionTypes.FILTER_DEALS_FAILED,
        error: errorMessage,
    }
}

export const filterDeals = (language, type, location, search, page, perPage) => {
    return dispatch => {
        dispatch(filterDealsStart())
        axios.get(`/vendors/${type}?page=${page + 1}&per_page=${perPage}&term=${search}&location_id=${location}`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            let editedData = response.data.data.map(item => {
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
            dispatch(filterDealsSuccess({ ...response.data, data: editedData }));
        })
            .catch(err => {
                //console.log(err)
                dispatch(filterDealsFailed(err.message))
            })
    }
}