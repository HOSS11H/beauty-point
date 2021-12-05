import { Grid } from "@mui/material";
import { useState, useContext, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import BookingView from "../../../../components/UI/Dashboard/BookingView/BookingView";
import { fetchBookings } from "../../../../store/actions/index";
import ThemeContext from "../../../../store/theme-context";
import ViewModal from "./ViewModal/ViewModal";


function Services(props) {

    const { fetchedBookings, fetchBookingsHandler, fetchingBookings } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedBookingId, setSelectedBookingId] = useState(null);


    useEffect(() => {
        fetchBookingsHandler(lang, 'all');
    }, [fetchBookingsHandler, lang]);


    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setViewModalOpened(true);
        setSelectedBookingId(id);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedBookingId(null);
    }, [])

    const viewModalConfirmHandler = useCallback((id) => {
        setViewModalOpened(false);
        setEditModalOpened(true);
    }, [])

    let content = fetchedBookings.data.map((booking, index) => {
        return (
            <Grid item xs={12} sm={6} key={booking.id} >
                <BookingView booking={booking} loading={fetchingBookings} onClick={viewModalOpenHandler.bind(null, booking.id)} />
            </Grid>
        )
    })

    return (
        <Grid container spacing={2}>
            {content}
            <ViewModal show={viewModalOpened} id={selectedBookingId} fetchedBookings={fetchedBookings}
                onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedBookingId)}
                heading='view booking details' confirmText='edit' />
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
        fetchBookingsHandler: (language, perPage) => dispatch(fetchBookings(language, perPage))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Services);