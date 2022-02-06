import { Grid } from "@mui/material";
import { useState, useContext, useEffect, useCallback, Fragment } from "react";
import { connect } from "react-redux";
import BookingView from "../../../../components/UI/Dashboard/BookingView/BookingView";
import { fetchBookings, deleteBooking, updateBooking, filterBookings } from "../../../../store/actions/index";
import ThemeContext from "../../../../store/theme-context";
import ViewModal from "./ViewModal/ViewModal";
import EditModal from "./EditModal/EditModal";
import SearchFilters from "./SearchFilters/SearchFilters";
import SearchMessage from "../../../../components/Search/SearchMessage/SearchMessage";
import { useTranslation } from "react-i18next";
import v1 from '../../../../utils/axios-instance-v1'
import TablePaginationActions from '../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';

const rowsPerPage = 15;

function Bookings(props) {

    const {t} = useTranslation()

    const { fetchedBookings, fetchBookingsHandler, fetchingBookings, deleteBookingHandler, updateBookingHandler, filteringBookings, filteringBookingsSuccess, updatingBookingSuccess, filterBookingsHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [page, setPage] = useState(0);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (fetchedBookings.data.length === 0) {
            fetchBookingsHandler(lang, page, rowsPerPage);
        }
        if (!userData) {
            v1.get('/auth/me')
                .then(res => {
                    setUserData(res.data)
                }
                )
                .catch(err => {
                    //console.log(err)
                })
        }
    }, [fetchBookingsHandler, fetchedBookings.data.length, lang, page, userData]);

    useEffect(() => {
        updatingBookingSuccess && fetchBookingsHandler(lang, page, rowsPerPage);
    }, [updatingBookingSuccess, fetchBookingsHandler, lang, page]);

    const filterBookingHandler = useCallback((filters) => {
        filterBookingsHandler({...filters, page: 1, per_page: rowsPerPage});
        setPage(0);
    }, [filterBookingsHandler])

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
        fetchBookingsHandler(lang, newPage, rowsPerPage);
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
        //console.log(data)
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

    let content ;

    if (fetchingBookings || filteringBookings) {
        content = (
            <Fragment>
                <Grid item xs={12} md={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <BookingView loading={fetchingBookings} />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <BookingView loading={fetchingBookings}  />
                </Grid>
                <Grid item xs={12} md={6}  >
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
    } else {
        content = fetchedBookings.data.map((booking, index) => {
            return (
                <Grid item xs={12} md={6} key={booking.id} >
                    <BookingView booking={booking} loading={fetchingBookings} onClick={viewModalOpenHandler.bind(null, booking.id)} />
                </Grid>
            )
        })
    }

    return (
        <Grid container spacing={2}>
            <SearchFilters page={page} perPage={rowsPerPage} filterBookings={filterBookingHandler} />
            {content}
            <Grid item xs={12}>
                { fetchedBookings.data.length !== 0 && (
                    <TablePaginationActions
                        sx= {{ width: '100%'}}
                        component="div"
                        count={fetchedBookings.data.length}
                        total={fetchedBookings.meta ? fetchedBookings.meta.total : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={fetchingBookings}
                    />
                )}
            </Grid>
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
        filteringBookings: state.bookings.filteringBookings,
        filteringBookingsSuccess: state.bookings.filteringBookingsSuccess,
        updatingBookingSuccess: state.bookings.updatingBookingSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookingsHandler: (language, page, perPage) => dispatch(fetchBookings(language, page, perPage)),
        filterBookingsHandler: (params) => dispatch(filterBookings(params)),
        deleteBookingHandler: (id) => dispatch(deleteBooking(id)),
        updateBookingHandler: (data) => dispatch(updateBooking(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
