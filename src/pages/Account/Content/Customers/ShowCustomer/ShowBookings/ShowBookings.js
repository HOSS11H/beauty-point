import { Grid } from "@mui/material"
import { Fragment, useEffect } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import SearchMessage from "../../../../../../components/Search/SearchMessage/SearchMessage"
import BookingView from "../../../../../../components/UI/Dashboard/BookingView/BookingView"
import Loader from "../../../../../../components/UI/Loader/Loader"
import { deleteBooking, updateBooking } from "../../../../../../store/actions/index"
import axios from '../../../../../../utils/axios-instance'
import v1 from '../../../../../../utils/axios-instance-v1'
import EditModal from "../../../Bookings/EditModal/EditModal"
import ViewModal from "../../../Bookings/ViewModal/ViewModal"
import styled from "styled-components";
import { styled as MuiStyled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { DebounceInput } from 'react-debounce-input';

const Wrapper = styled.div`
    margin-top: 30px;
`

const Search = MuiStyled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    flexGrow: 1,
    marginBottom: '20px',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = MuiStyled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
}));

const StyledInputBase = MuiStyled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '&.MuiInputBase-root': {
        width: '100%',
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        color: '#fff',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

const ShowBookings = props => {

    const { id, deleteBookingHandler, updateBookingHandler, updatingBookingSuccess } = props;

    const { t } = useTranslation()

    const [userData, setUserData] = useState(null)

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [searchWord, setSearchWord] = useState('')
    const [lastPage, setLastPage] = useState(false)

    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const [viewModalOpened, setViewModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);

    const ovserver = useRef()

    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loading])

    const fetchBookings = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/customers/${id}/bookings?&include[]=user`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                setBookings(currentBookings => {
                    return [...currentBookings, ...res.data.data]
                })
                if (res.data.meta.last_page === page) {
                    setLastPage(true)
                }
            }
            )
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [id, page])

    useEffect(() => {
        fetchBookings({ page: page, term: searchWord, per_page: 10, order_by: 'id' })
    }, [fetchBookings, page, searchWord])

    useEffect(() => {
        if (updatingBookingSuccess) {
            setBookings([])
            fetchBookings({ page: page, term: searchWord, per_page: 10, order_by: 'id' })
        }
    }, [fetchBookings, page, searchWord, updatingBookingSuccess])

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
    }, [userData])

    const searchBookingsHandler = useCallback((search) => {
        setBookings([])
        setLastPage(false)
        setSearchWord(search)
        setPage(1)
    }, [])


    // Edit Modal
    const editModalOpenHandler = useCallback((id) => {
        setEditModalOpened(true);
        setSelectedBookingId(id);
    }, [])
    const editModalCloseHandler = useCallback(() => {
        setEditModalOpened(false);
        setSelectedBookingId(null);
    }, [])
    const editModalDeleteHandler = useCallback((id) => {
        setEditModalOpened(false);
        setSelectedBookingId(null);
        deleteBookingHandler(id);
    }, [deleteBookingHandler])

    const editModalConfirmHandler = useCallback((data) => {
        setEditModalOpened(false);
        setSelectedBookingId(null);
        //console.log(data)
        updateBookingHandler(data);
    }, [updateBookingHandler])

    // View Modal
    const viewModalOpenHandler = useCallback((id) => {
        setSelectedBookingId(id);
        setViewModalOpened(true);
    }, [])
    const viewModalCloseHandler = useCallback(() => {
        setViewModalOpened(false);
        setSelectedBookingId(null);
    }, [])
    const viewModalDeleteHandler = useCallback((id) => {
        setViewModalOpened(false);
        setSelectedBookingId(null);
        deleteBookingHandler(id);
    }, [deleteBookingHandler])

    const viewModalConfirmHandler = useCallback((id) => {
        setViewModalOpened(false);
        setSelectedBookingId(null);
        setEditModalOpened(true);
        editModalOpenHandler(id);
    }, [editModalOpenHandler])

    let content;

    if (loading && bookings.length === 0) {
        content = (
            <Loader height='90vh' />
        )
    }

    if (!loading && bookings.length === 0 && searchWord !== '') {
        content = (
            <SearchMessage height='150px' >
                {t('No Bookings Found')}
            </SearchMessage>
        )
    }

    if (bookings.length > 0) {
        content = (
            <Fragment>
                <Grid container spacing={2}>
                    {bookings.map((booking, index) => {
                        if (bookings.length === (index + 1)) {
                            return (
                                <Grid item xs={12} key={booking.id} ref={lastElementRef} >
                                    <BookingView booking={booking} loading={loading} onClick={viewModalOpenHandler.bind(null, booking.id)} />
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={12} key={booking.id} >
                                    <BookingView booking={booking} loading={loading} onClick={viewModalOpenHandler.bind(null, booking.id)} />
                                </Grid>
                            )
                        }
                    })}
                </Grid>
                {
                    viewModalOpened && userData && (
                        <ViewModal show={viewModalOpened} id={selectedBookingId}
                            onClose={viewModalCloseHandler} onConfirm={viewModalConfirmHandler.bind(null, selectedBookingId)}
                            heading='view booking details' confirmText='edit' onDelete={viewModalDeleteHandler} userData={userData} />
                    )
                }
                {
                    editModalOpened && (
                        <EditModal show={editModalOpened} id={selectedBookingId}
                            onClose={editModalCloseHandler} onConfirm={editModalConfirmHandler}
                            heading='edit booking details' confirmText='confirm edit' onDelete={editModalDeleteHandler} />
                    )
                }
            </Fragment>
        )
    }

    return (
        <Wrapper>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <DebounceInput element={StyledInputBase} debounceTimeout={500}
                    placeholder="Search…"
                    value={searchWord}
                    onChange={(e) => searchBookingsHandler(e.target.value)}
                    inputProps={{ 'aria-label': 'search' }} />
            </Search>
            {content}
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        updatingBookingSuccess: state.bookings.updatingBookingSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBookingHandler: (id) => dispatch(deleteBooking(id)),
        updateBookingHandler: (data) => dispatch(updateBooking(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBookings);