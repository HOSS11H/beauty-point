import { Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next"
import { formatCurrency } from "../../../../../shared/utility";
import { Fragment } from "react";

const CurrentPlan = ({ plan }) => {

    const { t } = useTranslation()

    return (
        <Fragment>
            <Typography sx={{ marginBottom: 5 }} variant="h5" component="div">
                {`${t("Your Current Plan is : ")} ${plan.name}`}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">{t('max employees')}</TableCell>
                            <TableCell align="left">{plan.max_employees}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">{t('max services')}</TableCell>
                            <TableCell align="left">{plan.max_services}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">{t('max deals')}</TableCell>
                            <TableCell align="left">{plan.max_deals}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">{t('max roles')}</TableCell>
                            <TableCell align="left">{plan.max_roles}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">{t('monthly price')}</TableCell>
                            <TableCell align="left">{formatCurrency(plan.monthly_price)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">{t('annual price')}</TableCell>
                            <TableCell align="left">{formatCurrency(plan.annual_price)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}
export default CurrentPlan