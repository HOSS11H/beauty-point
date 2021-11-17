import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData, TableEmployees, TableImg, TableStatus } from '../../../../../../components/UI/Dashboard/Table/Table';


const EnhancedTableBody = props => {

    const {fetchedServices, emptyRows, deleteModalOpenHandler, viewModalOpenHandler, editModalOpenHandler } = props;

    return (
        <TableBody>
            {fetchedServices.data.map((row, index) => {
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
                                <img src={row.service_image_url} alt="" />
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
                                {row.category.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {row.formated_price}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {row.formated_discounted_price}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableEmployees>
                                {
                                    row.users.map((employee, index) => {
                                        let loadedEmployees;
                                        if (employee) {
                                            loadedEmployees = (
                                                <li key={employee.id}>{employee.name}</li>
                                            )
                                        }
                                        return loadedEmployees;
                                    })
                                }
                            </TableEmployees>
                        </TableCell>
                        <TableCell align="center">
                            <TableStatus>{row.status}</TableStatus>
                        </TableCell>
                        <TableCell align="center">
                            <Actions edit remove view
                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                viewHandler={viewModalOpenHandler.bind(null, row.id)}
                                editHandler={editModalOpenHandler.bind(null, row.id)}
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