import { Grid } from '@mui/material';
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SearchBar from '../../../../components/Search/SearchBar/SearchBar';
import SearchMessage from "../../../../components/Search/SearchMessage/SearchMessage";
import SeatCard from '../../../../components/UI/Dashboard/Seat/Seat';
import Loader from '../../../../components/UI/Loader/Loader';
import axios from '../../../../utils/axios-instance';
import ReserveSeat from './ReserveSeat/ReserveSeat';

const ArtistSeats = props => {

    const { t } = useTranslation()

    const [seats, setSeats] = useState([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [searchWord, setSearchWord] = useState('')
    const [lastPage, setLastPage] = useState(false)

    const [showSeatOpened, setShowSeatOpened] = useState(false)

    const [selectedSeat, setSelectedSeat] = useState(null)

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

    const fetchSeats = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/seats?include[]=location`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                setSeats(currentSeats => {
                    return [...currentSeats, ...res.data.data]
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
        fetchSeats({ page: page, term: searchWord, per_page: 10, order_by: 'id' })
    }, [fetchSeats, page, searchWord])

    const openShowSeatHandler = useCallback((seat) => {
        setShowSeatOpened(true)
        setSelectedSeat(seat)
    }, [])
    const closeShowSeatHandler = useCallback(() => {
        setShowSeatOpened(false)
        setSelectedSeat(null)
    }, [])
    const confirmShowSeatHandler = useCallback((data) => {
        axios.post(`/vendors/seats/${data.id}/reserve`, data )
            .then( res => {
                setShowSeatOpened(false)
                setSelectedSeat(null)
                toast.success(t('Seat Reserved'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch( error => {
                toast.error(error.response?.data.message, {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [t])


    const searchCutomersHandler = useCallback((lang, search) => {
        setSeats([])
        setLastPage(false)
        setSearchWord(search)
        setPage(1)
    }, [])

    let content;

    if (loading && seats.length === 0) {
        content = (
            <Loader height='90vh' />
        )
    }

    if (!loading && seats.length === 0 && searchWord !== '') {
        content = (
            <SearchMessage>
                {t('No Seats Found')}
            </SearchMessage>
        )
    }

    if (seats.length > 0) {
        content = (
            <Grid container spacing={2}>
                {seats.map((seat, index) => {
                    if (seats.length === (index + 1)) {
                        return (
                            <Grid item xs={12} sm={6} key={index} ref={lastElementRef} >
                                <SeatCard seat={seat} onClick={openShowSeatHandler} />
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item xs={12} sm={6} key={index}>
                                <SeatCard seat={seat} onClick={openShowSeatHandler} />
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
            {showSeatOpened && selectedSeat && (
                <ReserveSeat show={showSeatOpened} seat={selectedSeat}
                    heading='reserve seat' onConfirm={confirmShowSeatHandler}
                    onClose={closeShowSeatHandler} confirmText='reserve seat' />
            )}
        </Fragment>
    )
}
export default ArtistSeats;