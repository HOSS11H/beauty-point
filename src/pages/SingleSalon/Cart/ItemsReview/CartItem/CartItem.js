import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableData } from '../../../../../components/UI/Dashboard/Table/Table';
import Actions from '../../../../../components/UI/Dashboard/Actions/Actions';



const CartItem = props => {

    const { row, remove, type } = props;

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" sx={{ padding: '16px 8px' }} scope="row">
                <TableData>{row.name}</TableData>
            </TableCell>
            <TableCell align="center" sx={{ padding: '16px 8px' }}>
                <Actions remove
                    removeHandler={(id) => remove(type, row.id)}
                />
            </TableCell>
        </TableRow>
    )
}


export default CartItem;