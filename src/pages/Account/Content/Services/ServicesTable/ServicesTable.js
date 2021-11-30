import { useCallback, useContext, useEffect, useState , Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchServices } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AuthContext from '../../../../../store/auth-context';
import EnhancedTableHead from './TableHead/TableHead';
import { deleteService } from '../../../../../store/actions/index';
import EnhancedTableBody from './TableBody/TableBody';
import TablePaginationActions from '../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import ViewModal from './ViewModal/ViewModal';
import EditModal from './EditModal/EditModal';
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import { useTranslation } from 'react-i18next';

const ServicesTableWrapper = styled.div`
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

function ServicesTable(props) {

    const { t } = useTranslation()

    const { fetchedServices, fetchServicesHandler, loadingServices, deleteServiceHandler, searchingServices, searchingServicesSuccess } = props;

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedServiceId, setSelectedServiceId] = useState(null);

    useEffect(() => {
        fetchServicesHandler(lang, token, page,rowsPerPage );
    }, [fetchServicesHandler, lang, token, page, rowsPerPage]);

    useEffect(() => {
        if (fetchedServices.per_page) {
            setRowsPerPage(fetchedServices.per_page)
        }
    }, [fetchedServices])

    // Delete Modal
    const deleteModalOpenHandler = useCallback((id) => {
        setDeleteModalOpened(true);
        setSelectedServiceId(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedServiceId(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteServiceHandler(token, id);
        setDeleteModalOpened(false);
        setSelectedServiceId(null);
    }, [deleteServiceHandler, token])

    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setViewModalOpened(true);
        setSelectedServiceId(id);
        console.log(id);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedServiceId(null);
    }, [])

    const viewModalConfirmHandler = useCallback((id) => {
        setViewModalOpened(false);
        setEditModalOpened(true);
    }, [])

    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedServiceId(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedServiceId(null);
    }, [])

    const editModalConfirmHandler = useCallback((id) => {
        setEditModalOpened(false);
        setSelectedServiceId(null);
    }, [])


    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedServices.data.length);


    let content;

    if (fetchedServices.data.length === 0 && searchingServicesSuccess && !searchingServices) {
        content = (
            <SearchMessage>
                {t('No Services Found')}
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
                                rowCount={fetchedServices.data.length}
                            />
                            <EnhancedTableBody
                                fetchedServices={fetchedServices}
                                emptyRows={emptyRows}
                                deleteModalOpenHandler={deleteModalOpenHandler}
                                viewModalOpenHandler= {viewModalOpenHandler}
                                editModalOpenHandler= {editModalOpenHandler}
                            />
                        </Table>
                    </TableContainer>
                    <TablePaginationActions
                        component="div"
                        count={fetchedServices.data.length}
                        total={fetchedServices.meta &&  fetchedServices.meta.total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={loadingServices}
                    />
                </Paper>
                <DeleteModal show={deleteModalOpened} id={selectedServiceId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedServiceId)}
                    heading='Do you want To delete this service?' confirmText='delete' />
                <ViewModal show={viewModalOpened} id={selectedServiceId} fetchedServices={fetchedServices}
                    onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedServiceId)}
                    heading='view service details' confirmText='edit' />
                <EditModal show={editModalOpened} id={selectedServiceId} fetchedServices={fetchedServices}
                    onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler.bind(null, selectedServiceId)}
                    heading='edit service details' confirmText='edit' />
            </Fragment>
        )
    }

    return (
        <ServicesTableWrapper>
            {content}
        </ServicesTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedServices: state.services.services,
        loadingServices: state.services.fetchingServices,
        searchingServices: state.services.searchingServices,
        searchingServicesSuccess: state.services.searchingServicesSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesHandler: (language, token, page, perPage) => dispatch(fetchServices(language, token, page, perPage)),
        deleteServiceHandler: (token, id) => dispatch(deleteService(token, id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable);