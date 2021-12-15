import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { connect } from 'react-redux'
import { fetchBookings, deleteBooking } from "../../../../store/actions/index";
import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import ThemeContext from '../../../../store/theme-context';
import styled from 'styled-components';
import v1 from '../../../../utils/axios-instance-v1';
import { useTranslation } from "react-i18next";
import ViewModal from './ViewModal/ViewModal';

const BookingCustomer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    cursor: pointer;
    p {
        font-size: 10px;
        font-weight: 500;
        padding: 0 10px;
        color: ${ props => props.theme.palette.common.white };
    }
    span {
        font-size: 10px;
        font-weight: 500;
        padding: 0 10px;
        color: ${ props => props.theme.palette.common.white };
    }
`

function renderEventContent(eventInfo) {
    return (
        <BookingCustomer>
            <p>{eventInfo.event.title}</p>
            <span>{eventInfo.event.extendedProps.time}</span>
        </BookingCustomer>
    )
}


const BookingCalendar = props => {

    const { fetchedBookings, fetchBookingsHandler, deleteBookingHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    const {t} = useTranslation()

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const [userData, setUserData] = useState(null);

    useEffect( ( ) => {
        fetchBookingsHandler(lang, 'all');
        v1.get('/auth/me')
            .then(res => {
                setUserData(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            })
    } , [fetchBookingsHandler, lang])

    const formattedBookingsData = fetchedBookings.data.map(booking => {
        const formattedTime = booking.date_time.split('T')
        let date = formattedTime[0];
        let time = booking.time;
        return {
            bookingId: booking.id,
            title: booking.user.name,
            date: date,
            time: time,
        }
    })

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
        setSelectedBookingId(null);
        /* setEditModalOpened(true);
        editModalOpenHandler(id); */
    }, [])

    const dateClickHandler = (info) => {
        viewModalOpenHandler(info.event.extendedProps.bookingId);
    }

    return (
        <Fragment>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={formattedBookingsData}
                eventContent={renderEventContent}
                eventClick={dateClickHandler}
            />
            {
                viewModalOpened && (
                    <ViewModal show={viewModalOpened} id={selectedBookingId} fetchedBookings={fetchedBookings}
                        onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedBookingId)}
                        heading='view booking details' confirmText='save'  onDelete={viewModalDeleteHandler} userData={userData} />
                )
            }
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        fetchedBookings: state.bookings.bookings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookingsHandler: (language, perPage) => dispatch(fetchBookings(language, perPage)),
        deleteBookingHandler: (id) => dispatch(deleteBooking(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingCalendar);