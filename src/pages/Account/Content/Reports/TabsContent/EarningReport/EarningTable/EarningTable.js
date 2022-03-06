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
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'name',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'amount',
    },
];

const EarningTable = props => {

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
                                    {row.id}
                                </TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>
                                    {row.username}
                                </TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>{row.amount_to_pay}</TableData>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
export default EarningTable;