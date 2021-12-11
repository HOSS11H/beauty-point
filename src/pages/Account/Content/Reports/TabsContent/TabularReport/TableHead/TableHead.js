import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';

import { TableHeading } from '../../../../../../../components/UI/Dashboard/Table/Table';

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
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'booking date',
    },
    {
        id: 'time',
        numeric: false,
        disablePadding: false,
        label: 'booking time',
    },
    {
        id: 'item',
        numeric: false,
        disablePadding: false,
        label: 'item',
    },
    {
        id: 'employee',
        numeric: false,
        disablePadding: false,
        label: 'employee',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'status',
    },
    {
        id: 'taxes',
        numeric: false,
        disablePadding: false,
        label: 'total taxes',
    },
    {
        id: 'total',
        numeric: false,
        disablePadding: false,
        label: 'total amount',
    },
];




function EnhancedTableHead(props) {

    const { t } = useTranslation()

    const { order, orderBy, onRequestSort, loading } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <TableHeading>
                                {t(headCell.label)}
                            </TableHeading>
                            {loading && orderBy === headCell.id &&<CircularProgress sx={{ ml: 1 }} size={14} />}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;