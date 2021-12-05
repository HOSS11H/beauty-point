import { Grid } from "@mui/material";
import { Fragment, useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import BookingView from "../../../../components/UI/Dashboard/BookingView/BookingView";
import { fetchBookings } from "../../../../store/actions/index";
import ThemeContext from "../../../../store/theme-context";


function Services(props) {

    const { fetchedBookings, fetchBookingsHandler, fetchingBookings } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx


    useEffect(() => {
        fetchBookingsHandler(lang, 'all' );
    }, [fetchBookingsHandler, lang]);

    let content = [];
    if (fetchedBookings.data.length > 0) {
        console.log(fetchedBookings)
        content = fetchedBookings.data.map( (booking, index) => {
            return (
                <Grid item xs={12} sm={6} key={booking.id} >
                    <BookingView  booking={booking} />
                </Grid>
            )
        })
    }

    return (
        <Grid container spacing={2}>
            {content}
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