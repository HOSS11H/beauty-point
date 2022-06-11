import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment, useState, useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../shared/utility';
import SearchFilters from './SearchFilters/SearchFilters';
import ThemeContext from '../../../../../../store/theme-context';
import v1 from '../../../../../../utils/axios-instance-v1';
import Loader from '../../../../../../components/UI/Loader/Loader';
import moment from 'moment';
const TaxesReport = props => {

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)

    const { t } = useTranslation();

    useEffect( ( ) => {
        setLoading(true);
        const todayDate = moment().format('YYYY-MM-DD')
        const monthBeforeDate = moment().subtract(1, 'month').format('YYYY-MM-DD')
        v1.get(`vendors/reports/vat?from_date=${todayDate}&to_date=${monthBeforeDate}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [] )

    const searchHandler = useCallback(({ dateFrom, dateTo }) => {
        setLoading(true);
        v1.get(`vendors/reports/vat?from_date=${dateFrom}&to_date=${dateTo}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [])

    let content;
    if (loading) {
        content = <Loader />
    }

    if (data && !loading) {
        content = (
            <Fragment>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                        {t('Vat on sales and other outputs')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('title')}</TableCell>
                                <TableCell >{t('tax percentage %')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                                <TableCell >{t('modification')}</TableCell>
                                <TableCell >{t('vat')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('sales under main perecntage in KSA')}
                                </TableCell>
                                <TableCell>15.00</TableCell>
                                <TableCell>{formatCurrency(data.earnings.total)}</TableCell>
                                <TableCell>{formatCurrency(data.earnings.refunded)}</TableCell>
                                <TableCell>{formatCurrency(data.earnings.vat)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('sales to citizens ( private health services / national private education')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('current sales that goes under zero percentage')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('exports')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('forgiven sales')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('total')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(data.earnings.total)}</TableCell>
                                <TableCell>{formatCurrency(data.earnings.refunded)}</TableCell>
                                <TableCell>{formatCurrency(data.earnings.vat)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                        {t('Vat on expenses and other intputs')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('title')}</TableCell>
                                <TableCell >{t('tax percentage %')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                                <TableCell >{t('modification')}</TableCell>
                                <TableCell >{t('vat')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('purchases under main perecntage')}
                                </TableCell>
                                <TableCell>15.00</TableCell>
                                <TableCell>{formatCurrency(data.expenses.total)}</TableCell>
                                <TableCell>{formatCurrency(data.expenses.refunded || 0)}</TableCell>
                                <TableCell>{formatCurrency(data.expenses.vat)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('imports under main vat which paid in customs')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('Imports subject to value added vat and to which the reverse charge mechanism applies')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('purchases under zero perecetage')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('forgiven purchases')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                                <TableCell>{formatCurrency(0.00)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('total')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(data.expenses.total)}</TableCell>
                                <TableCell>{formatCurrency(data.expenses.refunded || 0)}</TableCell>
                                <TableCell>{formatCurrency(data.expenses.vat)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper}>
                    <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                        {t('due vat')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('title')}</TableCell>
                                <TableCell >{t('tax percentage %')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                                <TableCell >{t('modification')}</TableCell>
                                <TableCell >{t('vat')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Total vat payable for the tax period')}
                                </TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(data.earnings.total)}</TableCell>
                                <TableCell>{formatCurrency(data.earnings.refunded)}</TableCell>
                                <TableCell>{formatCurrency(data.earnings.vat)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('Total recoverable tax for the tax period')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(data.expenses.total)}</TableCell>
                                <TableCell>{formatCurrency(data.expenses.refunded || 0)}</TableCell>
                                <TableCell>{formatCurrency(data.expenses.vat)}</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >{t('Tax payable for the tax period')}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>{formatCurrency(data.total_vat)}</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>0.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <SearchFilters perPage={15} handleFilters={searchHandler} />
            {content}
        </Fragment>
    )
}
export default TaxesReport;