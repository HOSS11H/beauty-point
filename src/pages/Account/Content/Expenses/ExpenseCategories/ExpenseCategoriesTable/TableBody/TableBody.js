

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData } from '../../../../../../../components/UI/Dashboard/Table/Table';

import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../../shared/utility';
import Actions from '../../../../../../../components/UI/Dashboard/Actions/Actions';



const EnhancedTableBody = props => {

    const { fetchedExpensesCategories, editExpenseCategoryHandler, deleteExpenseCategoryHandler } = props;

    const { t } = useTranslation();


    return (
        <TableBody>
            {fetchedExpensesCategories.data.map((row, index) => {
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
                                {row.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <Actions edit remove
                                editHandler={editExpenseCategoryHandler.bind(null, row.id)}
                                removeHandler={deleteExpenseCategoryHandler.bind(null, row.id)}
                            />
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    )
}
export default EnhancedTableBody;