import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchProducts } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AuthContext from '../../../../../store/auth-context';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from '../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import DeleteModal from './DeleteModal/DeleteModal';
import { deleteProduct } from '../../../../../store/actions/index';
import EnhancedTableBody from './TableBody/TableBody';

const ProductsTableWrapper = styled.div`
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

function ProductsTable(props) {

    const { fetchedProducts, fetchProductsHandler, loadingProducts , deleteProductHandler } = props;

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [ deleteModalOpened , setDeleteModalOpened ] = useState(false);

    const [ selectedProductId , setSelectedProductId ] = useState(null);

    const deleteModalOpenHandler = ( id ) => {
        setDeleteModalOpened(true);
        setSelectedProductId(id);
    }
    const deleteModalCloseHandler = ( ) => {
        setDeleteModalOpened(false);
        setSelectedProductId(null);
    }

    const deleteModalConfirmHandler = ( id ) => {
        deleteProductHandler(token ,id );
        setDeleteModalOpened(false);
        setSelectedProductId(null);
    }

    console.log('rendered');

    useEffect(() => {
        fetchProductsHandler(lang, token, page);
    }, [fetchProductsHandler, lang, token, page]);

    useEffect(() => {
        if( fetchedProducts.per_page ) {
            setRowsPerPage(fetchedProducts.per_page)
        }
    }, [ fetchedProducts ])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedProducts.data.length);

    return (
        <ProductsTableWrapper>
            <Paper sx={{ width: '100%', boxShadow: 'none' }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            rowCount={fetchedProducts.data.length}
                        />
                        <EnhancedTableBody 
                            fetchedProducts={fetchedProducts}
                            emptyRows={emptyRows}
                            deleteModalOpenHandler={deleteModalOpenHandler}
                        />
                    </Table>
                </TableContainer>
                <TablePaginationActions
                    component="div"
                    count={fetchedProducts.data.length}
                    total={fetchedProducts.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    loading={loadingProducts}
                />
            </Paper>
            <DeleteModal show={deleteModalOpened} id={selectedProductId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedProductId)}
                    heading='Do you want To delete this product?'  confirmText='delete' />
        </ProductsTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedProducts: state.products.products,
        loadingProducts: state.products.fetchingProducts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsHandler: (language, token, page) => dispatch(fetchProducts(language, token, page)),
        deleteProductHandler: ( token , id ) => dispatch( deleteProduct(token , id) ),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);