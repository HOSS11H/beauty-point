import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct } from '../../../../../store/actions/index';
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
import { toast } from 'react-toastify';

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
const TablePaginationWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`


const intialRowsPerPage = 15

function ProductsTable(props) {

    const { t } = useTranslation()

    const { fetchedProducts, fetchProductsHandler, loadingProducts, deleteProductHandler, searchingProducts, searchingProductsSuccess, updateProductHandler, creatingProductSuccess, updatingProductSuccess, updatingProductFailed, updatingProductMessage } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('name');

    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        fetchProductsHandler(lang, page, rowsPerPage, orderBy, order);
    }, [fetchProductsHandler, lang, page, rowsPerPage, orderBy, order]);

    useEffect(() => {
        if (creatingProductSuccess) {
            fetchProductsHandler(lang, page, rowsPerPage, 'id', 'desc');
        }
    }, [creatingProductSuccess, fetchProductsHandler, lang, page, rowsPerPage]);

    useEffect(() => {
        if (updatingProductSuccess) {
            setEditModalOpened(false);
            setSelectedProductId(null);
            fetchProductsHandler(lang, page, rowsPerPage, orderBy, order);
            toast.success(t('Product edited'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [updatingProductSuccess, fetchProductsHandler, lang, page, rowsPerPage, orderBy, order, t]);

    useEffect(() => {
        if (updatingProductFailed && updatingProductMessage) {
            toast.error(updatingProductMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [updatingProductFailed, updatingProductMessage])


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
        setSelectedProductId(id);
    }, [])
    const deleteModalCloseHandler = useCallback(() => {
        setDeleteModalOpened(false);
        setSelectedProductId(null);
    }, [])

    const deleteModalConfirmHandler = useCallback((id) => {
        deleteProductHandler(id);
        setDeleteModalOpened(false);
        setSelectedProductId(null);
    }, [deleteProductHandler])
    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setViewModalOpened(true);
        setSelectedProductId(id);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedProductId(null);
    }, [])

    const viewModalConfirmHandler = useCallback((id) => {
        setViewModalOpened(false);
        setEditModalOpened(true);
    }, [])

    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedProductId(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedProductId(null);
    }, [])

    const editModalConfirmHandler = useCallback((data) => {
        updateProductHandler(data);
    }, [updateProductHandler])


    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedProducts.data.length);


    let content;

    if (fetchedProducts.data.length === 0 && searchingProductsSuccess && !searchingProducts) {
        content = (
            <SearchMessage>
                {t('No Products Found')}
            </SearchMessage>
        )
    } else {
        content = (
            <Fragment>
                <Paper sx={{ width: '100%', boxShadow: 'none' }}>
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
                                rowCount={fetchedProducts.data.length}
                                onRequestSort={handleRequestSort}
                                order={order}
                                orderBy={orderBy}
                                loading={loadingProducts}
                            />
                            <EnhancedTableBody
                                fetchedProducts={fetchedProducts}
                                emptyRows={emptyRows}
                                deleteModalOpenHandler={deleteModalOpenHandler}
                                viewModalOpenHandler={viewModalOpenHandler}
                                editModalOpenHandler={editModalOpenHandler}
                            />
                        </Table>
                    </TableContainer>
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            component="div"
                            count={fetchedProducts.data.length}
                            total={fetchedProducts.meta ? fetchedProducts.meta.total : 0}
                            rowsPerPage={+rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={loadingProducts}
                        />
                    )}
                </Paper>
                <DeleteModal show={deleteModalOpened} id={selectedProductId}
                    onClose={deleteModalCloseHandler} onConfirm={deleteModalConfirmHandler.bind(null, selectedProductId)}
                    heading='Do you want To delete this product?' confirmText='delete' />
                <ViewModal show={viewModalOpened} id={selectedProductId} fetchedProducts={fetchedProducts}
                    onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedProductId)}
                    heading='view product details' confirmText='edit' />
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedProductId} fetchedProducts={fetchedProducts}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit product details' confirmText='edit' />
                    )
                }
            </Fragment>
        )
    }

    return (
        <ProductsTableWrapper>
            {content}
        </ProductsTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedProducts: state.products.products,
        loadingProducts: state.products.fetchingProducts,
        searchingProducts: state.products.searchingProducts,
        searchingProductsSuccess: state.products.searchingProductsSuccess,
        creatingProductSuccess: state.products.creatingProductSuccess,
        updatingProductSuccess: state.products.updatingProductSuccess,
        updatingProductFailed: state.products.updatingProductFailed,
        updatingProductMessage: state.products.updatingProductMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsHandler: (language, page, perPage, orderBy, order) => dispatch(fetchProducts(language, page, perPage, orderBy, order)),
        deleteProductHandler: (id) => dispatch(deleteProduct(id)),
        updateProductHandler: (data) => dispatch(updateProduct(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);