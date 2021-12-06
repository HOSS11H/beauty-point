import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    bookings: { data: [] },
    totalBookings: [],
    fetchingBookings: false,
    errorFetchingBookings: false,
    fetchingTotalBookings: false,
    errorFetchingTotalBookings: false,
    deletingBooking: false,
    deletingBookingSuccess: false,
    deletingBookingMessage: null,
    updatingBooking: false,
    updatingBookingSuccess: false,
    updatingBookingMessage: null,
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_BOOKINGS_START):
            return updateObject(state, {
                fetchingBookings: true,
                errorFetchingBookings: false,
            })
        case (actionTypes.FETCH_BOOKINGS_SUCCESS):
            return updateObject(state, {
                fetchingBookings: false,
                bookings: action.bookings,
            })
        case (actionTypes.FETCH_BOOKINGS_FAILED):
            return updateObject(state, {
                fetchingBookings: false,
                errorFetchingBookings: action.error,
            })
        case (actionTypes.DELETE_BOOKING_START):
            return updateObject(state, {
                deletingBooking: true,
                deletingBookingSuccess: false,
                deletingBookingMessage: null,
            })
        case (actionTypes.DELETE_BOOKING_SUCCESS):
            const updatedBookings = state.bookings.data.filter(booking => booking.id !== action.bookingId);
            console.log(state.bookings)
            return updateObject(state, {
                bookings: {
                    ...state.bookings,
                    data: updatedBookings,
                },
                deletingBooking: false,
                deletingBookingSuccess: true,
                deletingBookingMessage: action.message,
            })
        case (actionTypes.DELETE_BOOKING_FAILED):
            return updateObject(state, {
                deletingBooking: false,
                deletingBookingSuccess: false,
                deletingBookingMessage: action.message,
            })
        case (actionTypes.UPDATE_BOOKING_START):
            return updateObject(state, {
                updatingBooking: true,
                updatingBookingSuccess: false,
                updatingBookingMessage: null,
            })
        case (actionTypes.UPDATE_BOOKING_SUCCESS):
            const editedBookingIndex = state.bookings.data.findIndex(booking => booking.id === action.bookingData.id);
            let editedBooking = { ...state.bookings.data[editedBookingIndex] }
            const updatedEditedBooking = updateObject(editedBooking, {
                ...action.bookingData,
            })
            console.log(updatedEditedBooking);
            const editedBookings = [...state.bookings.data]
            editedBookings[editedBookingIndex] = updatedEditedBooking
            return updateObject(state, {
                bookings: {
                    ...state.bookings,
                    data: editedBookings,
                },
                updatingBooking: false,
                updatingBookingSuccess: true,
                updatingBookingMessage: action.message,
            })
        case (actionTypes.UPDATE_BOOKING_FAILED):
            return updateObject(state, {
                updatingBooking: false,
                updatingBookingSuccess: false,
                updatingBookingMessage: action.message,
            })
        case (actionTypes.FETCH_TOTAL_BOOKINGS_START):
            return updateObject(state, {
                fetchingTotalBookings: true,
                errorFetchingTotalBookings: false,
            })
        case (actionTypes.FETCH_TOTAL_BOOKINGS_SUCCESS):
            return updateObject(state, {
                fetchingTotalBookings: false,
                totalBookings: action.totalBookings,
            })
        case (actionTypes.FETCH_TOTAL_BOOKINGS_FAILED):
            return updateObject(state, {
                fetchingTotalBookings: false,
                errorFetchingTotalBookings: action.error,
            })
        default:
            return state
    }
};
export default reducer;