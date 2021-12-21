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
import { fetchExpenses, deleteExpense, updateExpense } from '../../../../../../store/actions/index';
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

const CategoriesWrapper = styled(Card)`
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

const intialPerPage = 15;

function Categories(props) {

    const { t } = useTranslation()

    const { fetchedExpenses,fetchingExpenses, fetchExpensesHandler, searchingExpensesSuccess, deleteExpenseHandler, creatingExpenseSuccess, updateExpenseHandler, updatingExpenseSuccess } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        fetchExpensesHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesHandler, page, rowsPerPage]);
    
    useEffect(() => {
        creatingExpenseSuccess && fetchExpensesHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesHandler, page, rowsPerPage, creatingExpenseSuccess]);
    useEffect(() => {
        updatingExpenseSuccess && fetchExpensesHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesHandler, page, rowsPerPage, creatingExpenseSuccess, updatingExpenseSuccess]);


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
        setSelectedExpense(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedExpense(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteExpenseHandler( id);
        setDeleteModalOpened(false);
        setSelectedExpense(null);
    }, [deleteExpenseHandler])
    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedExpense(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedExpense(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        setEditModalOpened(false);
        setSelectedExpense(null);
        updateExpenseHandler(data);
    }, [updateExpenseHandler])

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
                            rowCount={fetchedExpenses.data.length}
                        />
                        <EnhancedTableBody
                            fetchedExpenses={fetchedExpenses}
                            editExpenseHandler={editModalOpenHandler}
                            deleteExpenseHandler={deleteModalOpenHandler}
                        />
                    </Table>
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            sx= {{ width: '100%'}}
                            component="div"
                            count={fetchedExpenses.data.length}
                            total={fetchedExpenses.meta ? fetchedExpenses.meta.total : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={fetchingExpenses}
                        />
                    )}
                </TableContainer>
                <DeleteModal show={deleteModalOpened} id={selectedExpense}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedExpense)}
                    heading='Do you want To delete this expense?' confirmText='delete' />
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedExpense} fetchedExpenses={fetchedExpenses}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit product details' confirmText='edit' />
                    )
                }
            </Paper>
        </Fragment>
    ) 
    if ( fetchedExpenses.data.length === 0 && searchingExpensesSuccess) {
        content = (
            <SearchMessage>
                {t('no results')}
            </SearchMessage>
        )
    } else if (fetchingExpenses) {
        content = (
            <Loader>
                <CircularProgress color="secondary" />
            </Loader>
        )
    }

    return (
        <CategoriesWrapper>
            {content}
        </CategoriesWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedExpenses: state.expenses.expenses,
        fetchingExpenses: state.expenses.fetchingExpenses,
        searchingExpensesSuccess: state.expenses.searchingExpensesSuccess,
        creatingExpenseSuccess: state.expenses.creatingExpenseSuccess,
        updatingExpenseSuccess: state.expenses.updatingExpenseSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExpensesHandler: (lang, page, rowsPerPage ) => dispatch(fetchExpenses(lang, page, rowsPerPage)),
        deleteExpenseHandler: (id) => dispatch(deleteExpense(id)),
        updateExpenseHandler: (data) => dispatch(updateExpense(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Categories);