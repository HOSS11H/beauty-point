import { Grid } from '@mui/material';
import { useContext, useState, useEffect, useCallback, useReducer } from 'react';
import CustomCard from '../../../../components/UI/Card/Card';
import FilteredResults from './FilteredResults/FilteredResults';
import SearchFilters from './SearchFilters/SearchFilters';
import { connect } from 'react-redux';
import { filterServices, filterProducts, filterDeals } from '../../../../store/actions/index';
import AuthContext from '../../../../store/auth-context';
import ThemeContext from '../../../../store/theme-context';
import Cart from './Cart/Cart';
import { updateObject } from '../../../../shared/utility';

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_SERVICES':
            const serviceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const updatedServices = [...state.services]
            if (serviceIndex === -1) { 
                updatedServices.push(action.payload)
            } else {
                const updatedItem = updatedServices[serviceIndex]
                updatedItem.quantity = updatedItem.quantity + 1
                updatedServices[serviceIndex] = updatedItem
            }
            return updateObject(state, {
                services: updatedServices,
            })
        case 'REMOVE_SERVICE':
            const filteredServices = state.services.filter(service => service.id !== action.payload)
            return updateObject(state, {
                services: filteredServices,
            })
        case 'ADD_TO_PRODUCTS':
            const productIndex = state.products.findIndex(product => product.id === action.payload.id);
            const updatedProducts = [...state.products]
            if (productIndex === -1) { 
                updatedProducts.push(action.payload)
            } else {
                const updatedItem = updatedProducts[productIndex]
                updatedItem.quantity = updatedItem.quantity + 1
                updatedProducts[productIndex] = updatedItem
            }
            return updateObject(state, {
                products: updatedProducts,
            })
        case 'REMOVE_PRODUCT':
            const filteredProducts = state.products.filter(product => product.id !== action.payload)
            return updateObject(state, {
                products: filteredProducts,
            })
        case 'ADD_TO_DEALS':
            const dealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const updatedDeals = [...state.deals]
            if (dealIndex === -1) { 
                updatedDeals.push(action.payload)
            } else {
                const updatedItem = updatedDeals[dealIndex]
                updatedItem.quantity = updatedItem.quantity + 1
                updatedDeals[dealIndex] = updatedItem
            }
            return updateObject(state, {
                deals: updatedDeals,
            })
        case 'REMOVE_DEAL':
            const filteredDeals = state.deals.filter(deal => deal.id !== action.payload)
            return updateObject(state, {
                deals: filteredDeals,
            })
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}


const PointOfSale = ( props ) => {

    const {filterServicesHandler, filterProductsHandler, filterDealsHandler} = props
    
    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx
    const page = 0;

    const [ cart , dispatch ] = useReducer(cartReducer, {
        services: [],
        products: [],
        deals: [],
    });

    const [ shownType, setShownType ] = useState('services');
    const [ shownCategory, setShownCategory ] = useState('*');
    const [ shownLocation, setShownLocation ] = useState('*');
    const [ searchWord, setSearchWord ] = useState('');



    useEffect(() => {
        if(shownType === 'services') {
            filterServicesHandler(lang, page, shownType, shownCategory , shownLocation, searchWord);
        } else if(shownType === 'products') {
            filterProductsHandler(lang, page, shownType, shownCategory , shownLocation, searchWord);
        } else if(shownType === 'deals') {
            filterDealsHandler(lang, page, shownType, shownCategory , shownLocation, searchWord);
        }
    }, [filterDealsHandler, filterProductsHandler, filterServicesHandler, lang, searchWord, shownCategory, shownLocation, shownType, token]);

    const handleResultsChange = useCallback(( type, category , location, search ) => {
        setShownType(type);
        setShownCategory(category);
        setShownLocation(location);
        setSearchWord(search);
        console.log(lang, page, type, category , location, search)
        if(type === 'services') {
            filterServicesHandler(lang, page, type, category , location, search);
        } else if (type === 'products') {
            filterProductsHandler(lang, page, type, category , location, search);
        } else if (type === 'deals') {
            filterDealsHandler(lang, page, type, category , location, search);
        }
    }, [filterDealsHandler, filterProductsHandler, filterServicesHandler, lang])

    const AddToCartHandler = useCallback(( itemData ) => {
        if ( shownType === 'services' ) {
            dispatch({
                type: 'ADD_TO_SERVICES',
                payload: itemData
            })
        }
        if ( shownType === 'products' ) {
            dispatch({
                type: 'ADD_TO_PRODUCTS',
                payload: itemData
            })
        }
        if ( shownType === 'deals' ) {
            dispatch({
                type: 'ADD_TO_DEALS',
                payload: itemData
            })
        }
    }, [shownType])

    const RemoveFromCartHandler = useCallback(( type, itemId ) => {
        console.log(type, itemId)
        if (type === 'services') {
            dispatch({
                type: 'REMOVE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'REMOVE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'REMOVE_DEAL',
                payload: itemId
            })
        }
    } , [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <CustomCard heading='view services' >
                    <SearchFilters resultsHandler= {handleResultsChange}  />
                    <FilteredResults results={shownType} addToCart={AddToCartHandler} />
                </CustomCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <Cart cartData={cart} removeFromCart={RemoveFromCartHandler} />
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterServicesHandler: (language, page, type, category , location, search) => dispatch(filterServices(language, page, type, category , location, search)),
        filterProductsHandler: (language, token, page) => dispatch(filterProducts(language, token, page)),
        filterDealsHandler: (language, token, page) => dispatch(filterDeals(language, token, page)),
    }
}


export default connect(null, mapDispatchToProps)(PointOfSale);