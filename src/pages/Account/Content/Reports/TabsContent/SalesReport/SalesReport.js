import v1 from "../../../../../../utils/axios-instance-v1";
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
import { Bar } from 'react-chartjs-2';
import SalesTable from "./SalesTable/SalesTable";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
)
const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};


const TablePaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 80px; 
    margin-bottom: 40px; 
`



const SalesReport = props => {

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [locations, setLocations] = useState([])
    const [fetchingLocations, setFetchingLocations] = useState()

    const [SalesChartData, setSalesChartData] = useState(null)
    const [SalesTableData, setSalesTableData] = useState(null)

    const [pages, setPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setFetchingLocations(true)
        v1.get(`/locations`, {
            headers: {
                'Accept-Language': lang
            }
        }).then(response => {
            setFetchingLocations(false)
            setLocations(response.data)
        })
            .catch(err => {
                setFetchingLocations(false)
                toast.error(err.response.data.message)
            })
    }, [lang])

    const searchHandler = useCallback((location, year, month, page = pages, perPage = rowsPerPage) => {
        setLoading(true);

        const salesChartParams = {
            location,
            year: year,
            month: month
        }
        const salesTableParams = {
            location,
            year: year,
            month: month,
            page: page,
            per_page: perPage,
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept-Language': lang
        }

        const salesChartEndPoint = `${v1.defaults.baseURL}/vendors/reports/sales`;
        const salesTableEndPoint = `${v1.defaults.baseURL}/vendors/reports/sales-table`;

        const getSalesChartData = axios.get(salesChartEndPoint, { params: salesChartParams, headers: headers });
        const getSalesTableData = axios.get(salesTableEndPoint, { params: salesTableParams, headers: headers });

        axios.all([getSalesChartData, getSalesTableData])
            .then(axios.spread((...responses) => {
                setLoading(false);
                setSalesChartData(responses[0].data);
                setSalesTableData(responses[1].data);
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
    if (fetchingLocations) {
        filters = <Loader height='70px' />
    }
    if (locations.length > 0) {
        filters = <SearchFilters locations={locations} searchHandler={searchHandler} />
    }

    let content;

    if (loading) {
        content = <Loader height='70vh' />
    }

    if (SalesChartData && SalesTableData && !loading) {
        let data = [{
            label: t('sales'),
            data: SalesChartData.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
        }]

        content = (
            <Fragment>
                <Bar data={{ labels: SalesChartData.labels, datasets: data }} options={options} />
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
                            count={SalesTableData.data ? SalesTableData.data.length : SalesTableData.length}
                            total={SalesTableData.meta ? SalesTableData.meta.total : SalesTableData.length}
                            rowsPerPage={+rowsPerPage}
                            page={pages}
                            onPageChange={handleChangePage}
                            loading={loading}
                        />
                    )}
                </TablePaginationWrapper>
                <SalesTable data={SalesTableData} />
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

export default SalesReport;