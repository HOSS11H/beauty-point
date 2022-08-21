import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled from 'styled-components';
import v2 from '../../../../../../utils/axios-instance';
import Filters from "./Filters/Filters";
import Items from "./Items/Items";

const Wrapper = styled.div`

`

const rowsPerPage = 25;

const Orders = props => {
    const { assignCart, addBookingData } = props;

    const { t } = useTranslation()

    const [ filters, setFilters ] = useState({
        search: '',
    })
    const { search } = filters;

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false)
    
    const [ results, setResults] = useState([]);
    const [ loadingResults, setLoadingResults] = useState(false);

    const ovserver = useRef()

    const filtersChangeHandler = ( name, val ) => {
        setFilters( prevState => {
            return {
                ...prevState,
                [name]: val
            }
        } )
        setResults([])
        setPage(1)
        setLastPage(false)
    }

    const fetchResults = useCallback( ( searchParams ) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoadingResults(true)
        v2.get(`/vendors/bookings?include[]=items&include[]=user`, {
            params: { ...notEmptySearchParams },
        }).then(response => {
            setResults(currentSeats => {
                return [...currentSeats, ...response.data.data]
            })
            if (response.data.meta.last_page === page) {
                setLastPage(true)
            }
            setLoadingResults(false)
        })
        .catch(err => {
            toast.error(t('Error Getting Orders'))
            setLoadingResults(false)
        })
    }, [page, t])

    useEffect(() => {
        const params = {
            page: page ,
            per_page: rowsPerPage,
            term: search,
        }
        fetchResults( params )
    }, [fetchResults, page, search])

    const lastElementRef = useCallback((node) => {
        if (loadingResults) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loadingResults])

    return (
        <Wrapper>
            <Filters data={filters} handleFiltersChange={filtersChangeHandler}  />
            <Items data={results} loading={loadingResults} lastElementRef={lastElementRef} assignCart={assignCart} addBookingData={addBookingData} />
        </Wrapper>
    )
}
export default Orders;