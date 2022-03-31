import { FormControl, InputLabel, MenuItem, Select, TableHead, Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next"
import { formatCurrency } from "../../../../../shared/utility";
import { Fragment, useCallback, useEffect, useState } from "react";
import moment from "moment";
import TablePaginationActions from "../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import v2 from '../../../../../utils/axios-instance';
import axios from 'axios';
import Loader from "../../../../../components/UI/Loader/Loader";
import styled from 'styled-components';

const ActionsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 25px;
`

const intialPerPage = 15;

const PlansInvoices = (props) => {

    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const { t } = useTranslation()

    useEffect(() => {
        setLoading(true)
        const controller = new AbortController();
        const getInvoicesData = v2.get(`/vendors/invoices?order_by=id&order_dir=desc&per_page=${rowsPerPage}&page=${page + 1}`)
        axios.all([getInvoicesData], {
            signal: controller.signal
        })
            .then(axios.spread((invoices) => {
                setInvoices(invoices.data)
                setLoading(false)
            }))
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [page, rowsPerPage])

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);
    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }, []);

    let content;

    if (loading && !invoices) {
        content = <Loader height='300px' />
    }

    if (invoices) {
        content = (
            <Fragment>
                <Typography sx={{ my: 5 }} variant="h5" component="div">
                    {`${t("Invoices")}`}
                </Typography>
                <ActionsWrapper>
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
                </ActionsWrapper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("Package")}</TableCell>
                                <TableCell align="right">{t("Amount")}</TableCell>
                                <TableCell align="right">{t("Date")}</TableCell>
                                <TableCell align="right">{t("Next payment Date")}</TableCell>
                                <TableCell align="right">{t("payment gateway")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                invoices.data.map((invoice, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {invoice.package}
                                            </TableCell>
                                            <TableCell align="right">{formatCurrency(invoice.amount)}</TableCell>
                                            <TableCell align="right">{moment(invoice.pay_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="right">{moment(invoice.expire_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="right">{invoice.gateway}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {rowsPerPage !== 'all' && (
                    <TablePaginationActions
                        sx={{ width: '100%' }}
                        component="div"
                        count={invoices.data.length}
                        total={invoices.meta ? invoices.meta.total : 0}
                        rowsPerPage={+rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={loading}
                    />)}
            </Fragment>
        )
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
export default PlansInvoices;