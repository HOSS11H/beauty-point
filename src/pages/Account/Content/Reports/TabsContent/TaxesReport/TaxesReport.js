import { Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from "react-to-print";
import styled from 'styled-components';
import { CustomButton } from '../../../../../../components/UI/Button/Button';
import Loader from '../../../../../../components/UI/Loader/Loader';
import { formatCurrency } from '../../../../../../shared/utility';
import v1 from '../../../../../../utils/axios-instance-v1';
import SearchFilters from './SearchFilters/SearchFilters';

const CustomCard = styled(Card)`
    padding: 20px;
`

const BookingActions = styled.div`
    display: flex;
    align-items: center;
    justify-content:flex-end;
    flex-wrap: wrap;
    margin-bottom: 25px;
`
const ActionButton = styled(CustomButton)`
    &.MuiButton-root {
        width: auto;
        padding: 0 20px;
        height: 40px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.success.main};
        font-size: 16px;
        &:last-child {
            margin-bottom: 15px;
        }
        svg {
            width: 14px;
            height: 14px;
            margin-right: 10px;
        }
    }
`

const CardHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    h3 {
        flex-grow: 1;
        text-align: center;
    }
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
        h3 {
            order: 1;
            width: 100%;
            margin-bottom: 15px;
        }
        h4 {
            order: 2;
        }
    }
`

const CardDate = styled.div`
    margin-bottom: 30px;
`


const TaxesReport = props => {


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loadingUserData, setLoadingUserData] = useState(null)

    const [dateFrom, setDateFrom] = useState(moment().subtract(3, 'months'));
    const [dateTo, setDateTo] = useState(moment());

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true);
        const selectedSearchParams = {
            from_date: moment(dateFrom).format('YYYY-MM-DD'),
            to_date: moment(dateTo).format('YYYY-MM-DD'),
        }
        v1.get(`vendors/reports/vat`, {
            params: selectedSearchParams
        })
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [dateFrom, dateTo])
    useEffect(() => {
        setLoadingUserData(true);
        v1.get(`/auth/me`)
            .then(res => {
                setUserData(res.data);
                setLoadingUserData(false);
            })
            .catch(err => {
                setLoadingUserData(false);
                console.log(err);
            })
    }, [])

    const handleDateFromChange = (val) => {
        setDateFrom(val);
    };
    const handleDateToChange = (val) => {
        setDateTo(val);
    };

    const resetFilteringHandler = useCallback(() => {
        setDateFrom(moment().subtract(3, 'month'));
        setDateTo(moment());
    }, [])

    const reportRef = useRef();

    const printBookingHandler = useReactToPrint({
        content: () => reportRef.current,
    });

    let content;
    if (loading) {
        content = <Loader />
    }

    if (data && userData && !loading && !loadingUserData) {
        content = (
            <Fragment>
                <BookingActions>
                    <ActionButton onClick={printBookingHandler}  >{t('print')}</ActionButton>
                </BookingActions>
                <CustomCard ref={reportRef} >
                    <CardHead>
                        <h4>{userData.user.name}</h4>
                        <h3>{t('Employees Report')}</h3>
                        <h4>{userData.user.company.companyName}</h4>
                    </CardHead>
                    <CardDate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <p>
                                    <span>{t('Date ')}</span>
                                    <span>{t(' From: ')}</span>
                                    <span>{dateFrom.format('YYYY-MM-DD')}</span>
                                    <span>{t(' - To: ')}</span>
                                    <span>{dateTo.format('YYYY-MM-DD')}</span>
                                </p>
                            </Grid>
                        </Grid>
                    </CardDate>
                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Typography sx={{ p: 3 }} variant="h6" gutterBottom component="div">
                            {t('Vat on sales and other outputs')}
                        </Typography>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >{t('title')}</TableCell>
                                    <TableCell >{t('tax percentage  %')}</TableCell>
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
                                    <TableCell >{t('tax percentage  %')}</TableCell>
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
                                    <TableCell >{t('tax percentage  %')}</TableCell>
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
                                    <TableCell>0.00</TableCell>
                                    <TableCell>0.00</TableCell>
                                    <TableCell>{formatCurrency(data.total_vat)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomCard>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <SearchFilters perPage={15} resetFilteringHandler={resetFilteringHandler} dateFrom={dateFrom} dateTo={dateTo}
                handleDateFromChange={handleDateFromChange} handleDateToChange={handleDateToChange} />
            {content}
        </Fragment>
    )
}
export default TaxesReport;