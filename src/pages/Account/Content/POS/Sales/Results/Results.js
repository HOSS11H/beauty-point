import { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../../../../../store/theme-context";
import Filters from "./Filters/Filters";
import v2 from '../../../../../../utils/axios-instance'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const rowsPerPage = 15;

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

    const filtersChangeHandler = ( name, val ) => {
        setFilters( prevState => {
            return {
                ...prevState,
                [name]: val
            }
        } )
        if ( name === 'location' ) {
            selectCity(val)
        }
    }

    const [page, setPage] = useState(0);
    const [ results, setResults] = useState([]);
    const [ loadingResults, setLoadingResults] = useState(false);

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
            setResults(response.data.data)
            setLoadingResults(false)
        })
        .catch(err => {
            toast.error(t('Error Getting Results'))
            setLoadingResults(false)
        })
    }, [t])

    useEffect(() => {
        const params = {
            page: page +1 ,
            per_page: rowsPerPage,
            term: search,
            location_id: location,
            category_id: category
        }
        fetchResults(type, params )
    }, [category, fetchResults, location, page, search, type])


    return (
        <Filters data={filters} handleFiltersChange={filtersChangeHandler}  />
    )
}
export default Results;