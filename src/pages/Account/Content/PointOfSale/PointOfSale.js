import { Grid } from '@mui/material';
import { useContext, useState, useEffect, useCallback } from 'react';
import CustomCard from '../../../../components/UI/Card/Card';
import FilteredResults from './FilteredResults/FilteredResults';
import SearchFilters from './SearchFilters/SearchFilters';
import { connect } from 'react-redux';
import { filterServices, fetchProducts, fetchDeals } from '../../../../store/actions/index';
import AuthContext from '../../../../store/auth-context';
import ThemeContext from '../../../../store/theme-context';

const PointOfSale = ( props ) => {

    const {filterServicesHandler, fetchProductsHandler, fetchDealsHandler} = props

    const [ shownType, setShownType ] = useState('services');
    const [ shownCategory, setShownCategory ] = useState('*');
    const [ shownLocation, setShownLocation ] = useState('*');
    const [ searchWord, setSearchWord ] = useState('');

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx
    const page = 0;


    useEffect(() => {
        if(shownType === 'services') {
            filterServicesHandler(lang, page, shownType, shownCategory , shownLocation, searchWord);
        } else if(shownType === 'products') {
            fetchProductsHandler(lang, token, page);
        } else if(shownType === 'deals') {
            fetchDealsHandler(lang, token, page);
        }
    }, []);

    const handleResultsChange = useCallback(( type, category , location, search ) => {
        setShownType(type);
        setShownCategory(category);
        setShownLocation(location);
        setSearchWord(search);
        console.log(lang, page, type, category , location, search)
        if(type === 'services') {
            filterServicesHandler(lang, page, type, category , location, search);
        } else if (type === 'products') {
            fetchProductsHandler(lang, token, page);
        } else if (type === 'deals') {
            fetchDealsHandler(lang, token, page);
        }
    }, [fetchDealsHandler, fetchProductsHandler, filterServicesHandler, lang, token])


    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <CustomCard heading='view services' >
                    <SearchFilters resultsHandler= {handleResultsChange}  />
                    <FilteredResults results={shownType} />
                </CustomCard>
            </Grid>
            <Grid item xs={12} md={6}>

            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterServicesHandler: (language, page, type, category , location, search) => dispatch(filterServices(language, page, type, category , location, search)),
        filterProductsHandler: (language, token, page) => dispatch(fetchProducts(language, token, page)),
        filterDealsHandler: (language, token, page) => dispatch(fetchDeals(language, token, page)),
    }
}


export default connect(null, mapDispatchToProps)(PointOfSale);