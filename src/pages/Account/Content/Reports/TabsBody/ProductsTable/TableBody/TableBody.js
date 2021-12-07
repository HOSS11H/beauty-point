import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData, TableImg, TableStatus } from '../../../../../../components/UI/Dashboard/Table/Table';
import { formatCurrency } from '../../../../../../shared/utility';


const EnhancedTableBody = props => {

    const {fetchedProducts, emptyRows, deleteModalOpenHandler, viewModalOpenHandler, editModalOpenHandler} = props;


    return (
        <TableBody>
            {fetchedProducts.data.map((row, index) => {
                const labelId = `enhanced-table-Image-${index}`;
                return (
                    <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                    >
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                        >
                            <TableImg>
                                <img src={row.image} alt="" />
                            </TableImg>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {row.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {row.location.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {formatCurrency(row.price)}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {formatCurrency(row.discount_price)}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableStatus className={row.status}>{row.status}</TableStatus>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.quantity}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <Actions edit remove view
                                editHandler={editModalOpenHandler.bind(null, row.id)}
                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                viewHandler={viewModalOpenHandler.bind(null, row.id)}
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