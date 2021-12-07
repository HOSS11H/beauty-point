import { Grid } from "@mui/material";
import { useState, useContext, useEffect, useCallback, Fragment } from "react";
import { connect } from "react-redux";
import BookingView from "../../../../components/UI/Dashboard/BookingView/BookingView";
import { fetchBookings, deleteBooking, updateBooking } from "../../../../store/actions/index";
import ThemeContext from "../../../../store/theme-context";
import ViewModal from "./ViewModal/ViewModal";
import EditModal from "./EditModal/EditModal";


function Bookings(props) {

    const { fetchedBookings, fetchBookingsHandler, fetchingBookings, deleteBookingHandler, updateBookingHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedBookingId, setSelectedBookingId] = useState(null);


    useEffect(() => {
        fetchBookingsHandler(lang, 'all');
    }, [fetchBookingsHandler, lang]);

    
    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedBookingId(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedBookingId(null);
    }, [])
    const editModalDeleteHandler = useCallback((id) => {
        setEditModalOpened(false);
        setSelectedBookingId(null);
        deleteBookingHandler(id);
    }, [deleteBookingHandler])

    const editModalConfirmHandler = useCallback((data) => {
        setEditModalOpened(false);
        setSelectedBookingId(null);
        updateBookingHandler(data);
    }, [updateBookingHandler])

    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setViewModalOpened(true);
        setSelectedBookingId(id);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedBookingId(null);
    }, [])
    const viewModalDeleteHandler = useCallback((id) => {
        setViewModalOpened(false);
        setSelectedBookingId(null);
        deleteBookingHandler(id);
    }, [deleteBookingHandler])

    const viewModalConfirmHandler = useCallback((id) => {
        setViewModalOpened(false);
        setEditModalOpened(true);
        editModalOpenHandler(id);
    }, [editModalOpenHandler])

    let content = fetchedBookings.data.map((booking, index) => {
        return (
            <Grid item xs={12} sm={6} key={booking.id} >
                <BookingView booking={booking} loading={fetchingBookings} onClick={viewModalOpenHandler.bind(null, booking.id)} />
            </Grid>
        )
    })
    if (fetchingBookings) {
        content = (
            <Fragment>
                <Grid item xs={12} sm={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
                <Grid item xs={12} sm={6}  >
                    <BookingView loading={fetchingBookings} />
                </Grid>
                <Grid item xs={12} sm={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
                <Grid item xs={12} sm={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
            </Fragment>
        )
    }

    return (
        <Grid container spacing={2}>
            {content}
            <ViewModal show={viewModalOpened} id={selectedBookingId} fetchedBookings={fetchedBookings}
                onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedBookingId)}
                heading='view booking details' confirmText='edit'  onDelete={viewModalDeleteHandler} />
            {
                editModalOpened && (
                    <EditModal show={editModalOpened} id={selectedBookingId} fetchedBookings={fetchedBookings}
                        onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                        heading='edit booking details' confirmText='confirm edit' onDelete={editModalDeleteHandler} />
                )
            }
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        fetchedBookings: state.bookings.bookings,
        fetchingBookings: state.bookings.fetchingBookings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookingsHandler: (language, perPage) => dispatch(fetchBookings(language, perPage)),
        deleteBookingHandler: (id) => dispatch(deleteBooking(id)),
        updateBookingHandler: (data) => dispatch(updateBooking(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bookings);