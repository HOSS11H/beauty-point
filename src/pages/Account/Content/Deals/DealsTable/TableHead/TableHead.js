import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';

import { TableHeading } from '../../../../../../components/UI/Dashboard/Table/Table';

const headCells = [
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'image',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'name',
    },
    {
        id: 'starts-at',
        numeric: false,
        disablePadding: false,
        label: 'starts at',
    },
    {
        id: 'ends-at',
        numeric: false,
        disablePadding: false,
        label: 'ends at',
    },
    {
        id: 'originalPrice',
        numeric: false,
        disablePadding: false,
        label: 'original price',
    },
    {
        id: 'dealPrice',
        numeric: false,
        disablePadding: false,
        label: 'deal price',
    },
    {
        id: 'dealUsage',
        numeric: false,
        disablePadding: false,
        label: 'deal usage',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'location',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'status',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'actions',
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