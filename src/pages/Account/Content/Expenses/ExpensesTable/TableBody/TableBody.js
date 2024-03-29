

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';

import { formatCurrency } from '../../../../../../shared/utility';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver'
import { useCallback } from 'react';
import moment from 'moment';


const EnhancedTableBody = props => {

    const { fetchedExpenses, editExpenseHandler, deleteExpenseHandler } = props;

    const downloadImage = useCallback((val) => {
        saveAs(val, '') // Put your image url here.
    }, [])

    return (
        <TableBody>
            {fetchedExpenses.data.map((row, index) => {
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
                            <TableData>
                                - {formatCurrency(row.amount)}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {row.category.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{moment(row.expense_date).format( 'YYYY-MM-DD')}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.customer.name}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.bank?.name}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.bank?.account}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            {
                                row.expense_image_url && (
                                    <IconButton aria-label="delete" onClick={downloadImage.bind( null ,row.expense_image_url)} >
                                        <DownloadIcon />
                                    </IconButton>
                                )
                            }
                        </TableCell>
                        <TableCell align="center">
                            <Actions edit remove
                                editHandler={editExpenseHandler.bind(null, row.id)}
                                removeHandler={deleteExpenseHandler.bind(null, row.id)}
                            />
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    )
}
export default EnhancedTableBody;