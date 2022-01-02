import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';
import { useTranslation } from 'react-i18next';

const EnhancedTableBody = props => {

    const { t } = useTranslation()

    const {fetchedUnits, emptyRows, deleteModalOpenHandler, editModalOpenHandler} = props;


    return (
        <TableBody>
            {fetchedUnits.data.map((row, index) => {
                return (
                    <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                    >
                        <TableCell align="center">
                            <TableData>
                                {row.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {t(row.type)}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {`${row.unit_quantity} ${row.parent ? row.parent.name : ''}`}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <Actions edit remove
                                editHandler={editModalOpenHandler.bind(null, row.id)}
                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                            />
                        </TableCell>
                    </TableRow>
                );
            })}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: (133) * emptyRows,
                    }}
                >
                    <TableCell colSpan={9} />
                </TableRow>
            )}
        </TableBody>
    )
}
export default EnhancedTableBody;