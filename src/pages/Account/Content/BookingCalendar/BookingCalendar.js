// Always on top
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import { Backdrop, CircularProgress } from "@mui/material";
// a plugin!
import Card from '@mui/material/Card';
import { format } from 'date-fns';
import moment from 'moment';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
// needed for dayClick
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteCalendarBooking, fetchCalendarBookings } from "../../../../store/actions/index";
import AuthContext from '../../../../store/auth-context';
import ThemeContext from '../../../../store/theme-context';
import v1 from '../../../../utils/axios-instance-v1';
import ViewModal from '../Bookings/ViewModal/ViewModal';



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
        color: ${props => props.theme.palette.common.white};
    }
    span {
        font-size: 10px;
        font-weight: 500;
        padding: 0 10px;
        color: ${props => props.theme.palette.common.white};
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
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx;
    const { roleName } = authCtx;

    const notIntialRender = useRef(false);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [userData, setUserData] = useState(null);

    const calendarRef = useRef()

    useEffect(() => {
        if (calendarRef.current) {
            fetchBookingsHandler(lang, fromDate, toDate);
        }
    }, [fetchBookingsHandler, fromDate, lang, toDate])

    useEffect(() => {
        if (notIntialRender.current) {
            return;
        } else {
            v1.get('/auth/me')
                .then(res => {
                    setUserData(res.data)
                }
                )
                .catch(err => {
                    //console.log(err)
                })
            notIntialRender.current = true;
        }
    })

    const formattedBookingsData = fetchedBookings.data.map(booking => {
        const formattedTime = booking.date_time.split('T')
        let date = formattedTime[0];
        let time = moment.utc(booking.date_time).format('hh:mm A');
        return {
            bookingId: booking.id,
            title: (roleName === 'artist' && booking.source === 'pos') ? booking.company.companyName : booking.user.name,
            date: date,
            time: time,
            status: booking.status,
        }
    })


    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        //console.log(userData)
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
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={formattedBookingsData}
            eventContent={renderEventContent}
            eventClick={dateClickHandler}
            datesSet={(dateInfo) => {
                setFromDate(format(dateInfo.start, 'yyyy-MM-dd'));
                setToDate(format(dateInfo.end, 'yyyy-MM-dd'));
            }}
        />
    )

    return (
        <BookingCalendarWrapper>
            {content}
            {
                viewModalOpened && userData && (
                    <ViewModal show={viewModalOpened} id={selectedBookingId} fetchedBookings={fetchedBookings}
                        onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedBookingId)}
                        heading='view booking details' confirmText='save' onDelete={viewModalDeleteHandler} userData={userData} />
                )
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={fetchingBookings}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
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