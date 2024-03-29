import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { TableData, TableDate, TableImg, TableStatus } from '../../../../../../components/UI/Dashboard/Table/Table';
import { formatCurrency } from '../../../../../../shared/utility';
import { useTranslation } from 'react-i18next';


const EnhancedTableBody = props => {

    const {t} = useTranslation()

    const { fetchedDeals, emptyRows, deleteModalOpenHandler, editModalOpenHandler, viewModalOpenHandler } = props;


    return (
        <TableBody>
            {fetchedDeals.data.map((row, index) => {
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
                                {row.title}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableDate>
                                <li><EventNoteIcon sx={{ mr: 1 }} />{row.formattedDate.startDate}</li>
                            </TableDate>
                        </TableCell>
                        <TableCell align="center">
                            <TableDate>
                                <li><EventNoteIcon sx={{ mr: 1 }} />{row.formattedDate.endDate}</li>
                            </TableDate>
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
                            <TableData>
                                {row.location.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableStatus className={row.status} >{t(row.status)}</TableStatus>
                        </TableCell>
                        <TableCell align="center">
                            <Actions remove view edit
                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                editHandler={editModalOpenHandler.bind(null, row.id)}
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
