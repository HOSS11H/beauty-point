import { useContext, useEffect, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchExpensesCustomers, deleteExpenseCustomer, updateExpenseCustomer } from '../../../../../../store/actions/index';
import ThemeContext from '../../../../../../store/theme-context';
import EnhancedTableHead from './TableHead/TableHead';
import EnhancedTableBody from './TableBody/TableBody';
import { useTranslation } from 'react-i18next';
import SearchMessage from "../../../../../../components/Search/SearchMessage/SearchMessage";
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useCallback } from 'react';
import TablePaginationActions from '../../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import EditModal from './EditModal/EditModal';

const ExpenseCustomersWrapper = styled(Card)`
    display: flex;
    max-width: 100%;
    min-height: 100px;
    box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
    margin-bottom: 40px;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius:20px;
    flex-direction: column;
    padding-bottom: 20px;
    padding: 30px 20px;
    &:last-child{
        margin-bottom:0;
    }
    .MuiPaper-root {
        border-radius: 0;
        border-radius:20px;
        bakground-color: transparent;
        box-shadow: none;
    }
`
const TablePaginationWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Loader = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 50vh;
    flex-grow: 1;
`

const intialPerPage = 10;

function ExpenseCustomers(props) {

    const { t } = useTranslation()

    const { fetchedExpensesCustomers,fetchingExpensesCustomers, fetchExpensesCustomersHandler, searchingExpensesCustomersSuccess, deleteExpenseCustomerHandler, updateExpenseCustomerHandler } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedExpenseCustomer, setSelectedExpenseCustomer] = useState(null);

    useEffect(() => {
        fetchExpensesCustomersHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesCustomersHandler, page, rowsPerPage]);


    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);
    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }, []);

    // Delete Modal
    const deleteModalOpenHandler = useCallback((id) => {
        setDeleteModalOpened(true);
        setSelectedExpenseCustomer(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedExpenseCustomer(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteExpenseCustomerHandler( id);
        setDeleteModalOpened(false);
        setSelectedExpenseCustomer(null);
    }, [deleteExpenseCustomerHandler])
    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedExpenseCustomer(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedExpenseCustomer(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        setEditModalOpened(false);
        setSelectedExpenseCustomer(null);
        updateExpenseCustomerHandler(data);
    }, [updateExpenseCustomerHandler])

    let content = (
        <Fragment>
            <Paper sx={{ width: '100%', boxShadow: 'none',  }}>
                <TableContainer>
                    <TablePaginationWrapper>
                        <FormControl sx={{ minWidth: '75px', }} variant="filled" >
                            <InputLabel id="show-num">{t('show')}</InputLabel>
                            <Select
                                labelId="show-num"
                                id="show-num-select"
                                value={rowsPerPage}
                                label={t('show')}
                                onChange={handlePerPageChange}
                            >
                                <MenuItem value='all'>{t('all')}</MenuItem>
                                <MenuItem value='5'>{t('5')}</MenuItem>
                                <MenuItem value='10'>{t('10')}</MenuItem>
                                <MenuItem value='15'>{t('15')}</MenuItem>
                                <MenuItem value='20'>{t('20')}</MenuItem>
                            </Select>
                        </FormControl>
                    </TablePaginationWrapper>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            rowCount={fetchedExpensesCustomers.data.length}
                        />
                        <EnhancedTableBody
                            fetchedExpensesCustomers={fetchedExpensesCustomers}
                            editExpenseCustomerHandler={editModalOpenHandler}
                            deleteExpenseCustomerHandler={deleteModalOpenHandler}
                        />
                    </Table>
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            sx= {{ width: '100%'}}
                            component="div"
                            count={fetchedExpensesCustomers.data.length}
                            total={fetchedExpensesCustomers.meta ? fetchedExpensesCustomers.meta.total : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={fetchingExpensesCustomers}
                        />
                    )}
                </TableContainer>
                <DeleteModal show={deleteModalOpened} id={selectedExpenseCustomer}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedExpenseCustomer)}
                    heading='Do you want To delete this agent?' confirmText='delete' />
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedExpenseCustomer} fetchedExpensesCustomers={fetchedExpensesCustomers}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit agent details' confirmText='edit' />
                    )
                }
            </Paper>
        </Fragment>
    ) 
    if ( fetchedExpensesCustomers.data.length === 0 && searchingExpensesCustomersSuccess) {
        content = (
            <SearchMessage>
                {t('no results')}
            </SearchMessage>
        )
    } else if (fetchingExpensesCustomers) {
        content = (
            <Loader>
                <CircularProgress color="secondary" />
            </Loader>
        )
    }

    return (
        <ExpenseCustomersWrapper>
            {content}
        </ExpenseCustomersWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedExpensesCustomers: state.expenses.expensesCustomers,
        fetchingExpensesCustomers: state.expenses.fetchingExpensesCustomers,
        searchingExpensesCustomersSuccess: state.expenses.searchingExpensesCustomersSuccess,
        creatingExpenseCustomerSuccess: state.expenses.creatingExpenseCustomerSuccess,
        updatingExpenseCustomerSuccess: state.expenses.updatingExpenseCustomerSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExpensesCustomersHandler: (lang, page, rowsPerPage ) => dispatch(fetchExpensesCustomers(lang, page, rowsPerPage)),
        deleteExpenseCustomerHandler: (id) => dispatch(deleteExpenseCustomer(id)),
        updateExpenseCustomerHandler: (data) => dispatch(updateExpenseCustomer(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCustomers);