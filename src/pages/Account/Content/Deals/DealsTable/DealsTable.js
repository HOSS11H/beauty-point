import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchDeals } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AuthContext from '../../../../../store/auth-context';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from '../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import ViewModal from './ViewModal/ViewModal';
import EditModal from './EditModal/EditModal';
import { deleteDeal } from '../../../../../store/actions/index';
import EnhancedTableBody from './TableBody/TableBody';
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import { useTranslation } from 'react-i18next';

const DealsTableWrapper = styled.div`
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



const intialRowsPerPage = 15

function DealsTable(props) {

    const { t } = useTranslation()

    const { fetchedDeals, fetchDealsHandler, loadingDeals, deleteDealHandler, searchingDeals, searchingDealsSuccess } = props;

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedDealId, setSelectedDealId] = useState(null);

    useEffect(() => {
        fetchDealsHandler(lang, token, page);
    }, [fetchDealsHandler, lang, token, page]);

    useEffect(() => {
        if (fetchedDeals.per_page) {
            setRowsPerPage(fetchedDeals.per_page)
        }
    }, [fetchedDeals])


    // Delete Modal
    const deleteModalOpenHandler = useCallback((id) => {
        setDeleteModalOpened(true);
        setSelectedDealId(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedDealId(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteDealHandler(token, id);
        setDeleteModalOpened(false);
        setSelectedDealId(null);
    }, [deleteDealHandler, token])

    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setViewModalOpened(true);
        setSelectedDealId(id);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedDealId(null);
    }, [])

    const viewModalConfirmHandler = useCallback((id) => {
        setViewModalOpened(false);
        setEditModalOpened(true);
    }, [])

    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedDealId(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedDealId(null);
    }, [])

    const editModalConfirmHandler = useCallback((id) => {
        setEditModalOpened(false);
        setSelectedDealId(null);
    }, [])

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedDeals.data.length);


    let content;

    if (fetchedDeals.data.length === 0 && searchingDealsSuccess && !searchingDeals) {
        content = (
            <SearchMessage>
                {t('No Deals Found')}
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
                                rowCount={fetchedDeals.data.length}
                            />
                            <EnhancedTableBody
                                fetchedDeals={fetchedDeals}
                                emptyRows={emptyRows}
                                deleteModalOpenHandler={deleteModalOpenHandler}
                                editModalOpenHandler={editModalOpenHandler}
                                viewModalOpenHandler={viewModalOpenHandler}
                            />
                        </Table>
                    </TableContainer>
                    <TablePaginationActions
                        component="div"
                        count={fetchedDeals.data.length}
                        total={fetchedDeals.total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={loadingDeals}
                    />
                </Paper>
                <DeleteModal show={deleteModalOpened} id={selectedDealId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedDealId)}
                    heading='Do you want To delete this deal?' confirmText='delete' />
                <ViewModal show={viewModalOpened} id={selectedDealId} fetchedDeals={fetchedDeals}
                    onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedDealId)}
                    heading='view deal details' confirmText='edit' />
                <EditModal show={editModalOpened} id={selectedDealId} fetchedDeals={fetchedDeals}
                    onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler.bind(null, selectedDealId)}
                    heading='view deal details' confirmText='edit' />
            </Fragment>
        )
    }

    return (
        <DealsTableWrapper>
            {content}
        </DealsTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedDeals: state.deals.deals,
        loadingDeals: state.deals.fetchingDeals,
        searchingDeals: state.deals.searchingDeals,
        searchingDealsSuccess: state.deals.searchingDealsSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDealsHandler: (language, token, page) => dispatch(fetchDeals(language, token, page)),
        deleteDealHandler: (token, id) => dispatch(deleteDeal(token, id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DealsTable);