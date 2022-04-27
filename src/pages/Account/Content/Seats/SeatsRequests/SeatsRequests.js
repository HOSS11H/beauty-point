import { Grid } from '@mui/material';
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SearchBar from '../../../../../components/Search/SearchBar/SearchBar';
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import SeatRequest from '../../../../../components/UI/Dashboard/SeatRequest/SeatRequest';
import Loader from '../../../../../components/UI/Loader/Loader';
import axios from '../../../../../utils/axios-instance';
//import ReserveSeat from './ReserveSeat/ReserveSeat';


const SeatsRequests = props => {
    const { t } = useTranslation()

    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [searchWord, setSearchWord] = useState('')
    const [lastPage, setLastPage] = useState(false)

    const [sendingRequest, setSendingRequest] = useState(false)

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

    const fetchRequests = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/seats-reservations`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                setRequests(currentRequests => {
                    return [...currentRequests, ...res.data.data]
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
    }, [page])

    useEffect(() => {
        fetchRequests({ page: page, term: searchWord, per_page: 10, order_by: 'id' })
    }, [fetchRequests, page, searchWord])


    const acceptRequestHandler = useCallback((id) => {
        setSendingRequest(true)
        axios.post(`/vendors/seats-reservations/${id}/accept`)
            .then(res => {
                setSendingRequest(false)
                setRequests(currentRequests => {
                    return currentRequests.filter(request => request.id !== id)
                })
                toast.success(t('Request Accepted'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(error => {
                setSendingRequest(false)
                toast.error(error.response?.data.message, {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [t])
    const rejectRequestHandler = useCallback((id) => {
        setSendingRequest(true)
        axios.post(`/vendors/seats-reservations/${id}/refuse`)
            .then(res => {
                setSendingRequest(false)
                setRequests(currentRequests => {
                    return currentRequests.filter(request => request.id !== id)
                })
                toast.success(t('Request Rejected'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(error => {
                setSendingRequest(false)
                toast.error(error.response?.data.message, {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [t])


    const searchCutomersHandler = useCallback((lang, search) => {
        setRequests([])
        setLastPage(false)
        setSearchWord(search)
        setPage(1)
    }, [])

    let content;

    if (loading && requests.length === 0) {
        content = (
            <Loader height='90vh' />
        )
    }

    if (!loading && requests.length === 0 && searchWord !== '') {
        content = (
            <SearchMessage>
                {t('No Requests Found')}
            </SearchMessage>
        )
    }

    if (requests.length > 0) {
        content = (
            <Grid container spacing={2}>
                {requests.map((request, index) => {
                    if (requests.length === (index + 1)) {
                        return (
                            <Grid item xs={12} sm={6} key={index} ref={lastElementRef} >
                                <SeatRequest request={request} handleConfirm={acceptRequestHandler} handleReject={rejectRequestHandler} sendingRequest={sendingRequest} />
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item xs={12} sm={6} key={index}>
                                <SeatRequest request={request}  handleConfirm={acceptRequestHandler} handleReject={rejectRequestHandler} sendingRequest={sendingRequest} />
                            </Grid>
                        )
                    }
                })}
            </Grid>
        )
    }

    return (
        <Fragment>
            <SearchBar searchHandler={searchCutomersHandler} />
            {content}
        </Fragment>
    )
}
export default SeatsRequests;