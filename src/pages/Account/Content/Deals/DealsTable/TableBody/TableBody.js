import styled from 'styled-components';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WatchLaterIcon from '@mui/icons-material/WatchLater';


const DealImg = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`
const DealData = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const DealStatus = styled.div`
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
    background-color: ${({ theme }) => theme.palette.success.main};
`
const TableDate = styled.ul`
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
            width: 20px;
            height: 20px;
        }
    }
`


const EnhancedTableBody = props => {

    const { fetchedDeals, emptyRows, deleteModalOpenHandler } = props;


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
                            <DealImg>
                                <img src={row.deal_image_url} alt="" />
                            </DealImg>
                        </TableCell>
                        <TableCell align="center">
                            <DealData>
                                {row.title}
                            </DealData>
                        </TableCell>
                        <TableCell align="center">
                            <TableDate>
                                <li><EventNoteIcon sx={{ mr: 1 }} />{row.formattedDate.startDate}</li>
                                <li><WatchLaterIcon sx={{ mr: 1 }} />{row.formattedTime.startTime}</li>
                            </TableDate>
                        </TableCell>
                        <TableCell align="center">
                            <TableDate>
                                <li><EventNoteIcon sx={{ mr: 1 }} />{row.formattedDate.endDate}</li>
                                <li><WatchLaterIcon sx={{ mr: 1 }} />{row.formattedTime.endTime}</li>
                            </TableDate>
                        </TableCell>
                        <TableCell align="center">
                            <DealData>
                                {row.formated_original_amount}
                            </DealData>
                        </TableCell>
                        <TableCell align="center">
                            <DealData>
                                {row.formated_deal_amount}
                            </DealData>
                        </TableCell>
                        <TableCell align="center">
                            <DealData>{row.quantity}</DealData>
                        </TableCell>
                        <TableCell align="center">
                            <DealData>
                                {row.location.name}
                            </DealData>
                        </TableCell>
                        <TableCell align="center">
                            <DealStatus>{row.status}</DealStatus>
                        </TableCell>
                        <TableCell align="center">
                            <Actions edit remove view
                                editHandler={() => { }}
                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                viewHandler={() => { }}
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