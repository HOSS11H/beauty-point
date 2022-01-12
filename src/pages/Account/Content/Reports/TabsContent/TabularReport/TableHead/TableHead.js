import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';

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

    return (
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
    );
}

export default EnhancedTableHead;