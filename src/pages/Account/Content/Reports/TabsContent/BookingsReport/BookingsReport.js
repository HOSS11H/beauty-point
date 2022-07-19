import { LoadingButton } from '@mui/lab';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loader from '../../../../../../components/UI/Loader/Loader';
import { formatCurrency } from '../../../../../../shared/utility';
import v2 from '../../../../../../utils/axios-instance';
import v1 from '../../../../../../utils/axios-instance-v1';
import SearchFilters from './SearchFilters/SearchFilters';
import { format } from 'date-fns';

const DisabledRow = styled(TableRow)`
    &.MuiTableRow-root {
        & .MuiTableCell-root {
            color: red;
        }
    }
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

const BookingsReport = props => {

    const [dateFrom, setDateFrom] = useState(moment().subtract(1, 'month'));
    const [dateTo, setDateTo] = useState(new Date());


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)

    const [sendingRequest, setSendingRequest] = useState(false)

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true);
        const todayDate = moment().format('YYYY-MM-DD')
        const monthBeforeDate = moment().subtract(1, 'month').format('YYYY-MM-DD')
        v1.get(`vendors/reports/bookings?from_date=${monthBeforeDate}&to_date=${todayDate}`)
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
        v1.get(`vendors/reports/bookings?from_date=${dateFrom}&to_date=${dateTo}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [])
    const handleDateFromChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDateFrom(formattedVal);
    }
    const handleDateToChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDateTo(formattedVal);
    }

    const ConfirmFilteringHandler = () => {
        const selectedSearchParams = {
            dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
            dateTo: moment(dateTo).format('YYYY-MM-DD'),
        }
        searchHandler(selectedSearchParams);
    }

    const resetFilteringHandler = () => {
        const searchParams = {
            dateFrom: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            dateTo: moment().format('YYYY-MM-DD'),
        }
        setDateFrom(moment().subtract(1, 'month'));
        setDateTo(new Date());
        searchHandler(searchParams);
    }

    const SubmitRequestHandler = () => {
        setSendingRequest(true);
        v2.get(`/vendors/request-payment?date_from=${dateFrom}&date_to=${dateTo}`)
            .then(res => {
                setSendingRequest(false);
                toast.success(t('Request sent  successfully!'))
            })
            .catch(err => {
                setSendingRequest(false);
                toast.error(t('Failed to send requset!'))
            })
    }

    let content;
    if (loading) {
        content = <Loader />
    }

    if (data && !loading) {

        const completedExternalBookings = data.external.find(item => item.status === 'approved')

        content = (
            <Fragment>
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
                            {
                                data.internal.map(item => {
                                    if (item.status === 'canceled') {
                                        return (
                                            <DisabledRow key={item.id}>
                                                <TableCell component="th" scope="row">
                                                    {t('bookings')} {t(item.status)}
                                                </TableCell>
                                                <TableCell>{item.total_count}</TableCell>
                                                <TableCell>{formatCurrency(item.total)}</TableCell>
                                            </DisabledRow>
                                        )
                                    }
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                {t('bookings')} {t(item.status)}
                                            </TableCell>
                                            <TableCell>{item.total_count}</TableCell>
                                            <TableCell>{formatCurrency(item.total)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                                    {t('total')}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{
                                    data.internal.reduce((acc, curr) => {
                                        return acc + curr.total_count
                                    }, 0)
                                }</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{formatCurrency(
                                    data.internal.reduce((acc, curr) => {
                                        return acc + curr.total
                                    }, 0)
                                )}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                        {t('External Bookings')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('Type')}</TableCell>
                                <TableCell >{t('Number')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                                <TableCell >{t('Website percentage')} ( 9 %)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.external.map(item => {
                                    if (item.status === 'canceled') {
                                        return (
                                            <DisabledRow key={item.id}  >
                                                <TableCell component="th" scope="row">
                                                    {t('bookings')} {t(item.status)}
                                                </TableCell>
                                                <TableCell>{item.total_count}</TableCell>
                                                <TableCell>{formatCurrency(item.total)}</TableCell>
                                                <TableCell>{formatCurrency(item.status !== 'canceled' ? item.commission : 0)}</TableCell>
                                            </DisabledRow>
                                        )
                                    }
                                    return (
                                        <TableRow key={item.id}  >
                                            <TableCell component="th" scope="row">
                                                {t('bookings')} {t(item.status)}
                                            </TableCell>
                                            <TableCell>{item.total_count}</TableCell>
                                            <TableCell>{formatCurrency(item.total)}</TableCell>
                                            <TableCell>{formatCurrency(item.status !== 'canceled' ? item.commission : 0)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                                    {t('total')}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{data.total.total_count}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{formatCurrency(data.total.total)}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{formatCurrency(data.total.commission)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                        {t('Commissions')}
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >{t('Type')}</TableCell>
                                <TableCell >{t('Number')}</TableCell>
                                <TableCell >{t('amount')}</TableCell>
                                <TableCell >{t('Website percentage')} ( 9 %)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={completedExternalBookings.id}  >
                                <TableCell component="th" scope="row">
                                    {t('bookings')} {t(completedExternalBookings.status)}
                                </TableCell>
                                <TableCell>{completedExternalBookings.total_count}</TableCell>
                                <TableCell>{formatCurrency(completedExternalBookings.total)}</TableCell>
                                <TableCell>{formatCurrency(completedExternalBookings.status !== 'canceled' ? completedExternalBookings.commission : 0)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid sx={{ mt: 3 }} container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <PriceCalculation>
                            <p>{t('total bookings')}</p>
                            <p>{completedExternalBookings.total_count}</p>
                        </PriceCalculation>
                        <PriceCalculation>
                            <p>{t('commission')}</p>
                            <p>{9} %</p>
                        </PriceCalculation>
                        <PriceCalculation>
                            <p>{t('total amount')}</p>
                            <p>{formatCurrency(((9 / 100) * completedExternalBookings.total))}</p>
                        </PriceCalculation>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton loading={sendingRequest} onClick={SubmitRequestHandler} variant='contained' color="secondary">{t('request / purchase')}</LoadingButton>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <SearchFilters perPage={15} handleFilters={searchHandler} 
                    handleDateFromChange={handleDateFromChange} handleDateToChange={handleDateToChange}
                    confirmFiltering={ConfirmFilteringHandler} resetFiltering={resetFilteringHandler}
                    dateFrom={dateFrom} dateTo={dateTo} />
            {content}
        </Fragment>
    )
}
export default BookingsReport;