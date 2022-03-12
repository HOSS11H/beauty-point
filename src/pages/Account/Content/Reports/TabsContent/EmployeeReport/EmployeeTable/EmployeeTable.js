import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';
import { TableData, TableHeading } from '../../../../../../../components/UI/Dashboard/Table/Table';
import { TableBody, Table } from '@mui/material';
import styled from 'styled-components';
import { formatCurrency } from '../../../../../../../shared/utility';

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
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'type',
    },
    {
        id: 'quantity',
        numeric: false,
        disablePadding: false,
        label: 'quantity',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'price',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'amount',
    },
];

const ItemType = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    padding: 0 15px;
    border-radius: 6px;
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.common.white};
    &.service {
        background-color: ${({ theme }) => theme.palette.info.main};
    }
    &.product {
        background-color: ${({ theme }) => theme.palette.secondary.main};
    }
    &.deal {
        background-color: ${({ theme }) => theme.palette.success.main};
    }
`

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
                                    {index + 1}
                                </TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>
                                    {row.item.name}
                                </TableData>
                            </TableCell>
                            <TableCell align="center">
                                <ItemType className={row.item.type}>{t(row.item.type)}</ItemType>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>{row.quantity}</TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>{formatCurrency(row.price)}</TableData>
                            </TableCell>
                            <TableCell align="center">
                                <TableData>{formatCurrency(row.amount)}</TableData>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
export default EmployeeTable;