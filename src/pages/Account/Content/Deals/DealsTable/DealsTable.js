import { useContext, useEffect, useState } from 'react';
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
import { deleteDeal } from '../../../../../store/actions/index';
import EnhancedTableBody from './TableBody/TableBody';

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

export const SkeletonsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const intialRowsPerPage = 15

function DealsTable(props) {

    const { fetchedDeals, fetchDealsHandler, loadingDeals , deleteDealHandler } = props;

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [ deleteModalOpened , setDeleteModalOpened ] = useState(false);

    const [ selectedDealId , setSelectedDealId ] = useState(null);

    const deleteModalOpenHandler = ( id ) => {
        setDeleteModalOpened(true);
        setSelectedDealId(id);
    }
    const deleteModalCloseHandler = ( ) => {
        setDeleteModalOpened(false);
        setSelectedDealId(null);
    }

    const deleteModalConfirmHandler = ( id ) => {
        deleteDealHandler(token ,id );
        setDeleteModalOpened(false);
        setSelectedDealId(null);
    }

    console.log('rendered');

    useEffect(() => {
        fetchDealsHandler(lang, token, page);
    }, [fetchDealsHandler, lang, token, page]);

    useEffect(() => {
        if( fetchedDeals.per_page ) {
            setRowsPerPage(fetchedDeals.per_page)
        }
    }, [ fetchedDeals ])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedDeals.data.length);

    return (
        <DealsTableWrapper>
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
                    heading='Do you want To delete this deal?'  confirmText='delete' />
        </DealsTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedDeals: state.deals.deals,
        loadingDeals: state.deals.fetchingDeals,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDealsHandler: (language, token, page) => dispatch(fetchDeals(language, token, page)),
        deleteDealHandler: ( token , id ) => dispatch( deleteDeal(token , id) ),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DealsTable);