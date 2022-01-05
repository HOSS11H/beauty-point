import { useContext, useEffect, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchTabularReport } from '../../../../../../store/actions/index';
import ThemeContext from '../../../../../../store/theme-context';
import EnhancedTableHead from './TableHead/TableHead';
import EnhancedTableBody from './TableBody/TableBody';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../shared/utility';
import SearchMessage from "../../../../../../components/Search/SearchMessage/SearchMessage";
import SearchFilters from './SearchFilters/SearchFilters';
import Card from '@mui/material/Card';
import { Backdrop, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useCallback } from 'react';
import TablePaginationActions from '../../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import { CustomButton } from '../../../../../../components/UI/Button/Button';
import v1 from '../../../../../../utils/axios-instance-v1';

const TabularReportWrapper = styled(Card)`
    display: flex;
    max-width: 100%;
    min-height: 100px;
    box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
    margin-bottom: 40px;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius:20px;
    flex-direction: column;
    padding-bottom: 20px;
    padding: 30px 20px;
    &:last-child{
        margin-bottom:0;
    }
    .MuiPaper-root {
        border-radius: 0;
        border-radius:20px;
        padding: 20px;
    }
`
const TablePaginationWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`
const ActionsWrapper = styled.div`
    display: flex;
`

const PriceCalculation = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    &:last-child{
        padding-bottom:0;
    }
    p {
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
`
const ActionButton = styled(CustomButton)`
    &.MuiButton-root {
        width: auto;
        padding: 0 10px;
        height: 50px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.success.main};
        font-size: 14px;
        margin-right: 10px;
        &:last-child {
            margin-right: 0;
        }
        svg {
            width: 14px;
            height: 14px;
            margin-right: 10px;
        }
    }
`
const Loader = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 50vh;
    flex-grow: 1;
`

const intialPerPage = 15;

function TabularReport(props) {

    const { t } = useTranslation()

    const { fetchedTabularReport,fetchingTabularReports, fetchTabularReportHandler, filteringTabularReportsSuccess, tabularReportFilters } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const [exporting, setExporting] = useState(false);

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    useEffect(() => {
        fetchTabularReportHandler(lang, page, rowsPerPage );
    }, [lang, fetchTabularReportHandler, page, rowsPerPage]);

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);
    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }, []);

    const exportToCsvHandler = () => {
        setExporting(true);
        v1.get('/vendors/reports/tabular-table/csv?format=csv', { responseType: 'blob', params: { ...tabularReportFilters } })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'TabularReport.csv');
                document.body.appendChild(link);
                link.click();
                link.remove();
                setExporting(false);
            })
            .catch(err => {
                console.log(err);
                setExporting(false);
            })
    }
    const exportToPdfHandler = () => {
        setExporting(true);
        v1.get('/vendors/reports/tabular-table/csv?format=pdf', { responseType: 'blob', params: { ...tabularReportFilters } })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf'}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'TabularReport.pdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
                setExporting(false);
            })
            .catch(err => {
                console.log(err);
                setExporting(false);
            })
    }
    const exportToExcelHandler = () => {
        setExporting(true);
        v1.get('/vendors/reports/tabular-table/csv?format=xlsx', { responseType: 'blob', params: { ...tabularReportFilters } })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'TabularReport.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
                setExporting(false);
            })
            .catch(err => {
                console.log(err);
                setExporting(false);
            })
    }

    let content = (
        <Fragment>
            <Paper sx={{ width: '100%', boxShadow: 'none',  }}>
                <TableContainer>
                    <TablePaginationWrapper>
                        <ActionsWrapper>
                            <ActionButton onClick={exportToCsvHandler}>{t('export to csv')}</ActionButton>
                            <ActionButton onClick={exportToPdfHandler}>{t('export to pdf')}</ActionButton>
                            <ActionButton onClick={exportToExcelHandler}>{t('export to excel')}</ActionButton>
                        </ActionsWrapper>
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
                                <MenuItem value='5'>{t('5')}</MenuItem>
                                <MenuItem value='10'>{t('10')}</MenuItem>
                                <MenuItem value='15'>{t('15')}</MenuItem>
                                <MenuItem value='20'>{t('20')}</MenuItem>
                            </Select>
                        </FormControl>
                        {rowsPerPage !== 'all' && (
                            <TablePaginationActions
                                sx= {{ width: '100%'}}
                                component="div"
                                count={fetchedTabularReport.data.length}
                                total={fetchedTabularReport.meta ? fetchedTabularReport.meta.total : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                loading={fetchingTabularReports}
                            />
                        )}
                    </TablePaginationWrapper>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            rowCount={fetchedTabularReport.data.length}
                        />
                        <EnhancedTableBody
                            fetchedTabularReport={fetchedTabularReport}
                        />
                    </Table>
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            sx= {{ width: '100%'}}
                            component="div"
                            count={fetchedTabularReport.data.length}
                            total={fetchedTabularReport.meta ? fetchedTabularReport.meta.total : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={fetchingTabularReports}
                        />
                    )}
                </TableContainer>
            </Paper>
            <Grid   container   spacing={2}>
                <Grid item xs={12} md={6}>
                    <PriceCalculation>
                        <p>{t('total taxes')}</p>
                        <p>{formatCurrency(fetchedTabularReport.total_tax || 0)}</p>
                    </PriceCalculation>
                    <PriceCalculation>
                        <p>{t('total amount')}</p>
                        <p>{formatCurrency(fetchedTabularReport.total || 0)}</p>
                    </PriceCalculation>
                </Grid>
            </Grid>
        </Fragment>
    )
    if ( fetchedTabularReport.data.length === 0 && filteringTabularReportsSuccess) {
        content = (
            <SearchMessage>
                {t('no results')}
            </SearchMessage>
        )
    } else if (fetchingTabularReports) {
        content = (
            <Loader>
                <CircularProgress color="secondary" />
            </Loader>
        )
    }

    return (
        <TabularReportWrapper>
            <SearchFilters perPage={rowsPerPage} />
            {content}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={exporting}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
        </TabularReportWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedTabularReport: state.reports.reports.tabularReport.content,
        fetchingTabularReports: state.reports.reports.tabularReport.fetchingTabularReports,
        filteringTabularReportsSuccess: state.reports.reports.tabularReport.filteringTabularReportsSuccess,
        tabularReportFilters: state.reports.reports.tabularReport.tabularReportFilters,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTabularReportHandler: (lang, page, rowsPerPage ) => dispatch(fetchTabularReport(lang, page, rowsPerPage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TabularReport);
