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
    updatingBookingFailed: false,
    updatingBookingMessage: null,
    creatingBooking: false,
    bookingCreated: false,
    creatingBookingFailed: false,
    creatingBookingMessage: null,
    filteringBookings: false,
    filteringBookingsSuccess: false,
    filteringBookingsmessage: null,
    calendarBookings : {
        bookings: { data: [] },
        fetchingBookings: false,
        errorFetchingBookings: false,
        deletingBooking: false,
        deletingBookingSuccess: false,
        deletingBookingMessage: null,
    }
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
            //console.log(state.bookings)
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
                updatingBookingFailed: false,
                updatingBookingMessage: null,
            })
        case (actionTypes.UPDATE_BOOKING_SUCCESS):
            const editedBookingIndex = state.bookings.data.findIndex(booking => booking.id === action.bookingData.id);
            let editedBooking = { ...state.bookings.data[editedBookingIndex] }
            const updatedEditedBooking = updateObject(editedBooking, {
                ...action.bookingData,
            })
            const editedBookings = [...state.bookings.data]
            editedBookings[editedBookingIndex] = updatedEditedBooking
            return updateObject(state, {
                bookings: {
                    ...state.bookings,
                    data: editedBookings,
                },
                updatingBooking: false,
                updatingBookingSuccess: true,
            })
        case (actionTypes.RESET_UPDATE_BOOKING_SUCCESS):
            return updateObject(state, {
                updatingBookingSuccess: false,
            })
        case (actionTypes.UPDATE_BOOKING_FAILED):
            return updateObject(state, {
                updatingBooking: false,
                updatingBookingFailed: true,
                updatingBookingMessage: action.message,
            })
        case (actionTypes.CREATE_BOOKING_START):
            return updateObject(state, {
                creatingBooking: true,
                bookingCreated: false,
                creatingBookingFailed: false,
                creatingBookingMessage: null,
            })
        case (actionTypes.CREATE_BOOKING_SUCCESS):
            return updateObject(state, {
                creatingBooking: false,
                bookingCreated: true,
            })
        case (actionTypes.RESET_CREATE_BOOKING_SUCCESS):
            return updateObject(state, {
                creatingBooking: false,
                bookingCreated: false,
            })
            case (actionTypes.CREATE_BOOKING_FAILED):
                return updateObject(state, {
                    creatingBooking: false,
                    creatingBookingFailed: true,
                    creatingBookingMessage: action.message,
            })
        case (actionTypes.FILTER_BOOKINGS_START):
            return updateObject(state, {
                filteringBookings: true,
                filteringBookingsSuccess: false,
                filteringBookingsmessage: null,
            })
        case (actionTypes.FILTER_BOOKINGS_SUCCESS):
            return updateObject(state, {
                filteringBookings: false,
                filteringBookingsSuccess: true,
                filteringBookingsmessage: action.message,
                bookings: action.bookings,
            })
        case (actionTypes.FILTER_BOOKINGS_FAILED):
            return updateObject(state, {
                filteringBookings: false,
                filteringBookingsSuccess: false,
                filteringBookingsmessage: action.error,
            })
        case (actionTypes.FETCH_CALENDAR_BOOKINGS_START):
            return updateObject(state, {
                calendarBookings : {
                    ...state.calendarBookings,
                    fetchingBookings: true,
                    errorFetchingBookings: false,
                }
            })
        case (actionTypes.FETCH_CALENDAR_BOOKINGS_SUCCESS):
            return updateObject(state, {
                calendarBookings: {
                    ...state.calendarBookings,
                    fetchingBookings: false,
                    bookings: action.bookings,
                }
            })
        case (actionTypes.FETCH_CALENDAR_BOOKINGS_FAILED):
            return updateObject(state, {
                calendarBookings: {
                    ...state.calendarBookings,
                    fetchingBookings: false,
                    errorFetchingBookings: action.error,
                }
            })
        case (actionTypes.DELETE_CALENDAR_BOOKING_START):
            return updateObject(state, {
                calendarBookings: {
                    ...state.calendarBookings,
                    deletingBooking: true,
                    deletingBookingSuccess: false,
                    deletingBookingMessage: null,
                }
            })
        case (actionTypes.DELETE_CALENDAR_BOOKING_SUCCESS):
            const updatedCalendarBookings = state.calendarBookings.bookings.data.filter(booking => booking.id !== action.bookingId);
            return updateObject(state, {
                calendarBookings: {
                    ...state.calendarBookings,
                    bookings: {
                        ...state.bookings,
                        data: updatedCalendarBookings,
                    },
                    deletingBooking: false,
                    deletingBookingSuccess: true,
                    deletingBookingMessage: action.message,
                }
            })
        case (actionTypes.DELETE_CALENDAR_BOOKING_FAILED):
            return updateObject(state, {
                calendarBookings: {
                    ...state.calendarBookings,
                    deletingBooking: false,
                    deletingBookingSuccess: false,
                    deletingBookingMessage: action.message,
                }
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