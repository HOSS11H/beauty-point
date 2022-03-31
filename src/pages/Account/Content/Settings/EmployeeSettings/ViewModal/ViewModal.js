import { useEffect, useState } from "react";
import Loader from "../../../../../../components/UI/Loader/Loader";
import { CustomModal } from "../../../../../../components/UI/Modal/Modal";
import v2 from '../../../../../../utils/axios-instance';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TimePicker } from "@mui/lab";


const ViewModal = (props) => {

    const { t } = useTranslation();

    const { id, show, heading, confirmHandler, closeHandler } = props;

    const [employee, setEmployee] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        v2.get(`vendors/employees/${id}/schedule`)
            .then(res => {
                setEmployee(res.data.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [id])

    const changeEmployeeWorkingStatus = (e, index, dayId) => {
        const updatedEmployeeDays = [...employee]
        const updatedDay = updatedEmployeeDays[index]
        updatedDay.is_working = e.target.checked ? 'yes' : 'no';
        updatedDay.employee_id = id
        v2.put(`vendors/employee-schedule/${dayId}`, updatedDay)
            .then(res => {
                setEmployee(updatedEmployeeDays)
            })
            .catch(err => {
                toast.error(t('Error updating info'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }

    const changeEmployeeStartingHours = (val, index, dayId) => {
        employee[index].start_time = val;
        const updatedEmployeeDays = [...employee]
        const updatedDay = updatedEmployeeDays[index]
        updatedDay.start_time = val;
        updatedDay.employee_id = id
        v2.put(`vendors/employee-schedule/${dayId}`, updatedDay)
            .then(res => {
                setEmployee(updatedEmployeeDays)
            })
            .catch(err => {
                toast.error(t('Error updating info'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }
    const changeEmployeeEndingHours = (val, index, dayId) => {
        employee[index].end_time = val;
        const updatedEmployeeDays = [...employee]
        const updatedDay = updatedEmployeeDays[index]
        updatedDay.end_time = val;
        updatedDay.employee_id = id
        v2.put(`vendors/employee-schedule/${dayId}`, updatedDay)
            .then(res => {
                setEmployee(updatedEmployeeDays)
            })
            .catch(err => {
                toast.error(t('Error updating info'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }

    let content;

    if (loading) {
        content = <Loader height='500px' />
    }
    if (!loading && employee) {
        content = (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('Day')}</TableCell>
                            <TableCell align="center">{t('start Time')}</TableCell>
                            <TableCell align="center">{t('end Time')}</TableCell>
                            <TableCell align="center">{t('working')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employee.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{t(row.day)}</TableCell>
                                <TableCell align="center">
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <TimePicker
                                            label={t("Time")}
                                            value={row.start_time}
                                            onChange={(value) => changeEmployeeStartingHours(value, index, row.id)}
                                            renderInput={(params) => <TextField  {...params} />}
                                        />
                                    </LocalizationProvider>
                                </TableCell>
                                <TableCell align="center">
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <TimePicker
                                            label={t("Time")}
                                            value={row.end_time}
                                            onChange={(value) => changeEmployeeEndingHours(value, index, row.id)}
                                            renderInput={(params) => <TextField  {...params} />}
                                        />
                                    </LocalizationProvider>
                                </TableCell>
                                <TableCell align="center"><Switch
                                    checked={row.is_working === 'yes'}
                                    onChange={(e) => changeEmployeeWorkingStatus(e, index, row.id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <CustomModal show={show} heading={heading} onConfirm={confirmHandler} onClose={closeHandler}>
            {content}
        </CustomModal>
    )
}
export default ViewModal;