import { useContext, useEffect, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
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
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

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
const PriceCalculation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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

function TabularReport(props) {

    const { t } = useTranslation()

    const { fetchedTabularReport,fetchingTabularReports, fetchTabularReportHandler, filteringTabularReportsSuccess } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    useEffect(() => {
        fetchTabularReportHandler(lang, );
    }, [lang, fetchTabularReportHandler]);



    let content = (
        <Fragment>
            <Paper sx={{ width: '100%', boxShadow: 'none', marginBottom: '20px', }}>
                <TableContainer>
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
            <SearchFilters />
            {content}
        </TabularReportWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedTabularReport: state.reports.reports.tabularReport.content,
        fetchingTabularReports: state.reports.reports.tabularReport.fetchingTabularReports,
        filteringTabularReportsSuccess: state.reports.reports.tabularReport.filteringTabularReportsSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTabularReportHandler: (lang, page, rowsPerPage, order, orderBy) => dispatch(fetchTabularReport(lang, page, rowsPerPage, order, orderBy)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TabularReport);