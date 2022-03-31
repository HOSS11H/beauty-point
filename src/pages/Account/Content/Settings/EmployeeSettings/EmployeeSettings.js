import { useEffect, useState, Fragment, useCallback } from "react";
import v2 from '../../../../../utils/axios-instance'
import { useTranslation } from 'react-i18next';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, Button, Backdrop, CircularProgress, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import EditModal from "./EditModal/EditModal";
import styled from "styled-components";
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../../../../../components/UI/Loader/Loader";
import TablePaginationActions from "../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import { ActionButton } from "../../../../../components/UI/Dashboard/Actions/Actions";
import ViewModal from "./ViewModal/ViewModal";


const ActionsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 25px;
`

const intialPerPage = 15;

export default function EmployeeSettings(props) {
    const { t } = useTranslation();
    const [employees, setEmployees] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [viewModalOpened, setViewModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);

    useEffect(() => {
        setLoading(true)
        v2.get(`vendors/employees?per_page=${rowsPerPage}&page=${page + 1}`)
            .then(res => {
                setEmployees(res.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [page, rowsPerPage]);

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);
    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }, []);

    const viewModalOpenHandler = useCallback((id) => {
        setViewModalOpened(true);
        setSelectedEmployeeId(id);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedEmployeeId(null);
    }, [])
    const viewModalConfirmHandler = useCallback(() => {
        setViewModalOpened(false);
        setEditModalOpened(true);
    }, [])

    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedEmployeeId(null);
    }, [])
    const editModalConfirmHandler = useCallback(() => {
        setEditModalOpened(false);
    }, [])



    /* function allowBookingChanged(id) {
        setOpen(true)
        let times = [...bookingTimes];
        let idx = times.findIndex(t => t.id === id)
        let time = { ...times[idx] }
        const openTime = new Date(`2021-02-03 ${convertTime12to24(time.start_time)}`)
        const closeTime = new Date(`2021-02-03 ${convertTime12to24(time.end_time)}`)
        v2.put('vendors/employee-schedule' + id, {
            start_time: format(openTime, 'hh:mm a'),
            end_time: format(closeTime, 'hh:mm a'),
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
    const editModalConfirmHandler =(data) => {
        setEditModalOpened(false)
        setSelectedBookingTimeId(null)
        setOpen(true)
        v2.put(`/vendors/settings/booking_times/${data.id}`, {...data})
        .then(res => {
            let times = [...bookingTimes];
            let idx = times.findIndex(t => t.id === data.id)
            let time = { 
                ...times[idx],
                ...data 
            }
            times[idx] = time;
            setBookingTimes(times)
            setOpen(false)
            setSuccess(true)
        })
    } */

    let content;

    if (loading) {
        content = <Loader height='50vh' />
    }
    if (!loading && employees) {
        content = (
            <Fragment>
                <ActionsWrapper>
                    <FormControl sx={{ minWidth: '75px', }} variant="filled" >
                        <InputLabel id="show-num">{t('show')}</InputLabel>
                        <Select
                            labelId="show-num"
                            id="show-num-select"
                            value={rowsPerPage}
                            label={t('show')}
                            onChange={handlePerPageChange}
                        >
                            <MenuItem value='all'>{t('all')}</MenuItem>
                            <MenuItem value={5}>{t('5')}</MenuItem>
                            <MenuItem value={10}>{t('10')}</MenuItem>
                            <MenuItem value={15}>{t('15')}</MenuItem>
                            <MenuItem value={20}>{t('20')}</MenuItem>
                        </Select>
                    </FormControl>
                </ActionsWrapper>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{t('#')}</TableCell>
                                <TableCell align="center">{t('Employee Name')}</TableCell>
                                <TableCell align="center">{t('Action')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.data.map((employee, index) => (
                                <TableRow key={employee.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{employee.name}</TableCell>
                                    <TableCell align="center" >
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                                            <Tooltip title={t('View')} onClick={viewModalOpenHandler.bind(null, employee.id)} >
                                                <ActionButton view >
                                                    <VisibilityIcon />
                                                </ActionButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {rowsPerPage !== 'all' && (
                    <TablePaginationActions
                        sx={{ width: '100%' }}
                        component="div"
                        count={employees.data.length}
                        total={employees.meta ? employees.meta.total : 0}
                        rowsPerPage={+rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={loading}
                    />)}
                {
                    viewModalOpened && (
                        <ViewModal show={viewModalOpened} id={selectedEmployeeId} 
                            closeHandler={viewModalCloseHandler} confirmHandler={viewModalConfirmHandler}
                            heading='view employee times' />
                    )
                }
            </Fragment>
        )

    }

    return (
        <Fragment>
            {content}
            {/* <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ t('name') }</TableCell>
                                    <TableCell align="right">{t('Day')}</TableCell>
                                    <TableCell align="right">{t('start Time')}</TableCell>
                                    <TableCell align="right">{t('end Time')}</TableCell>
                                    <TableCell align="right">{t('working')}</TableCell>
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
                                            {t('employee name')}
                                        </TableCell>
                                        <TableCell align="right">{t(row.day)}</TableCell>
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
                    </TableContainer> */}
        </Fragment>
    )
}
