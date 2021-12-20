

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../../shared/utility';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

const TableStatus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 10px;
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    background-color: ${({ theme }) => theme.palette.error.main};
    &.in.progress {
        background-color: ${({ theme }) => theme.palette.warning.light};
    }
    &.canceled {
        background-color: ${({ theme }) => theme.palette.error.main};
    }
    &.approved {
        background-color: ${({ theme }) => theme.palette.primary.main};
    }
    &.completed {
        background-color: ${({ theme }) => theme.palette.success.main};
    }
`

const Items = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 14px;
            height: 14px;
            color: ${({ theme }) => theme.vars.primary};
        }
        .divider {
            margin: 0 5px;
        }
    }
`


const EnhancedTableBody = props => {

    const { fetchedExpenses, editExpenseHandler, deleteExpenseHandler } = props;

    const { t } = useTranslation();


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
                                {row.category.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                - {formatCurrency(row.amount)}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {row.name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.expense_date}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.customer.name}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.bank_name}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.bank_account}</TableData>
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