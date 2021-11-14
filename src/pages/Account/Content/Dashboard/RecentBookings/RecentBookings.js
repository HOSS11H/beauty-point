import styled, { css } from 'styled-components';
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Booking= styled.div`
    display: flex;
    align-items: center;
`
const ClientImg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 20px;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const BookingContent= styled.div`
    flex-grow: 1;
`
const ClientName = styled.a`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
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
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`

const BookingStatus= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    padding: 0 15px;
    border-radius: 12px;
    color: ${({theme})=>theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    &.pending {
        background-color: ${ ( { theme } ) => theme.palette.warning.light};
    }
    &.canceled {
        background-color: ${ ( { theme } ) => theme.palette.warning.dark};
    }
    &.approved {
        background-color: ${ ( { theme } ) => theme.palette.primary.main};
    }
`



const RecentBookings = props => {

    return (
        <CustomCard heading={`recent booking`} loading={false}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }} >
                <Table sx={{ minWidth: 650, overflowX: 'auto' }} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Booking>
                                        <ClientImg>
                                            <img  alt="client" />
                                        </ClientImg>
                                        <BookingContent>
                                            <ClientName>{row.name}</ClientName>
                                            <ClientInfo>
                                                <li><MailIcon sx={ { mr: 1 } } />{row.calories}</li>
                                                <li><PhoneAndroidIcon sx={ { mr: 1 } } />{row.calories}</li>
                                            </ClientInfo>
                                        </BookingContent>
                                    </Booking>
                                </TableCell>
                                <TableCell align="right">
                                    <BookingItems>
                                        <li><FiberManualRecordIcon sx={ { mr: 1 } } />{row.calories}</li>
                                        <li><FiberManualRecordIcon sx={ { mr: 1 } } />{row.calories}</li>
                                    </BookingItems>
                                </TableCell>
                                <TableCell align="right">
                                    <BookingAppointment>
                                        <li><EventNoteIcon sx={ { mr: 1 } } />{row.calories}</li>
                                        <li><WatchLaterIcon sx={ { mr: 1 } } />{row.calories}</li>
                                    </BookingAppointment>
                                </TableCell>
                                <TableCell align="right">
                                    <BookingStatus className={`pending`}>
                                        pending
                                    </BookingStatus>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomCard>
    )
}

export default RecentBookings;