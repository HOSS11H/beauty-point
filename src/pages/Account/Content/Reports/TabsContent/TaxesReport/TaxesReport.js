import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../shared/utility';
import SearchFilters from './SearchFilters/SearchFilters';

const TaxesReport = props => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <SearchFilters perPage={15} handleFilters={() => {}} />
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
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('sales to citizens ( private health services / national private education')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('current sales that goes under zero percentage')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('exports')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('forgiven sales')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('total')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
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
                                {t('sales under main perecntage in KSA')}
                            </TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('sales to citizens ( private health services / national private education')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('current sales that goes under zero percentage')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('exports')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('forgiven sales')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('total')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
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
                                {t('sales under main perecntage in KSA')}
                            </TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('sales to citizens ( private health services / national private education')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('current sales that goes under zero percentage')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('exports')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('forgiven sales')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{t('total')}</TableCell>
                            <TableCell>{formatCurrency(15.00)}</TableCell>
                            <TableCell>{formatCurrency(3520572)}</TableCell>
                            <TableCell>{formatCurrency(7270442)}</TableCell>
                            <TableCell>{formatCurrency(130000)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}
export default TaxesReport;