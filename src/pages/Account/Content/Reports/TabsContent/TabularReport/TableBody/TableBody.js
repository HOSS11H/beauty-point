

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableData } from '../../../../../../../components/UI/Dashboard/Table/Table';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const TableStatus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    padding: 5px 10px;
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    background-color: ${({ theme }) => theme.palette.error.main};
    &.pending {
        background-color: ${({ theme }) => theme.palette.secondary.dark};
    }
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
        /*! @noflip */
        direction: ${ ( {theme}  ) => theme.direction === 'rtl' ?  'ltr' :  'ltr' };
    }
`


const EnhancedTableBody = props => {

    const { fetchedTabularReport } = props;

    const { t } = useTranslation();


    return (
        <TableBody>
            {fetchedTabularReport.data.map((row, index) => {
                const fetchedItems = row.items && row.items.split(',')
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
                                {row.customer_name}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {moment(row.booking_date).format("YYYY-MM-DD")}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>
                                {moment(row.booking_time).format("hh:mm a")}
                            </TableData>
                        </TableCell>
                        <TableCell align="center">
                            <Items>
                                {
                                    fetchedItems && (
                                        fetchedItems.map((item, index) => {
                                            let loadedItems;
                                            if (item !== '') {
                                                loadedItems = (
                                                    <li key={index} >
                                                        <FiberManualRecordIcon sx={{ mr: 1 }} />
                                                        <span>{item}</span>
                                                    </li>
                                                )
                                            }
                                            return loadedItems
                                        })
                                    )
                                }
                            </Items>
                        </TableCell>
                        <TableCell align="center">
                            <TableStatus className={row.booking_status}>{t(row.booking_status)}</TableStatus>
                        </TableCell>
                        <TableCell align="center">
                            <TableData>{row.tax}</TableData>
                        </TableCell>
                        <TableCell align="center">
                            <TableData style= { {display: 'flex'} } >{row.payment_status === 'completed' ? <CheckCircleIcon sx={{ mr: 1, color: '#568d00' }} /> : <PendingIcon sx={{ mr: 1, color: '#f9b904' }} />}{row.amount}</TableData>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    )
}
export default EnhancedTableBody;
