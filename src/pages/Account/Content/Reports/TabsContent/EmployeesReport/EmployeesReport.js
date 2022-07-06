import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import TablePaginationActions from "../../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import Loader from "../../../../../../components/UI/Loader/Loader";
import ThemeContext from "../../../../../../store/theme-context";
import v1 from "../../../../../../utils/axios-instance-v1";
import EmployeeTable from "./EmployeesTable/EmployeesTable";
import SearchFilters from "./SearchFilters/SearchFilters";
import { toast } from 'react-toastify';

const TablePaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 80px; 
    margin-bottom: 40px; 
`


const EmployeesReport = props => {

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [ userData, setUserData ] = useState(null)
    const [EmployeesTableData, setEmployeesTableData] = useState(null)

    const [pages, setPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [dateFrom, setDateFrom] = useState(moment().subtract(3, 'months'));
    const [dateTo, setDateTo] = useState(moment());
    const [ timeFrom, setTimeFrom ] = useState(moment())
    const [ timeTo, setTimeTo ] = useState(moment())

    const [loading, setLoading] = useState(false)


    const handleDateFromChange = (val) => {
        setDateFrom(val);
    };
    const handleDateToChange = (val) => {
        setDateTo(val);
    };
    const handleTimeFromChange = (val) => {
        setTimeFrom(val);
    };
    const handleTimeToChange = (val) => {
        setTimeTo(val);
    };

    const searchHandler = useCallback(( from, to, timeFrom, timeTo, page = pages, perPage = rowsPerPage ) => {
        setLoading(true);

        const employeeTableParams = {
            date_from: from,
            date_to: to,
            time_from: timeFrom,
            time_to: timeTo,
            page: page,
            per_page: perPage,
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept-Language': lang
        }

        const employeeTableEndPoint = `${v1.defaults.baseURL}/vendors/reports/employees-details`;
        const userDataEndpoint = `${v1.defaults.baseURL}/auth/me`;

        const getEmployeeTableData = axios.get(employeeTableEndPoint, { params: employeeTableParams, headers: headers });
        const getUserData = axios.get(userDataEndpoint, {headers: headers});

        axios.all([getEmployeeTableData, getUserData])
            .then(axios.spread((...responses) => {
                setLoading(false);
                setEmployeesTableData(responses[0].data);
                setUserData(responses[1].data);
            }))
            .catch(error => {
                setLoading(false);
                toast.error('Error Getting Data.')
            });
    }, [lang, pages, rowsPerPage])

    useEffect(() => {
        searchHandler(dateFrom.format('YYYY-MM-DD'), dateTo.format('YYYY-MM-DD'), timeFrom.format('hh:MM A', timeFrom), timeTo.format('hh:MM A'));
    }, [dateFrom, dateTo, searchHandler, timeFrom, timeTo])

    const handleChangePage = useCallback((event, newPage) => {
        setPages(newPage);
    }, []);
    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
        setPages(0);
    }, []);

    let filters =<SearchFilters 
        searchHandler={searchHandler} dateFrom={dateFrom} dateTo={dateTo} timeFrom={timeFrom} timeTo={timeTo} 
        handleDateFromChange={handleDateFromChange} handleDateToChange={handleDateToChange}
        handleTimeFromChange={handleTimeFromChange} handleTimeToChange={handleTimeToChange}
        />

    let content;

    if (loading) {
        content = <Loader height='70vh' />
    }

    if (EmployeesTableData && userData && !loading) {
        content = (
            <Fragment>
                <TablePaginationWrapper>
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
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            sx={{ width: '100%' }}
                            component="div"
                            count={EmployeesTableData.data.length}
                            total={EmployeesTableData.meta.total}
                            rowsPerPage={+rowsPerPage}
                            page={pages}
                            onPageChange={handleChangePage}
                            loading={loading}
                        />
                    )}
                </TablePaginationWrapper>
                <EmployeeTable data={EmployeesTableData.data} userData={userData}
                    dateFrom={dateFrom} dateTo={dateTo} timeFrom={timeFrom} timeTo={timeTo} 
                />
            </Fragment>
        )
    }

    return (
        <Fragment>
            {filters}
            {content}
        </Fragment>
    )
}

export default EmployeesReport;