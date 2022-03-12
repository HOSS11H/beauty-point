import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';
import { TableData, TableHeading } from '../../../../../../../components/UI/Dashboard/Table/Table';
import { TableBody, Table } from '@mui/material';

const headCells = [
    {
        id: 'index',
        numeric: false,
        disablePadding: false,
        label: '#',
    },
    {
        id: 'service_name',
        numeric: false,
        disablePadding: false,
        label: 'service name',
    },
    {
        id: 'sales',
        numeric: false,
        disablePadding: false,
        label: 'sales',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'amount',
    },
    {
        id: 'paid_on',
        numeric: false,
        disablePadding: false,
        label: 'paid on',
    },
];

const EmployeeTable = props => {

    const { data } = props;

    const { t } = useTranslation()

    return (
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
                                    {index +1}
                                </TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>
                                    {row.service_name}
                                </TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>{row.sales}</TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>{row.amount}</TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>{row.paid_on}</TableData>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
export default EmployeeTable;