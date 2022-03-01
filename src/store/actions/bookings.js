import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';
import v1 from '../../utils/axios-instance-v1'


export const fetchBookingsStart = () => {
    return {
        type: actionTypes.FETCH_BOOKINGS_START,
    }
}
export const fetchBookingsSuccess = (bookingsData) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_SUCCESS,
        bookings: bookingsData
    }
}
export const fetchBookingsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_FAILED,
        error: errorMessage,
    }
}
export const fetchBookings = (language, page, perPage) => {
    return dispatch => {
        dispatch(fetchBookingsStart())
        axios.get(`/vendors/bookings?page=${page + 1}&per_page=${perPage}&include[]=user`, {
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
                dispatch(fetchBookingsSuccess({ ...response.data, data: editedData }));
            })
            .catch(err => {
                dispatch(fetchBookingsFailed(err.message))
            })
    }
}

export const deleteBookingStart = () => {
    return {
        type: actionTypes.DELETE_BOOKING_START,
    }
}
export const deleteBookingSuccess = (message, deletedBookingId) => {
    return {
        type: actionTypes.DELETE_BOOKING_SUCCESS,
        message: message,
        bookingId: deletedBookingId,
    }
}
export const deleteBookingFailed = (message) => {
    return {
        type: actionTypes.DELETE_BOOKING_FAILED,
        message: message,
    }
}

export const deleteBooking = (id) => {
    return dispatch => {
        dispatch(deleteBookingStart())
        axios.delete(`/vendors/bookings/${id}`)
            .then(response => {
                dispatch(deleteBookingSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteBookingFailed(err.message))
            })
    }
}

export const updateBookingStart = () => {
    return {
        type: actionTypes.UPDATE_BOOKING_START,
    }
}
export const updateBookingSuccess = (updatedBookingData) => {
    return {
        type: actionTypes.UPDATE_BOOKING_SUCCESS,
        bookingData: updatedBookingData,
    }
}
export const resetUpdateBookingSuccess = (updatedDealData) => {
    return {
        type: actionTypes.RESET_UPDATE_BOOKING_SUCCESS,
    }
}
export const updateBookingFailed = (message) => {
    return {
        type: actionTypes.UPDATE_BOOKING_FAILED,
        message: message,
    }
}

export const updateBooking = (data) => {
    return dispatch => {
        dispatch(updateBookingStart())
        axios.put(`/vendors/bookings/${data.id}`, data)
            .then(response => {
                dispatch(updateBookingSuccess(data));
                setTimeout(() => {
                    dispatch(resetUpdateBookingSuccess())
                }, 1000)
            })
            .catch(err => {
                const errs = err.response?.data.errors;
                for (let key in errs) {
                    dispatch(updateBookingFailed(errs[key][0]))
                }
            })
    }
}

export const createBookingStart = () => {
    return {
        type: actionTypes.CREATE_BOOKING_START,
    }
}
export const createBookingSuccess = () => {
    return {
        type: actionTypes.CREATE_BOOKING_SUCCESS,
    }
}
export const resetCreateBookingSuccess = () => {
    return {
        type: actionTypes.RESET_CREATE_BOOKING_SUCCESS,
    }
}
export const createBookingFailed = (message) => {
    return {
        type: actionTypes.CREATE_BOOKING_FAILED,
        message: message,
    }
}

export const createBooking = (data) => {
    return dispatch => {
        dispatch(createBookingStart())
        axios.post(`/vendors/bookings`, data)
            .then(response => {
                dispatch(createBookingSuccess());
                setTimeout(() => {
                    dispatch(resetCreateBookingSuccess())
                }, 4000)
            })
            .catch(err => {
                const errs = err.response.data.errors;
                for (let key in errs) {
                    dispatch(createBookingFailed(errs[key][0]))
                }
            })
    }
}

export const filterBookingsStart = () => {
    return {
        type: actionTypes.FILTER_BOOKINGS_START,
    }
}
export const filterBookingsSuccess = (bookingsData) => {
    return {
        type: actionTypes.FILTER_BOOKINGS_SUCCESS,
        bookings: bookingsData
    }
}
export const filterBookingsFailed = (errorMessage) => {
    return {
        type: actionTypes.FILTER_BOOKINGS_FAILED,
        error: errorMessage,
    }
}

export const filterBookings = ( searchParams ) => {
    return dispatch => {
        dispatch(filterBookingsStart())
        const notEmptySearchParams = {}
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        axios.get(`/vendors/bookings?include[]=user&include[]=users&include[]=items`, { params: { ...notEmptySearchParams } } )
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
                dispatch(filterBookingsSuccess({ ...response.data, data: editedData }));
            })
            .catch(err => {
                dispatch(filterBookingsFailed(err.message))
            })
    }
}

export const fetchTotalBookingsStart = () => {
    return {
        type: actionTypes.FETCH_TOTAL_BOOKINGS_START,
    }
}
export const fetchTotalBookingsSuccess = (bookingsData) => {
    return {
        type: actionTypes.FETCH_TOTAL_BOOKINGS_SUCCESS,
        totalBookings: bookingsData
    }
}
export const fetchTotalBookingsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_TOTAL_BOOKINGS_FAILED,
        error: errorMessage,
    }
}
export const fetchTotalBookings = (language) => {
    return dispatch => {
        dispatch(fetchTotalBookingsStart())
        v1.get('/vendor/company-status', {
            headers: {
                'Accept-Language': language,
            }
        }).then(response => {
            dispatch(fetchTotalBookingsSuccess(response.data.bookings_count));
        })
            .catch(err => {
                dispatch(fetchTotalBookingsFailed(err.message))
            })
    }
}

export const fetchCalendarBookingsStart = () => {
    return {
        type: actionTypes.FETCH_CALENDAR_BOOKINGS_START,
    }
}
export const fetchCalendarBookingsSuccess = (bookingsData) => {
    return {
        type: actionTypes.FETCH_CALENDAR_BOOKINGS_SUCCESS,
        bookings: bookingsData
    }
}
export const fetchCalendarBookingsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_CALENDAR_BOOKINGS_FAILED,
        error: errorMessage,
    }
}
export const fetchCalendarBookings = (language, from, to) => {
    return dispatch => {
        dispatch(fetchCalendarBookingsStart())
        axios.get(`/vendors/bookings?from=${from}&to=${to}&include[]=user`, {
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
                dispatch(fetchCalendarBookingsSuccess({ ...response.data, data: editedData }));
            })
            .catch(err => {
                dispatch(fetchCalendarBookingsFailed(err.message))
            })
    }
}

export const deleteCalendarBookingStart = () => {
    return {
        type: actionTypes.DELETE_CALENDAR_BOOKING_START,
    }
}

export const deleteCalendarBookingSuccess = (message, deletedCalendarBookingId) => {
    return {
        type: actionTypes.DELETE_CALENDAR_BOOKING_SUCCESS,
        message: message,
        bookingId: deletedCalendarBookingId,
    }
}

export const deleteCalendarBookingFailed = (message) => {
    return {
        type: actionTypes.DELETE_CALENDAR_BOOKING_FAILED,
        message: message,
    }
}

export const deleteCalendarBooking = (id) => {
    return dispatch => {
        dispatch(deleteCalendarBookingStart())
        axios.delete(`/vendors/bookings/${id}`)
            .then(response => {
                dispatch(deleteCalendarBookingSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteCalendarBookingFailed(err.message))
            })
    }
}


