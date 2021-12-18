import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableData } from '../../../../../../../components/UI/Dashboard/Table/Table';
import Actions from '../../../../../../../components/UI/Dashboard/Actions/Actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { formatCurrency } from '../../../../../../../shared/utility';
import Increment from '../../../../../../../components/UI/Increment/Increment';



const CartItem = props => {

    const { t } = useTranslation()


    const { row, remove, increase, decrease } = props;

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <TableData>{row.name}</TableData>
            </TableCell>
            <TableCell align="center">
                <TableData>{formatCurrency(row.price)}</TableData>
            </TableCell>
            <TableCell align="center">
                <Increment id={row.id}  increment={increase} decrement={decrease} value={row.quantity} />
            </TableCell>
            <TableCell align="center">
                <TableData>{formatCurrency(row.discount)}</TableData>
            </TableCell>
            <TableCell align="center">
                <TableData>{formatCurrency(row.quantity * row.price)}</TableData>
            </TableCell>
            <TableCell align="center">
                <Actions remove
                    removeHandler={(id) => remove( row.id)}
                />
            </TableCell>
        </TableRow>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedEmployees: state.employees.employees,
    }
}

export default connect(mapStateToProps, null)(CartItem);