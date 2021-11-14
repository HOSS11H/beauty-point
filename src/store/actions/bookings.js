import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';
import { formatCurrency } from '../../shared/utility';


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
export const fetchBookings = ( language, token  ) => {
    return dispatch => {
        console.log(language, token)
        dispatch( fetchBookingsStart( ) )
        axios.get('/vendors/bookings', { 
            headers: {
                'Accept-Language': language,
                'Authorization': `Bearer ${token}`,
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
export const fetchTotalBookings = ( language, token ) => {
    return dispatch => {
        dispatch( fetchTotalBookingsStart( ) )
        axios.get('/vendor/company-status', { 
            headers: {
                'Accept-Language': language,
                'Authorization': `Bearer ${token}`,
            }
        }).then( response => {
                dispatch( fetchTotalBookingsSuccess( response.data.bookings_count ) );
            })
            .catch( err => {
                dispatch( fetchTotalBookingsFailed( err.message  ) )
            } )
        }
}


