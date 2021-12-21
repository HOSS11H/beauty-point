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
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'category',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'amount',
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
        label: 'date',
    },
    {
        id: 'agent',
        numeric: false,
        disablePadding: false,
        label: 'agent',
    },
    {
        id: 'bank',
        numeric: false,
        disablePadding: false,
        label: 'bank',
    },
    {
        id: 'account',
        numeric: false,
        disablePadding: false,
        label: 'account',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'action',
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