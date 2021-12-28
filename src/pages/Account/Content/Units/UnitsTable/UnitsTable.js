import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchUnits, updateUnit, deleteUnit } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from '../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import EditModal from './EditModal/EditModal';
import EnhancedTableBody from './TableBody/TableBody';
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import { useTranslation } from 'react-i18next';

const UnitsTableWrapper = styled.div`
    display: flex;
    min-height: 60vh;
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

function UnitsTable(props) {

    const { t } = useTranslation()

    const { fetchedUnits, fetchUnitsHandler, loadingUnits, deleteUnitHandler, searchingUnits, searchingUnitsSuccess, updateUnitHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('name');

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedUnitId, setSelectedUnitId] = useState(null);

    useEffect(() => {
        fetchUnitsHandler(lang, page, rowsPerPage, orderBy, order);
    }, [fetchUnitsHandler, lang, page, rowsPerPage, orderBy, order]);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Delete Modal
    const deleteModalOpenHandler = useCallback((id) => {
        setDeleteModalOpened(true);
        setSelectedUnitId(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedUnitId(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteUnitHandler( id);
        setDeleteModalOpened(false);
        setSelectedUnitId(null);
    }, [deleteUnitHandler])
    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedUnitId(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedUnitId(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        setEditModalOpened(false);
        setSelectedUnitId(null);
        updateUnitHandler(data);
    }, [updateUnitHandler])


    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedUnits.data.length);


    let content;

    if (fetchedUnits.data.length === 0 && searchingUnitsSuccess && !searchingUnits) {
        content = (
            <SearchMessage>
                {t('No Units Found')}
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
                                rowCount={fetchedUnits.data.length}
                                onRequestSort={handleRequestSort}
                                order={order}
                                orderBy={orderBy}
                                loading={loadingUnits}
                            />
                            <EnhancedTableBody
                                fetchedUnits={fetchedUnits}
                                emptyRows={emptyRows}
                                deleteModalOpenHandler={deleteModalOpenHandler}
                                editModalOpenHandler={editModalOpenHandler}
                            />
                        </Table>
                    </TableContainer>
                    <TablePaginationActions
                        component="div"
                        count={fetchedUnits.data.length}
                        total={fetchedUnits.meta ? fetchedUnits.meta.total : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={loadingUnits}
                    />
                </Paper>
                <DeleteModal show={deleteModalOpened} id={selectedUnitId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedUnitId)}
                    heading='Do you want To delete this unit?' confirmText='delete' />
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedUnitId} fetchedUnits={fetchedUnits}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit unit details' confirmText='edit' />
                    )
                }
            </Fragment>
        )
    }

    return (
        <UnitsTableWrapper>
            {content}
        </UnitsTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedUnits: state.units.units.units,
        loadingUnits: state.units.units.fetchingUnits,
        searchingUnits: state.units.units.searchingUnits,
        searchingUnitsSuccess: state.units.units.searchingUnitsSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUnitsHandler: (language, page, perPage, orderBy, order) => dispatch(fetchUnits(language, page, perPage, orderBy, order)),
        deleteUnitHandler: ( id) => dispatch(deleteUnit(id)),
        updateUnitHandler: (data) => dispatch(updateUnit(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UnitsTable);