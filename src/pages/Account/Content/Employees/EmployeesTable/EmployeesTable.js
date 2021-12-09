import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchEmployeesData, updateEmployeeData, deleteEmployeeData } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from '../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import ViewModal from './ViewModal/ViewModal';
import EditModal from './EditModal/EditModal';
import EnhancedTableBody from './TableBody/TableBody';
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import { useTranslation } from 'react-i18next';

const EmployeesTableWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    max-width: 100%;
    box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
    margin-bottom: 40px;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius:20px;
    &:last-child{
        margin-bottom:0;
    }
    .MuiPaper-root {
        border-radius: 0;
        border-radius:20px;
        padding: 20px;
    }
`



const intialRowsPerPage = 5;

function EmployeesTable(props) {

    const { t } = useTranslation()

    const { fetchedEmployees, fetchEmployeesHandler, loadingEmployees, deleteEmployeeHandler, searchingEmployees, searchingEmployeesSuccess, updateEmployeeHandler } = props;

    console.log(fetchedEmployees)

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('name');

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    useEffect(() => {
        fetchEmployeesHandler(lang, page, rowsPerPage, orderBy, order);
    }, [fetchEmployeesHandler, lang, page, rowsPerPage, orderBy, order]);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Delete Modal
    const deleteModalOpenHandler = useCallback((id) => {
        setDeleteModalOpened(true);
        setSelectedEmployeeId(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedEmployeeId(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteEmployeeHandler( id);
        setDeleteModalOpened(false);
        setSelectedEmployeeId(null);
    }, [deleteEmployeeHandler])
    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setViewModalOpened(true);
        setSelectedEmployeeId(id);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedEmployeeId(null);
    }, [])

    const viewModalConfirmHandler = useCallback((id) => {
        setViewModalOpened(false);
        setEditModalOpened(true);
    }, [])

    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedEmployeeId(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedEmployeeId(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        setEditModalOpened(false);
        setSelectedEmployeeId(null);
        updateEmployeeHandler(data);
    }, [updateEmployeeHandler])


    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedEmployees.data.length);


    let content;

    if (fetchedEmployees.data.length === 0 && searchingEmployeesSuccess && !searchingEmployees) {
        content = (
            <SearchMessage>
                {t('No Employees Found')}
            </SearchMessage>
        )
    } else {
        content = (
            <Fragment>
                <Paper sx={{ width: '100%', boxShadow: 'none' }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <EnhancedTableHead
                                rowCount={fetchedEmployees.data.length}
                                onRequestSort={handleRequestSort}
                                order={order}
                                orderBy={orderBy}
                                loading={loadingEmployees}
                            />
                            <EnhancedTableBody
                                fetchedEmployees={fetchedEmployees}
                                emptyRows={emptyRows}
                                deleteModalOpenHandler={deleteModalOpenHandler}
                                viewModalOpenHandler={viewModalOpenHandler}
                                editModalOpenHandler={editModalOpenHandler}
                            />
                        </Table>
                    </TableContainer>
                    <TablePaginationActions
                        component="div"
                        count={fetchedEmployees.data.length}
                        total={fetchedEmployees.meta ? fetchedEmployees.meta.total : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={loadingEmployees}
                    />
                </Paper>
                <DeleteModal show={deleteModalOpened} id={selectedEmployeeId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedEmployeeId)}
                    heading='Do you want To delete this employee?' confirmText='delete' />
                <ViewModal show={viewModalOpened} id={selectedEmployeeId} fetchedEmployees={fetchedEmployees}
                    onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedEmployeeId)}
                    heading='view employee details' confirmText='edit' />
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedEmployeeId} fetchedEmployees={fetchedEmployees}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit employee details' confirmText='edit' />
                    )
                }
            </Fragment>
        )
    }

    return (
        <EmployeesTableWrapper>
            {content}
        </EmployeesTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedEmployees: state.employees.employeesData.employees,
        loadingEmployees: state.employees.employeesData.fetchingEmployees,
        searchingEmployees: state.employees.employeesData.searchingEmployees,
        searchingEmployeesSuccess: state.employees.employeesData.searchingEmployeesSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEmployeesHandler: (language, page, perPage, orderBy, order) => dispatch(fetchEmployeesData(language, page, perPage, orderBy, order)),
        deleteEmployeeHandler: ( id) => dispatch(deleteEmployeeData(id)),
        updateEmployeeHandler: (data) => dispatch(updateEmployeeData(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesTable);