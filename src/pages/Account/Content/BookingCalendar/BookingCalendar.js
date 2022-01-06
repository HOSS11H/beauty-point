import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { connect } from 'react-redux'
import { fetchCalendarBookings, deleteCalendarBooking } from "../../../../store/actions/index";
import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import ThemeContext from '../../../../store/theme-context';
import styled from 'styled-components';
import v1 from '../../../../utils/axios-instance-v1';
import { useTranslation } from "react-i18next";
import ViewModal from '../Bookings/ViewModal/ViewModal';
import { format } from 'date-fns';
import { useRef } from 'react';

const BookingCalendarWrapper = styled.div`
    & .fc-h-event {
        background:transparent;
        border-color:transparent;
        border:0;
    }
`

const BookingCustomer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    cursor: pointer;
    border-radius:3px;
    &.in.progress {
        background-color: ${({ theme }) => theme.palette.warning.dark};
    }
    &.pending {
        background-color: ${({ theme }) => theme.palette.secondary.dark};
    }
    &.canceled {
        background-color: ${({ theme }) => theme.palette.error.dark};
    }
    &.approved {
        background-color: ${({ theme }) => theme.palette.primary.dark};
    }
    &.completed {
        background-color: ${({ theme }) => theme.palette.success.dark};
    }
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

const Loader = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100vh;
    flex-grow: 1;
`

function renderEventContent(eventInfo) {
    return (
        <BookingCustomer className={eventInfo.event.extendedProps.status}>
            <p>{eventInfo.event.title} # {eventInfo.event.extendedProps.bookingId}</p>
            <span>{eventInfo.event.extendedProps.time}</span>
        </BookingCustomer>
    )
}


const BookingCalendar = props => {

    const { fetchedBookings, fetchingBookings, fetchBookingsHandler, deleteBookingHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    const {t} = useTranslation()

    const notIntialRender = useRef(false);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const [ fromDate, setFromDate ] = useState(new Date());
    const [ toDate, setToDate ] = useState(new Date());

    const [userData, setUserData] = useState(null);
    
    
    useEffect( ( ) => {
        fetchBookingsHandler(lang, fromDate , toDate);
    } , [fetchBookingsHandler, fromDate, lang, toDate])

    useEffect( ( ) =>{
        if ( notIntialRender.current ) {
            return;
        } else {
            v1.get('/auth/me')
                .then(res => {
                    setUserData(res.data)
                }
                )
                .catch(err => {
                    console.log(err)
                })
            notIntialRender.current = true;
        }
    })

    const formattedBookingsData = fetchedBookings.data.map(booking => {
        const formattedTime = booking.date_time.split('T')
        let date = formattedTime[0];
        let time = booking.time;
        return {
            bookingId: booking.id,
            title: booking.user.name,
            date: date,
            time: time,
            status: booking.status,
        }
    })


    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        console.log(userData)
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

    let content = (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={formattedBookingsData}
            eventContent={renderEventContent}
            eventClick={dateClickHandler}
            datesSet={(dateInfo) => {
                setFromDate(format(dateInfo.start, 'yyyy-MM-dd'));
                setToDate(format(dateInfo.end, 'yyyy-MM-dd'));
                console.log('excuted')
            }}
        />
    )

    if(fetchingBookings) {
        content = (
            <Loader>
                <CircularProgress color="secondary" />
            </Loader>
        )
    }

    return (
        <BookingCalendarWrapper>
            {content}
            {
                viewModalOpened && userData && (
                    <ViewModal show={viewModalOpened} id={selectedBookingId} fetchedBookings={fetchedBookings}
                        onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedBookingId)}
                        heading='view booking details' confirmText='save'  onDelete={viewModalDeleteHandler} userData={userData} />
                )
            }
        </BookingCalendarWrapper>
    )
}

const mapStateToProps = state => {
    return {
        fetchedBookings: state.bookings.calendarBookings.bookings,
        fetchingBookings: state.bookings.calendarBookings.fetchingBookings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookingsHandler: (language, from, to) => dispatch(fetchCalendarBookings(language, from, to)),
        deleteBookingHandler: (id) => dispatch(deleteCalendarBooking(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingCalendar);