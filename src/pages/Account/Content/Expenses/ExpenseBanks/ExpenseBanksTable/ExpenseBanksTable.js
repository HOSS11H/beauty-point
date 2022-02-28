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
import { fetchExpensesBanks, deleteExpenseBank, updateExpenseBank } from '../../../../../../store/actions/index';
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
import { toast } from "react-toastify";

const ExpenseBanksWrapper = styled(Card)`
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

function ExpenseBanksTable(props) {

    const { t } = useTranslation()

    const { fetchedExpensesBanks, fetchingExpensesBanks, fetchExpensesBanksHandler, searchingExpensesBanksSuccess, deleteExpenseBankHandler, 
        updateExpenseBankHandler, updatingExpenseBankSuccess, updatingExpenseBankFailed, updatingExpenseBankMessage } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedExpenseBank, setSelectedExpenseBank] = useState(null);

    useEffect(() => {
        fetchExpensesBanksHandler(lang, page, rowsPerPage );
    }, [lang, fetchExpensesBanksHandler, page, rowsPerPage]);

    useEffect(() => {
        if (updatingExpenseBankSuccess) {
            setEditModalOpened(false);
            setSelectedExpenseBank(null);
            toast.success(t('Bank edited'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [t, updatingExpenseBankSuccess]);

    useEffect(() => {
        if (updatingExpenseBankFailed && updatingExpenseBankMessage) {
            toast.error(updatingExpenseBankMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [updatingExpenseBankFailed, updatingExpenseBankMessage])


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
        setSelectedExpenseBank(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedExpenseBank(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteExpenseBankHandler( id);
        setDeleteModalOpened(false);
        setSelectedExpenseBank(null);
    }, [deleteExpenseBankHandler])
    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedExpenseBank(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedExpenseBank(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        updateExpenseBankHandler(data);
    }, [updateExpenseBankHandler])

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
                            rowCount={fetchedExpensesBanks.data.length}
                        />
                        <EnhancedTableBody
                            fetchedExpensesBanks={fetchedExpensesBanks}
                            editExpenseBankHandler={editModalOpenHandler}
                            deleteExpenseBankHandler={deleteModalOpenHandler}
                        />
                    </Table>
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            sx= {{ width: '100%'}}
                            component="div"
                            count={fetchedExpensesBanks.data.length}
                            total={fetchedExpensesBanks.meta ? fetchedExpensesBanks.meta.total : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={fetchingExpensesBanks}
                        />
                    )}
                </TableContainer>
                <DeleteModal show={deleteModalOpened} id={selectedExpenseBank}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedExpenseBank)}
                    heading='Do you want To delete this agent?' confirmText='delete' />
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedExpenseBank} fetchedExpensesBanks={fetchedExpensesBanks}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit agent details' confirmText='edit' />
                    )
                }
            </Paper>
        </Fragment>
    ) 
    if ( fetchedExpensesBanks.data.length === 0 && searchingExpensesBanksSuccess) {
        content = (
            <SearchMessage>
                {t('no results')}
            </SearchMessage>
        )
    } else if (fetchingExpensesBanks) {
        content = (
            <Loader>
                <CircularProgress color="secondary" />
            </Loader>
        )
    }

    return (
        <ExpenseBanksWrapper>
            {content}
        </ExpenseBanksWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedExpensesBanks: state.expenses.expensesBanks,
        fetchingExpensesBanks: state.expenses.fetchingExpensesBanks,
        searchingExpensesBanksSuccess: state.expenses.searchingExpensesBanksSuccess,
        updatingExpenseBankSuccess: state.expenses.updatingExpenseBankSuccess,
        updatingExpenseBankFailed: state.expenses.updatingExpenseBankFailed,
        updatingExpenseBankMessage: state.expenses.updatingExpenseBankMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExpensesBanksHandler: (lang, page, rowsPerPage ) => dispatch(fetchExpensesBanks(lang, page, rowsPerPage)),
        deleteExpenseBankHandler: (id) => dispatch(deleteExpenseBank(id)),
        updateExpenseBankHandler: (data) => dispatch(updateExpenseBank(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseBanksTable);