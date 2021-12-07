import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { connect } from 'react-redux'
import { fetchBookings } from "../../../../store/actions/index";
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../../../store/theme-context';
import styled from 'styled-components';

const BookingCustomer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
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
    console.log(eventInfo)
    return (
        <BookingCustomer>
            <p>{eventInfo.event.title}</p>
            <span>{eventInfo.event.extendedProps.time}</span>
        </BookingCustomer>
    )
}


const BookingCalendar = props => {

    const { fetchedBookings, fetchBookingsHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    useEffect( ( ) => {
        fetchBookingsHandler(lang, 'all');
    } , [fetchBookingsHandler, lang])

    const [viewModalOpened, setViewModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);

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

    const dateClickHandler = (info) => {
        console.log(info.event)
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={formattedBookingsData}
                eventContent={renderEventContent}
                eventClick={dateClickHandler}
            />
        </div>
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingCalendar);