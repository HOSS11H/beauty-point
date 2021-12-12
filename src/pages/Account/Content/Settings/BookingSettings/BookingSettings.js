import { useEffect, useState, Fragment, useCallback } from "react";
import v1 from '../../../../../utils/axios-instance-v1'
import { useTranslation } from 'react-i18next';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, Button, Backdrop, CircularProgress, Snackbar, Alert } from "@mui/material";
import EditModal from "./EditModal/EditModal";
export default function BookingSettings(props) {
    const { t } = useTranslation();
    const [bookingTimes, setBookingTimes] = useState([]);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)
    const [ editModalOpened, setEditModalOpened ] = useState(false);
    const [ selectedBookingTimeId , setSelectedBookingTimeId ] = useState(null);
    useEffect(() => {
        v1.get('/vendors/settings/booking_times')
            .then(res => {
                setBookingTimes(res.data)
            })
    }, []);
    function allowBookingChanged(id) {
        setOpen(true)
        let times = [...bookingTimes];
        let idx = times.findIndex(t => t.id === id)
        let time = { ...times[idx] }
        v1.put('/vendors/settings/booking_times/' + id, {
            start_time: time.start_time,
            end_time: time.end_time,
            multiple_booking: time.multiple_booking,
            max_booking: time.max_booking,
            per_day_max_booking: time.per_day_max_booking,
            per_slot_max_booking: time.per_slot_max_booking,
            status: time.status === 'enabled' ? 'disabled' : 'enabled',
            slot_duration: time.slot_duration
        }).then(res => {
            time.status = time.status === 'enabled' ? 'disabled' : 'enabled'
            times[idx] = time;
            setBookingTimes(times)
            setOpen(false)
            setSuccess(true)
        })

    }
    function handleClose() {
        setSuccess(false)
    }

    const editModalOpenHandler =(id) => {
        setEditModalOpened(true)
        setSelectedBookingTimeId(id)
    }
    const editModalCloseHandler =(id) => {
        setEditModalOpened(false)
        setSelectedBookingTimeId(null)
    }
    const editModalConfirmHandler =(id) => {
        setEditModalOpened(false)
        setSelectedBookingTimeId(null)
    }
    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{ t('SN') }</TableCell>
                            <TableCell align="right">{t('Day')}</TableCell>
                            <TableCell align="right">{t('Open Time')}</TableCell>
                            <TableCell align="right">{t('Close Time')}</TableCell>
                            <TableCell align="right">{t('Allow Booking')}</TableCell>
                            <TableCell align="right">{t('Action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingTimes.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.day}</TableCell>
                                <TableCell align="right">{row.start_time}</TableCell>
                                <TableCell align="right">{row.end_time}</TableCell>
                                <TableCell align="right"><Switch
                                    checked={ row.status === 'enabled' }
                                    onChange={(e) => allowBookingChanged(row.id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                /></TableCell>
                                <TableCell align="right"><Button onClick={(e) => editModalOpenHandler(row.id) }>{ t('Edit') }</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedBookingTimeId} bookingTimes={bookingTimes}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit booking times' confirmText='edit' />
                    )
                }
            </TableContainer>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={success}
                onClose={handleClose}
                key={'bottom-right'}
            >
                <Alert onClose={handleClose} severity="success" fullWidth>{t('Saved Successfuly')}</Alert>
            </Snackbar>
        </Fragment>
    )
}


