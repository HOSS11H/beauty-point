import { Grid } from "@mui/material";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import SearchMessage from "../../../../components/Search/SearchMessage/SearchMessage";
import ReturnView from "../../../../components/UI/Dashboard/ReturnView/ReturnView";
import TablePaginationActions from '../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import { deleteReturn, fetchReturns, filterReturns } from "../../../../store/actions/index";
import ThemeContext from "../../../../store/theme-context";
import v1 from '../../../../utils/axios-instance-v1';
import SearchFilters from "./SearchFilters/SearchFilters";
import ViewModal from "./ViewModal/ViewModal";

const rowsPerPage = 15;

function Returns(props) {

    const { t } = useTranslation()

    const { fetchedReturns, fetchReturnsHandler, fetchingReturns, deleteReturnHandler,
            filteringReturns, filteringReturnsSuccess, filterReturnsHandler } = props;

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const [selectedReturnId, setSelectedReturnId] = useState(null);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [page, setPage] = useState(0);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchReturnsHandler(lang, page, rowsPerPage);
    }, [fetchReturnsHandler, lang, page]);

    useEffect(() => {
        if (!userData) {
            v1.get('/auth/me')
                .then(res => {
                    setUserData(res.data)
                }
                )
                .catch(err => {
                    //console.log(err)
                })
        }
    }, [userData]);



    const filterReturnHandler = useCallback((filters) => {
        filterReturnsHandler({ ...filters, page: 1, per_page: rowsPerPage });
        setPage(0);
    }, [filterReturnsHandler])

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
        fetchReturnsHandler(lang, newPage, rowsPerPage);
    }, [fetchReturnsHandler, lang]);

    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setSelectedReturnId(id);
        setViewModalOpened(true);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedReturnId(null);
    }, [])
    const viewModalDeleteHandler = useCallback((id) => {
        setViewModalOpened(false);
        setSelectedReturnId(null);
        deleteReturnHandler(id);
    }, [deleteReturnHandler])

    let content;

    if (fetchingReturns || filteringReturns) {
        content = (
            <Fragment>
                <Grid item xs={12} md={6}  >
                    <ReturnView loading={fetchingReturns} />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <ReturnView loading={fetchingReturns} />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <ReturnView loading={fetchingReturns} />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <ReturnView loading={fetchingReturns} />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <ReturnView loading={fetchingReturns} />
                </Grid>
                <Grid item xs={12} md={6}  >
                    <ReturnView loading={fetchingReturns} />
                </Grid>
            </Fragment>
        )
    } else if (fetchedReturns.data.length === 0 && filteringReturnsSuccess) {
        content = (
            <SearchMessage>
                {t('No Returns Found')}
            </SearchMessage>
        );
    } else {
        content = fetchedReturns.data.map((returned, index) => {
            return (
                <Grid item xs={12} md={6} key={returned.id} >
                    <ReturnView returned={returned} loading={fetchingReturns} onClick={viewModalOpenHandler.bind(null, returned.id)} />
                </Grid>
            )
        })
    }

    return (
        <Grid container spacing={2}>
            <SearchFilters page={page} perPage={rowsPerPage} filterReturns={filterReturnHandler} />
            {content}
            <Grid item xs={12}>
                {fetchedReturns.data.length !== 0 && (
                    <TablePaginationActions
                        sx={{ width: '100%' }}
                        component="div"
                        count={fetchedReturns.data.length}
                        total={fetchedReturns.meta ? fetchedReturns.meta.total : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        loading={fetchingReturns}
                    />
                )}
            </Grid>
            {
                viewModalOpened && (
                    <ViewModal show={viewModalOpened} id={selectedReturnId}
                        onClose={viewModalCloseHandler}
                        heading='view return details'  onDelete={viewModalDeleteHandler} userData={userData} />
                )
            }
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        fetchedReturns: state.returns.returns,
        fetchingReturns: state.returns.fetchingReturns,
        filteringReturns: state.returns.filteringReturns,
        filteringReturnsSuccess: state.returns.filteringReturnsSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReturnsHandler: (language, page, perPage) => dispatch(fetchReturns(language, page, perPage)),
        filterReturnsHandler: (params) => dispatch(filterReturns(params)),
        deleteReturnHandler: (id) => dispatch(deleteReturn(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Returns);
