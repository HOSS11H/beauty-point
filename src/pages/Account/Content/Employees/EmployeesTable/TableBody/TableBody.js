import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';


const TableInfos = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 10px;
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    background-color: ${({ theme }) => theme.palette.primary.dark};
    margin-right: 10px;
    margin-bottom: 10px;
`

const EnhancedTableBody = props => {

    const { t } = useTranslation()

    const {fetchedEmployees, emptyRows, deleteModalOpenHandler, editModalOpenHandler} = props;


    return (
        <TableBody>
            {fetchedEmployees.data.map((row, index) => {
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
                                {row.mobile}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            {
                                row.employeeGroup && (
                                    <TableInfos >
                                        {row.employeeGroup.name}
                                    </TableInfos>
                                )
                            }
                        </TableCell>
                        <TableCell align="center">
                            { 
                                row.roles && (
                                    row.roles.map((role, index) => {
                                        return (
                                            <TableInfos key={role.id} className='active'>{t(role.name)}</TableInfos>
                                        )
                                    })
                                )
                            }
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
                        height: (73) * emptyRows,
                    }}
                >
                    <TableCell colSpan={9} />
                </TableRow>
            )}
        </TableBody>
    )
}
export default EnhancedTableBody;