import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import styled from 'styled-components';

const ServiceImg = styled.div`
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
    }
`
const ServiceData = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const ServiceHead = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.default};
    margin-bottom: 0px;
`
const ServiceStatus= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 10px;
    border-radius: 12px;
    color: ${({theme})=>theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    background-color: ${ ( { theme } ) => theme.palette.success.main};
`




function createData(name, calories, fat, carbs, protein, price, location, tags, actions) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        location,
        tags,
        actions,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3,  305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9, 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0, 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0,  159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5,  408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3,  237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0,  375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0, 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0,  392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0,  318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0, 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0, 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


const headCells = [
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'image',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'name',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'location',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'category',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'price',
    },
    {
        id: 'discountPrice',
        numeric: false,
        disablePadding: false,
        label: 'price after discount',
    },
    {
        id: 'assignEmployee',
        numeric: false,
        disablePadding: false,
        label: 'assign emploee',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'status',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'actions',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy,  onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <ServiceHead>
                                {headCell.label}
                            </ServiceHead>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};




function ServicesTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2,  }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice().sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                <ServiceImg>
                                                    <img src={row.image} alt=""/>
                                                </ServiceImg>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    {row.calories}
                                                </ServiceData>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    {row.fat}
                                                </ServiceData>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    {row.carbs}
                                                </ServiceData>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    {row.protein}
                                                </ServiceData>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    {row.calories}
                                                </ServiceData>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    {row.fat}
                                                </ServiceData>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    <ServiceStatus>
                                                        active
                                                    </ServiceStatus>
                                                </ServiceData>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ServiceData>
                                                    {row.protein}
                                                </ServiceData>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
export default ServicesTable;