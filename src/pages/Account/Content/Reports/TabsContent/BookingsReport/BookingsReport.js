import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../../../../../components/UI/Loader/Loader';
import { formatCurrency } from '../../../../../../shared/utility';
import v1 from '../../../../../../utils/axios-instance-v1';
import SearchFilters from './SearchFilters/SearchFilters';
const BookingsReport = props => {


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true);
        const todayDate = moment().format('YYYY-MM-DD')
        const monthBeforeDate = moment().subtract(1, 'month').format('YYYY-MM-DD')
        v1.get(`vendors/reports/vat?from_date=${monthBeforeDate}&to_date=${todayDate}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [])

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
                        {t('Customers App')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('Type')}</TableCell>
                                <TableCell >{t('Number')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                                <TableCell >{t('App percentage (9 %)')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Pending Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Cancelled Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Confirmed Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                        {t('Website Bookings')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('Type')}</TableCell>
                                <TableCell >{t('Number')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                                <TableCell >{t('Website percentage')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Pending Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Cancelled Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Confirmed Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper}>
                <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                        {t('Indoor Bookings')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('Type')}</TableCell>
                                <TableCell >{t('Number')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Pending Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Cancelled Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t('Confirmed Bookings')}
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
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
export default BookingsReport;