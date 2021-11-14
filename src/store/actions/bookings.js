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
export const fetchBookings = (  ) => {
    return dispatch => {
        dispatch( fetchBookingsStart( ) )
        axios.get('https://color-shop-c3776-default-rtdb.firebaseio.com/colors.json')
            .then( response => {
                let fetchedProducts = [ ];
                for ( let color in response.data ) {
                    let dollars =  formatCurrency(response.data[color].priceCents / 100) ;
                    let fetchedProduct= { id: color, price: dollars ,  ...response.data[color] }
                    fetchedProducts.push(fetchedProduct);
                }
                    dispatch( fetchBookingsSuccess( fetchedProducts ) );
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
                console.log(response.data.bookings_count);
                dispatch( fetchTotalBookingsSuccess( response.data.bookings_count ) );
            })
            .catch( err => {
                dispatch( fetchTotalBookingsFailed( err.message  ) )
            } )
        }
}


