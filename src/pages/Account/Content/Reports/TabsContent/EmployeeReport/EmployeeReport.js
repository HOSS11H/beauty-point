import v1 from "../../../../../../utils/axios-instance-v1";
import v2 from "../../../../../../utils/axios-instance";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../../../../../store/theme-context";
import SearchFilters from "./SearchFilters/SearchFilters";
import { toast } from "react-toastify";
import Loader from "../../../../../../components/UI/Loader/Loader";
import axios from "axios";
import styled from 'styled-components';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TablePaginationActions from "../../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import { useTranslation } from "react-i18next";
import EmployeeTable from "./EmployeeTable/EmployeeTable";

const TablePaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 80px; 
    margin-bottom: 40px; 
`



const EmployeeReport = props => {

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [employees, setEmployees] = useState([])
    const [fetchingEmployees, setFetchingEmployees] = useState(false)

    const [EmployeeTableData, setEmployeeTableData] = useState(null)

    const [pages, setPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setFetchingEmployees(true)
        v2.get(`/vendors/employees`, {
            headers: {
                'Accept-Language': lang,
            }
        }).then(response => {
            setFetchingEmployees(false)
            setEmployees(response.data.data)
        })
            .catch(err => {
                setFetchingEmployees(false)
                toast.error(err.response.data.message)
            })
    }, [lang])

    const searchHandler = useCallback((employeeId, from, to, page = pages, perPage = rowsPerPage) => {
        setLoading(true);

        const employeeTableParams = {
            employeeId,
            from,
            to,
            page: page,
            per_page: perPage,
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
                setEmployeeTableData(responses[0].data.data);
            }))
            .catch(error => {
                setLoading(false);
            });
    }, [lang, pages, rowsPerPage])

    const handleChangePage = useCallback((event, newPage) => {
        setPages(newPage);
    }, []);
    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
        setPages(0);
    }, []);

    let filters;
    if (fetchingEmployees) {
        filters = <Loader height='70px' />
    }
    if (employees.length > 0) {
        filters = <SearchFilters employees={employees} searchHandler={searchHandler} />
    }

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
                <EmployeeTable data={EmployeeTableData.data} />
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

export default EmployeeReport;