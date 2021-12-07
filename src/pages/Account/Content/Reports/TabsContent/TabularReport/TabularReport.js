import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchTabularReport } from '../../../../../../store/actions/index';
import ThemeContext from '../../../../../../store/theme-context';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from '../../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import EnhancedTableBody from './TableBody/TableBody';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../shared/utility';

const TabularReportWrapper = styled.div`
    display: flex;
    max-width: 100%;
    min-height: 100px;
    box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
    margin-bottom: 40px;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius:20px;
    flex-direction: column;
    padding-bottom: 20px;
    &:last-child{
        margin-bottom:0;
    }
    .MuiPaper-root {
        border-radius: 0;
        border-radius:20px;
        padding: 20px;
    }
    `
const PriceCalculation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 25px;
    p {
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
    }
`



const intialRowsPerPage = 15

function TabularReport(props) {

    const { t } = useTranslation()

    const { fetchedTabularReport, fetchTabularReportHandler, fetchingReports, } = props;

    console.log(fetchedTabularReport)

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('name');

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [totalPrice, setTotalPrice] = useState(0)
    const [totalTaxes, setTotalTaxes] = useState(0)




    useEffect(() => {
        fetchTabularReportHandler(lang, page, rowsPerPage, order, orderBy);
    }, [lang, page, rowsPerPage, orderBy, order, fetchTabularReportHandler]);

    useEffect(() => {
        if (fetchedTabularReport) {
            const amount = fetchedTabularReport.reduce( (sum, item) => {
                return sum + (parseInt(item.amount))
            } , 0)
            const taxes = fetchedTabularReport.reduce( (sum, item) => {
                return sum + (parseInt(item.tax))
            } , 0)
            setTotalPrice(amount)
            setTotalTaxes(taxes)
        }
    }, [fetchedTabularReport])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);


    let content = (
        <Fragment>
            <Paper sx={{ width: '100%', boxShadow: 'none' }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            rowCount={fetchedTabularReport.length}
                            onRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                            loading={fetchingReports}
                        />
                        <EnhancedTableBody
                            fetchedTabularReport={fetchedTabularReport}
                        />
                    </Table>
                </TableContainer>
                <TablePaginationActions
                    component="div"
                    count={fetchedTabularReport.length}
                    total={fetchedTabularReport ? fetchedTabularReport.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    loading={fetchingReports}
                />
            </Paper>
        </Fragment>
    )

    return (
        <TabularReportWrapper>
            {content}
            <PriceCalculation>
                <p>{t('price after discount')}</p>
                <p>{formatCurrency(totalPrice)}</p>
            </PriceCalculation>
            <PriceCalculation>
                <p>{t('price after discount')}</p>
                <p>{formatCurrency(totalTaxes)}</p>
            </PriceCalculation>
        </TabularReportWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedTabularReport: state.reports.reports.tabularReport,
        fetchingReports: state.reports.fetchingReports,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTabularReportHandler: (lang, page, rowsPerPage, order, orderBy) => dispatch(fetchTabularReport(lang, page, rowsPerPage, order, orderBy)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TabularReport);