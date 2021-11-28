import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';
import { useState, useEffect } from 'react';
import Increment from './Increment/Increment';

const CartItem = props => {

    
    const { row, remove, increase, decrease, type } = props;
    


    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <TableData>{row.name}</TableData>
            </TableCell>
            <TableCell align="center">
                <TableData>{row.price}</TableData>
            </TableCell>
            <TableCell align="center">
                <TableData>{row.quantity}</TableData>
            </TableCell>
            <TableCell align="center">
                <Increment id={row.id} type={type} increment={increase}  decrement={() => {}} value={row.quantity} />
            </TableCell>
            <TableCell align="center">
                <Actions remove
                    removeHandler={(id) =>  remove(type, row.id) }
                />
            </TableCell>
        </TableRow>
    )
}

export default CartItem;