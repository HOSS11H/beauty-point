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

const TablePaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 80px; 
    margin-bottom: 40px; 
`

const initialData = {
    data :  [
        {
            name: 'sdsdsd',
            services_number: 4,
            total_services: 15,
            employee_amount: 150,
            employee_percentage: 5
        },
        {
            name: 'sdsdsd',
            services_number: 4,
            total_services: 15,
            employee_amount: 150,
            employee_percentage: 5
        },
        {
            name: 'sdsdsd',
            services_number: 4,
            total_services: 15,
            employee_amount: 150,
            employee_percentage: 5
        },
    ],
    meta: {
        
    }
} 

const EmployeesReport = props => {

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [EmployeeTableData, setEmployeeTableData] = useState(initialData)
    const [total, setTotal] = useState(0)
    const [commission, setCommission] = useState(0)

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
            from,
            to,
            timeFrom,
            timeTo,
            page: page,
            per_page: perPage,
            employeeId: '1'
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept-Language': lang
        }

        const employeeTableEndPoint = `${v1.defaults.baseURL}/vendors/reports/employee-share`;

        const getEmployeeTableData = axios.get(employeeTableEndPoint, { params: employeeTableParams, headers: headers });

        axios.all([getEmployeeTableData])
            .then(axios.spread((...responses) => {
                setLoading(false);
                //setEmployeeTableData(responses[0].data.data);
                setTotal(responses[0].data.total);
                setCommission(responses[0].data.commission);
            }))
            .catch(error => {
                setLoading(false);
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

    if (EmployeeTableData && !loading) {
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
                            count={EmployeeTableData.data.length}
                            total={EmployeeTableData.meta.total}
                            rowsPerPage={+rowsPerPage}
                            page={pages}
                            onPageChange={handleChangePage}
                            loading={loading}
                        />
                    )}
                </TablePaginationWrapper>
                <EmployeeTable data={EmployeeTableData.data} 
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