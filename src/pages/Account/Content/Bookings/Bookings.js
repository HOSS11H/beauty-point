import { Grid } from "@mui/material";
import { useState, useContext, useEffect, useCallback, Fragment } from "react";
import { connect } from "react-redux";
import BookingView from "../../../../components/UI/Dashboard/BookingView/BookingView";
import { fetchBookings, deleteBooking, updateBooking } from "../../../../store/actions/index";
import ThemeContext from "../../../../store/theme-context";
import AuthContext from "../../../../store/auth-context";
import ViewModal from "./ViewModal/ViewModal";
import EditModal from "./EditModal/EditModal";
import SearchFilters from "./SearchFilters/SearchFilters";
import SearchMessage from "../../../../components/Search/SearchMessage/SearchMessage";
import { useTranslation } from "react-i18next";
import v1 from '../../../../utils/axios-instance-v1'


function Bookings(props) {

    const {t} = useTranslation()

    const { fetchedBookings, fetchBookingsHandler, fetchingBookings, deleteBookingHandler, updateBookingHandler, filteringBookingsSuccess } = props;

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const [selectedBookingId, setSelectedBookingId] = useState(null);
    
    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);


    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchBookingsHandler(lang, 'all');
        v1.get('/auth/me')
            .then(res => {
                setUserData(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            })
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
        console.log(data)
        updateBookingHandler(data);
    }, [updateBookingHandler])

    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setSelectedBookingId(id);
        setViewModalOpened(true);
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
        setSelectedBookingId(null);
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
                <Grid item xs={12} sm={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
                <Grid item xs={12} sm={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
            </Fragment>
        )
    } else if (fetchedBookings.data.length === 0 && filteringBookingsSuccess) {
        content = (
            <SearchMessage>
                {t('No Bookings Found')}
            </SearchMessage>
        );
    }

    return (
        <Grid container spacing={2}>
            <SearchFilters />
            {content}
            {
                viewModalOpened && (
                    <ViewModal show={viewModalOpened} id={selectedBookingId} fetchedBookings={fetchedBookings}
                        onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedBookingId)}
                        heading='view booking details' confirmText='edit'  onDelete={viewModalDeleteHandler} userData={userData} />
                )
            }
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
        filteringBookingsSuccess: state.bookings.filteringBookingsSuccess
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