import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


export const fetchReturnsStart = () => {
    return {
        type: actionTypes.FETCH_BOOKINGS_START,
    }
}
export const fetchReturnsSuccess = (returnsData) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_SUCCESS,
        returns: returnsData
    }
}
export const fetchReturnsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_FAILED,
        error: errorMessage,
    }
}
export const fetchReturns = (language, page, perPage) => {
    return dispatch => {
        dispatch(fetchReturnsStart())
        axios.get(`/vendors/returns?page=${page + 1}&per_page=${perPage}&include[]=user&include[]=booking&include[]=items`, {
            headers: {
                'Accept-Language': language,
            }
        })
            .then(response => {
                let editedData = response.data.data.map(item => {
                    const formattedTime = new Date(item.date_time).toLocaleString()
                    const arr = formattedTime.replace(/:.. /, " ").split(", ");
                    let date = arr[0]
                    let time = arr[1]
                    return {
                        ...item,
                        date: date,
                        time: time,
                    }
                })
                dispatch(fetchReturnsSuccess({ ...response.data, data: editedData }));
            })
            .catch(err => {
                dispatch(fetchReturnsFailed(err.message))
            })
    }
}

export const deleteReturnStart = () => {
    return {
        type: actionTypes.DELETE_BOOKING_START,
    }
}
export const deleteReturnSuccess = (message, deletedReturnId) => {
    return {
        type: actionTypes.DELETE_BOOKING_SUCCESS,
        message: message,
        returnId: deletedReturnId,
    }
}
export const deleteReturnFailed = (message) => {
    return {
        type: actionTypes.DELETE_BOOKING_FAILED,
        message: message,
    }
}

export const deleteReturn = (id) => {
    return dispatch => {
        dispatch(deleteReturnStart())
        axios.delete(`/vendors/returns/${id}`)
            .then(response => {
                dispatch(deleteReturnSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteReturnFailed(err.message))
            })
    }
}

export const updateReturnStart = () => {
    return {
        type: actionTypes.UPDATE_BOOKING_START,
    }
}
export const updateReturnSuccess = (updatedReturnData) => {
    return {
        type: actionTypes.UPDATE_BOOKING_SUCCESS,
        returnData: updatedReturnData,
    }
}
export const resetUpdateReturnSuccess = (updatedDealData) => {
    return {
        type: actionTypes.RESET_UPDATE_BOOKING_SUCCESS,
    }
}
export const updateReturnFailed = (message) => {
    return {
        type: actionTypes.UPDATE_BOOKING_FAILED,
        message: message,
    }
}

export const updateReturn = (data) => {
    return dispatch => {
        dispatch(updateReturnStart())
        axios.put(`/vendors/returns/${data.id}`, data)
            .then(response => {
                dispatch(updateReturnSuccess(data));
                setTimeout(() => {
                    dispatch(resetUpdateReturnSuccess())
                }, 1000)
            })
            .catch(err => {
                const errs = err.response?.data.errors;
                for (let key in errs) {
                    dispatch(updateReturnFailed(errs[key][0]))
                }
            })
    }
}

export const createReturnStart = () => {
    return {
        type: actionTypes.CREATE_BOOKING_START,
    }
}
export const createReturnSuccess = () => {
    return {
        type: actionTypes.CREATE_BOOKING_SUCCESS,
    }
}
export const resetCreateReturnSuccess = () => {
    return {
        type: actionTypes.RESET_CREATE_BOOKING_SUCCESS,
    }
}
export const createReturnFailed = (message) => {
    return {
        type: actionTypes.CREATE_BOOKING_FAILED,
        message: message,
    }
}

export const createReturn = (data) => {
    return dispatch => {
        dispatch(createReturnStart())
        axios.post(`/vendors/returns`, data)
            .then(response => {
                dispatch(createReturnSuccess());
                setTimeout(() => {
                    dispatch(resetCreateReturnSuccess())
                }, 4000)
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(createReturnFailed(errs[key][0]))
                }
            })
    }
}

export const filterReturnsStart = () => {
    return {
        type: actionTypes.FILTER_BOOKINGS_START,
    }
}
export const filterReturnsSuccess = (returnsData) => {
    return {
        type: actionTypes.FILTER_BOOKINGS_SUCCESS,
        returns: returnsData
    }
}
export const filterReturnsFailed = (errorMessage) => {
    return {
        type: actionTypes.FILTER_BOOKINGS_FAILED,
        error: errorMessage,
    }
}

export const filterReturns = ( searchParams ) => {
    return dispatch => {
        dispatch(filterReturnsStart())
        const notEmptySearchParams = {}
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        axios.get(`/vendors/returns?include[]=user&include[]=booking&include[]=items`, { params: { ...notEmptySearchParams } } )
            .then(response => {
                let editedData = response.data.data.map(item => {
                    const formattedTime = new Date(item.date_time).toLocaleString()
                    const arr = formattedTime.replace(/:.. /, " ").split(", ");
                    let date = arr[0]
                    let time = arr[1]
                    return {
                        ...item,
                        date: date,
                        time: time,
                    }
                })
                dispatch(filterReturnsSuccess({ ...response.data, data: editedData }));
            })
            .catch(err => {
                dispatch(filterReturnsFailed(err.message))
            })
    }
}


