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
import { fetchExpensesCategories, deleteExpenseCategory, updateExpenseCategory } from '../../../../../../store/actions/index';
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

const ExpenseCategoriesWrapper = styled(Card)`
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

function ExpenseCategories(props) {

    const { t } = useTranslation()

    const { fetchedExpensesCategories,fetchingExpensesCategories, fetchExpensesCategoriesHandler, searchingExpensesCategoriesSuccess, deleteExpenseCategoryHandler, creatingExpenseCategorySuccess, updateExpenseCategoryHandler, updatingExpenseCategorySuccess } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedExpenseCategory, setSelectedExpenseCategory] = useState(null);

    useEffect(() => {
        fetchExpensesCategoriesHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesCategoriesHandler, page, rowsPerPage]);
    
    useEffect(() => {
        creatingExpenseCategorySuccess && fetchExpensesCategoriesHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesCategoriesHandler, page, rowsPerPage, creatingExpenseCategorySuccess]);
    useEffect(() => {
        updatingExpenseCategorySuccess && fetchExpensesCategoriesHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesCategoriesHandler, page, rowsPerPage, creatingExpenseCategorySuccess, updatingExpenseCategorySuccess]);


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
        setSelectedExpenseCategory(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedExpenseCategory(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteExpenseCategoryHandler( id);
        setDeleteModalOpened(false);
        setSelectedExpenseCategory(null);
    }, [deleteExpenseCategoryHandler])
    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedExpenseCategory(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedExpenseCategory(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        setEditModalOpened(false);
        setSelectedExpenseCategory(null);
        updateExpenseCategoryHandler(data);
    }, [updateExpenseCategoryHandler])

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
                            rowCount={fetchedExpensesCategories.data.length}
                        />
                        <EnhancedTableBody
                            fetchedExpensesCategories={fetchedExpensesCategories}
                            editExpenseCategoryHandler={editModalOpenHandler}
                            deleteExpenseCategoryHandler={deleteModalOpenHandler}
                        />
                    </Table>
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            sx= {{ width: '100%'}}
                            component="div"
                            count={fetchedExpensesCategories.data.length}
                            total={fetchedExpensesCategories.meta ? fetchedExpensesCategories.meta.total : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={fetchingExpensesCategories}
                        />
                    )}
                </TableContainer>
                <DeleteModal show={deleteModalOpened} id={selectedExpenseCategory}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedExpenseCategory)}
                    heading='Do you want To delete this category?' confirmText='delete' />
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedExpenseCategory} fetchedExpensesCategories={fetchedExpensesCategories}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit product details' confirmText='edit' />
                    )
                }
            </Paper>
        </Fragment>
    ) 
    if ( fetchedExpensesCategories.data.length === 0 && searchingExpensesCategoriesSuccess) {
        content = (
            <SearchMessage>
                {t('no results')}
            </SearchMessage>
        )
    } else if (fetchingExpensesCategories) {
        content = (
            <Loader>
                <CircularProgress color="secondary" />
            </Loader>
        )
    }

    return (
        <ExpenseCategoriesWrapper>
            {content}
        </ExpenseCategoriesWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedExpensesCategories: state.expenses.expensesCategories,
        fetchingExpensesCategories: state.expenses.fetchingExpensesCategories,
        searchingExpensesCategoriesSuccess: state.expenses.searchingExpensesCategoriesSuccess,
        creatingExpenseCategorySuccess: state.expenses.creatingExpenseCategorySuccess,
        updatingExpenseCategorySuccess: state.expenses.updatingExpenseCategorySuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExpensesCategoriesHandler: (lang, page, rowsPerPage ) => dispatch(fetchExpensesCategories(lang, page, rowsPerPage)),
        deleteExpenseCategoryHandler: (id) => dispatch(deleteExpenseCategory(id)),
        updateExpenseCategoryHandler: (data) => dispatch(updateExpenseCategory(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCategories);