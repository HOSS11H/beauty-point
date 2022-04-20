import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchDealsTable, deleteDeal, fetchServicesByLocation, updateDeal } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from '../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import ViewModal from './ViewModal/ViewModal';
import EditModal from './EditModal/EditModal';
import EnhancedTableBody from './TableBody/TableBody';
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { toast } from "react-toastify";

const DealsTableWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
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
        max-width: 100%;
    }
`
const TablePaginationWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`


const intialRowsPerPage = 15

function DealsTable(props) {

    const { t } = useTranslation()

    const { fetchedDeals, fetchDealsHandler, loadingDeals, deleteDealHandler, editDealHandler, searchingDeals, searchingDealsSuccess, fetchServicesHandler, updatingDealSuccess, updatingDealFailed, updatingDealMessage, creatingDealSuccess } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('title');

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedDealId, setSelectedDealId] = useState(null);

    useEffect(() => {
        fetchDealsHandler(lang, page, rowsPerPage, orderBy, order);
    }, [fetchDealsHandler, lang, order, orderBy, page, rowsPerPage]);

    useEffect(() => {
        creatingDealSuccess && fetchDealsHandler(lang, page, rowsPerPage, 'id', 'desc');
    }, [fetchDealsHandler, lang, order, orderBy, page, rowsPerPage, creatingDealSuccess])

    useEffect(() => {
        if (updatingDealSuccess) {
            fetchDealsHandler(lang, page, rowsPerPage, orderBy, order);
            setEditModalOpened(false);
            setSelectedDealId(null);
            toast.success(t('Deal Edited'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [fetchDealsHandler, lang, order, orderBy, page, rowsPerPage, t, updatingDealSuccess])

    useEffect(() => {
        if (updatingDealFailed && updatingDealMessage) {
            toast.error(updatingDealMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [updatingDealFailed, updatingDealMessage])



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }, []);


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
        deleteDealHandler(id);
        setDeleteModalOpened(false);
        setSelectedDealId(null);
    }, [deleteDealHandler])

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
        const selectedDealIndex = fetchedDeals.data.findIndex(deal => deal.id === id);
        let dealData = fetchedDeals.data[selectedDealIndex];
        fetchServicesHandler(lang, dealData.location.id);
        setEditModalOpened(true);
        setSelectedDealId(id);
    }, [fetchServicesHandler, fetchedDeals.data, lang])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedDealId(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        editDealHandler(data);
    }, [editDealHandler])

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
                    <TableContainer >
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
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <EnhancedTableHead
                                rowCount={fetchedDeals.data.length}
                                onRequestSort={handleRequestSort}
                                order={order}
                                orderBy={orderBy}
                                loading={loadingDeals}
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
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            component="div"
                            count={fetchedDeals.data.length}
                            total={fetchedDeals.meta ? fetchedDeals.meta.total : 0}
                            rowsPerPage={+rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={loadingDeals}
                        />
                    )}
                </Paper>
                <DeleteModal show={deleteModalOpened} id={selectedDealId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedDealId)}
                    heading='Do you want To delete this deal?' confirmText='delete' />
                <ViewModal show={viewModalOpened} id={selectedDealId}
                    onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedDealId)}
                    heading='view deal details' confirmText='edit' />
                {
                    editModalOpened && !loadingDeals && (
                        <EditModal show={editModalOpened} id={selectedDealId}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit deal details' confirmText='edit' />
                    )
                }
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
        updatingDealSuccess: state.deals.updatingDealSuccess,
        updatingDealFailed: state.deals.updatingDealFailed,
        updatingDealMessage: state.deals.updatingDealMessage,
        creatingDealSuccess: state.deals.creatingDealSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDealsHandler: (language, page, perPage, orderBy, orderDir) => dispatch(fetchDealsTable(language, page, perPage, orderBy, orderDir)),
        deleteDealHandler: (id) => dispatch(deleteDeal(id)),
        editDealHandler: (data) => dispatch(updateDeal(data)),
        fetchServicesHandler: (lang, location) => dispatch(fetchServicesByLocation(lang, location)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DealsTable);