import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBookings } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import { useTranslation } from 'react-i18next';
import CustomCard from '../../../../../components/UI/Card/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';


const Booking = styled.div`
    display: flex;
    align-items: center;
`
const ClientImg = styled(Avatar)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 20px;
    cursor: pointer;
`
const BookingContent = styled.div`
    flex-grow: 1;
`
const ClientName = styled.a`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    cursor: pointer;
`
const ClientInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 20px;
            height: 20px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`
const BookingItems = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 14px;
            height: 14px;
            color: ${({ theme }) => theme.vars.primary};
        }
        .divider {
            margin: 0 5px;
        }
    }
`
const BookingAppointment = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 20px;
            height: 20px;
        }
    }
`

const BookingStatus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    padding: 0 15px;
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    &.in.progress {
        background-color: ${({ theme }) => theme.palette.warning.light};
    }
    &.pending {
        background-color: ${({ theme }) => theme.palette.secondary.dark};
    }
    &.canceled {
        background-color: ${({ theme }) => theme.palette.error.main};
    }
    &.approved {
        background-color: ${({ theme }) => theme.palette.primary.main};
    }
    &.completed {
        background-color: ${({ theme }) => theme.palette.success.main};
    }
`


const perPage = 10;
const page = 0;

const RecentBookings = props => {

    const {t} = useTranslation()

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const { fetchedBookings, fetchBookingsHandler, loadingBookings } = props;

    useEffect(() => {
        fetchBookingsHandler(lang, page, perPage);
    }, [fetchBookingsHandler, lang]);

    let loadedBookings = []

    if (fetchedBookings.data.length > 0) {

        loadedBookings = fetchedBookings.data.map( (booking, index) => {
            return (
                <TableRow
                    key={booking.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        <Booking>
                            <ClientImg >
                                <PersonIcon />
                            </ClientImg>
                            <BookingContent>
                                <ClientName>{booking.user.name}</ClientName>
                                <ClientInfo>
                                    {booking.user.email && <li><MailIcon sx={{ mr: 1 }} />{booking.user.email}</li>}
                                    {booking.user.mobile &&<li><PhoneAndroidIcon sx={{ mr: 1 }} />{booking.user.mobile}</li>}
                                </ClientInfo>
                            </BookingContent>
                        </Booking>
                    </TableCell>
                    <TableCell align="right">
                        <BookingItems>
                            {
                                booking.items.map( ( item , index) => {
                                    let loadedItems ;
                                    if ( item ) {
                                        loadedItems =  (
                                            <li key={item.id} >
                                                <FiberManualRecordIcon sx={{ mr: 1 }} />
                                                <span>{item.quantity}</span>
                                                <span className='divider'>x</span>
                                                <span>{item.item.name}</span>
                                            </li>
                                        )
                                    }
                                    return loadedItems
                                })
                            }
                        </BookingItems>
                    </TableCell>
                    <TableCell align="right">
                        <BookingAppointment>
                            <li><EventNoteIcon sx={{ mr: 1 }} />{booking.date}</li>
                            <li><WatchLaterIcon sx={{ mr: 1 }} />{booking.time}</li>
                        </BookingAppointment>
                    </TableCell>
                    <TableCell align="right">
                        <BookingStatus className={booking.status}>
                            {t(booking.status)}
                        </BookingStatus>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <CustomCard heading={`recent booking`} loading={loadingBookings && (fetchedBookings.data.length === 0)}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }} >
                <Table sx={{ minWidth: 650, overflowX: 'auto' }} aria-label="simple table">
                    <TableBody>
                        {loadedBookings}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomCard>
    )
}

const mapStateToProps = state => {
    return {
        fetchedBookings: state.bookings.bookings,
        loadingBookings: state.bookings.fetchingBookings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookingsHandler: (language, page, perPage) => dispatch(fetchBookings(language, page, perPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentBookings);