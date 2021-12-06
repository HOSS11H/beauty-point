import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';
import v1 from '../../utils/axios-instance-v1'


export const fetchBookingsStart = (  ) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_START,
    }
}
export const fetchBookingsSuccess = ( bookingsData ) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_SUCCESS,
        bookings: bookingsData
    }
}
export const fetchBookingsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_FAILED,
        error: errorMessage,
    }
}
export const fetchBookings = ( language, perPage  ) => {
    return dispatch => {
        dispatch( fetchBookingsStart( ) )
        axios.get(`/vendors/bookings?per_page=${perPage}&include[]=user&include[]=users&include[]=items&include[]=payment`, {
            headers: {
                'Accept-Language': language,
            }
        })
            .then( response => {
                    let editedData = response.data.data.map( item => {
                        const formattedTime = new Date( item.date_time ).toLocaleString()
                        const arr = formattedTime.replace(/:.. /," ").split(", ");
                        let date = arr[0]
                        let time = arr[1]
                        return {
                            ...item,
                            date: date,
                            time: time,
                        }
                    })
                    dispatch( fetchBookingsSuccess( { ...response.data , data: editedData } ) );
                })
                .catch( err => {
                    dispatch( fetchBookingsFailed( err.message  ) )
                } )
            }
}

export const deleteBookingStart = (  ) => {
    return {
        type: actionTypes.DELETE_BOOKING_START,
    }
}
export const deleteBookingSuccess = ( message, deletedBookingId ) => {
    return {
        type: actionTypes.DELETE_BOOKING_SUCCESS,
        message: message,
        bookingId: deletedBookingId,
    }
}
export const deleteBookingFailed = ( message ) => {
    return {
        type: actionTypes.DELETE_BOOKING_FAILED,
        message: message,
    }
}

export const deleteBooking = (id ) => {
    return dispatch => {
        dispatch( deleteBookingStart( ) )
        axios.delete(`/vendors/bookings/${id}`)
            .then( response => {
                dispatch( deleteBookingSuccess( response.data , id  ) );
            })
            .catch( err => {
                dispatch( deleteBookingFailed( err.message  ) )
            } )
        }
}

export const updateBookingStart = (  ) => {
    return {
        type: actionTypes.UPDATE_BOOKING_START,
    }
}
export const updateBookingSuccess = ( message, updatedBookingData ) => {
    return {
        type: actionTypes.UPDATE_BOOKING_SUCCESS,
        message: message,
        bookingData: updatedBookingData,
    }
}
export const updateBookingFailed = ( message ) => {
    return {
        type: actionTypes.UPDATE_BOOKING_FAILED,
        message: message,
    }
}

export const updateBooking = ( data ) => {
    return dispatch => {
        dispatch( updateBookingStart( ) )
        axios.put(`/vendors/bookings/${data.id}`, data)
            .then( response => {
                dispatch( updateBookingSuccess( response.data, data ) );
            })
            .catch( err => {
                dispatch( updateBookingFailed( err.message  ) )
            } )
        }
}

export const fetchTotalBookingsStart = (  ) => {
    return {
        type: actionTypes.FETCH_TOTAL_BOOKINGS_START,
    }
}
export const fetchTotalBookingsSuccess = ( bookingsData ) => {
    return {
        type: actionTypes.FETCH_TOTAL_BOOKINGS_SUCCESS,
        totalBookings: bookingsData
    }
}
export const fetchTotalBookingsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_TOTAL_BOOKINGS_FAILED,
        error: errorMessage,
    }
}
export const fetchTotalBookings = ( language ) => {
    return dispatch => {
        dispatch( fetchTotalBookingsStart( ) )
        v1.get('/vendor/company-status', {
            headers: {
                'Accept-Language': language,
            }
        }).then( response => {
                dispatch( fetchTotalBookingsSuccess( response.data.bookings_count ) );
            })
            .catch( err => {
                dispatch( fetchTotalBookingsFailed( err.message  ) )
            } )
        }
}


