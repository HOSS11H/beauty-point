import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../../../../../../store/theme-context";
import Filters from "./Filters/Filters";
import v2 from '../../../../../../utils/axios-instance'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Items from "./Items/Items";
import styled from 'styled-components';

const Wrapper = styled.div`

`

const rowsPerPage = 25;

const Results = props => {

    const { t } = useTranslation()
    const themeCtx = useContext(ThemeContext)

    const { city, selectCity } = themeCtx

    const [ filters, setFilters ] = useState({
        type: 'services',
        search: '',
        location: city,
        category: '',
    })
    const { type, search, location, category } = filters;

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
        setPage(0)
        setLastPage(false)
        if ( name === 'location' ) {
            selectCity(val)
        }
    }

    const fetchResults = useCallback( ( type, searchParams ) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoadingResults(true)
        v2.get(`/vendors/${type}`, {
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
            toast.error(t('Error Getting Results'))
            setLoadingResults(false)
        })
    }, [page, t])

    useEffect(() => {
        const params = {
            page: page ,
            per_page: rowsPerPage,
            term: search,
            location_id: location,
            category_id: category
        }
        fetchResults(type, params )
    }, [category, fetchResults, location, page, search, type])

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
            <Items data={results} type={type} loading={loadingResults} lastElementRef={lastElementRef} />
        </Wrapper>
    )
}
export default Results;