import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchServices } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AuthContext from '../../../../../store/auth-context';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from './TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import { deleteService } from '../../../../../store/actions/index';
import EnhancedTableBody from './TableBody/TableBody';

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

export const SkeletonsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const intialRowsPerPage = 15

function ServicesTable(props) {

    const { fetchedServices, fetchServicesHandler, loadingServices , deleteServiceHandler } = props;

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [ deleteModalOpened , setDeleteModalOpened ] = useState(false);

    const [ selectedServiceId , setSelectedServiceId ] = useState(null);

    const deleteModalOpenHandler = ( id ) => {
        setDeleteModalOpened(true);
        setSelectedServiceId(id);
    }
    const deleteModalCloseHandler = ( ) => {
        setDeleteModalOpened(false);
        setSelectedServiceId(null);
    }

    const deleteModalConfirmHandler = ( id ) => {
        deleteServiceHandler(token ,id );
        setDeleteModalOpened(false);
        setSelectedServiceId(null);
    }

    console.log('rendered');

    useEffect(() => {
        fetchServicesHandler(lang, token, page);
    }, [fetchServicesHandler, lang, token, page]);

    useEffect(() => {
        if( fetchedServices.per_page ) {
            setRowsPerPage(fetchedServices.per_page)
        }
    }, [ fetchedServices ])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedServices.data.length);

    return (
        <ServicesTableWrapper>
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
                        />
                    </Table>
                </TableContainer>
                <TablePaginationActions
                    component="div"
                    count={fetchedServices.data.length}
                    total={fetchedServices.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    loading={loadingServices}
                />
            </Paper>
            <DeleteModal show={deleteModalOpened} id={selectedServiceId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedServiceId)}
                    heading='Do you want To delete this service?'  confirmText='delete' />
        </ServicesTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedServices: state.services.services,
        loadingServices: state.services.fetchingServices,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesHandler: (language, token, page) => dispatch(fetchServices(language, token, page)),
        deleteServiceHandler: ( token , id ) => dispatch( deleteService(token , id) ),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable);