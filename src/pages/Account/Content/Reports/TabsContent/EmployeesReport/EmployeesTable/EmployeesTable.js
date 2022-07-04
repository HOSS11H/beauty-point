import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';
import { TableData, TableHeading } from '../../../../../../../components/UI/Dashboard/Table/Table';
import { TableBody, Table, Card, Grid } from '@mui/material';
import styled from 'styled-components';
import { formatCurrency } from '../../../../../../../shared/utility';

const headCells = [
    {
        id: 'employee-name',
        numeric: false,
        disablePadding: false,
        label: 'employee name',
    },
    {
        id: 'services-number',
        numeric: false,
        disablePadding: false,
        label: 'services number',
    },
    {
        id: 'total-services',
        numeric: false,
        disablePadding: false,
        label: 'total services',
    },
    {
        id: 'employee-percentage',
        numeric: false,
        disablePadding: false,
        label: 'employee percentage',
    },
];

const EmployeeInfo = styled.div`
    margin-top: 25px;
    p {
        display: flex;
        align-items: center;
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        span {
            display: inline-block;
            margin-left: 15px;
        }
    }
`
const CustomCard = styled(Card)`
    padding: 20px;
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

const EmployeesTable = props => {

    const { data, dateFrom, dateTo, timeFrom, timeTo } = props;

    const { t } = useTranslation()

    return (
        <CustomCard>
            <CardHead>
                <h4>خلود</h4>
                <h3>{t('Employees Report')}</h3>
                <h4>مارش صالون</h4>
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
                    <Grid item xs={12} sm={6}>
                        <p>
                            <span>{t('Time ')}</span>
                            <span>{t(' From: ')}</span>
                            <span>{timeFrom.format('hh:MM A')}</span>
                            <span>{t(' - To: ')}</span>
                            <span>{timeTo.format('hh:MM A')}</span>
                        </p>
                    </Grid>
                </Grid>
            </CardDate>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size='medium'
            >
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align='center'
                            >
                                <TableHeading>
                                    {t(headCell.label)}
                                </TableHeading>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => {
                        return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={index}
                            >
                                <TableCell align="center">
                                    <TableData>
                                        {row.name}
                                    </TableData>
                                </TableCell>
                                <TableCell align="center">
                                    <TableData>{row.services_number}</TableData>
                                </TableCell>
                                <TableCell align="center">
                                    <TableData>{row.total_services}</TableData>
                                </TableCell>
                                <TableCell align="center">
                                    <TableData>{`${formatCurrency(row.employee_amount)} (${row.employee_percentage} %)`}</TableData>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow>
                        <TableCell align="center" component="th" scope="row" sx={{ fontWeight: 700 }}>
                            {t('total')}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>{
                            data.reduce((acc, curr) => {
                                return acc + curr.services_number
                            }, 0)
                        }</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>{
                            data.reduce((acc, curr) => {
                                return acc + curr.total_services
                            }, 0)
                        }</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>{
                            data.reduce((acc, curr) => {
                                return acc + curr.employee_amount
                            }, 0)
                        }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <EmployeeInfo>
                <p>
                    خلود
                    <span>(  150 )</span>
                </p>
            </EmployeeInfo>
        </CustomCard>
    );
}
export default EmployeesTable;
