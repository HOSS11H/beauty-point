import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { useContext, useState, useEffect, useCallback, useReducer } from 'react';
import CustomCard from '../../../../components/UI/Card/Card';
import FilteredResults from './FilteredResults/FilteredResults';
import SearchFilters from './SearchFilters/SearchFilters';
import { connect } from 'react-redux';
import { filterServices, filterProducts, filterDeals, createBooking } from '../../../../store/actions/index';
import ThemeContext from '../../../../store/theme-context';
import Cart from './Cart/Cart';
import { updateObject } from '../../../../shared/utility';
import CustomizedSnackbars from '../../../../components/UI/SnackBar/SnackBar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../utils/axios-instance';
import PrintBookingModal from './PrintBookingModal/PrintBookingModal';

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_SERVICES':
            const serviceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const updatedServices = [...state.services]
            if (serviceIndex === -1) {
                updatedServices.push(action.payload)
            } else {
                const updatedItem = { ...updatedServices[serviceIndex] }
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
        case 'INCREASE_SERVICE':
            const increasedServiceIndex = state.services.findIndex(service => service.id === action.payload);
            const increasedService = { ...state.services[increasedServiceIndex] }
            increasedService.quantity = increasedService.quantity + 1;
            const increasedServices = [...state.services]
            increasedServices[increasedServiceIndex] = increasedService
            return updateObject(state, {
                services: increasedServices,
            })
        case 'DECREASE_SERVICE':
            const decreasedServiceIndex = state.services.findIndex(service => service.id === action.payload);
            const decreasedService = { ...state.services[decreasedServiceIndex] }
            const decreasedServices = [...state.services]
            if (decreasedService.quantity === 1) {
                decreasedServices.splice(decreasedServiceIndex, 1)
            } else {
                decreasedService.quantity = decreasedService.quantity - 1
                decreasedServices[decreasedServiceIndex] = decreasedService
            }
            return updateObject(state, {
                services: decreasedServices,
            })
        case 'CHANGE_SERVICE_PRICE':
            const changedServiceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const changedService = { ...state.services[changedServiceIndex] }
            changedService.price = action.payload.price
            const changedServices = [...state.services]
            changedServices[changedServiceIndex] = changedService
            return updateObject(state, {
                services: changedServices,
            })
        case 'CHANGE_SERVICE_EMPLOYEE':
            const changedEmployeeServiceIndex = state.services.findIndex(service => service.id === action.payload.id);
            const changedEmployeeService = { ...state.services[changedEmployeeServiceIndex] }
            changedEmployeeService.employee_id = action.payload.employeeId
            const changedEmployeeServices = [...state.services]
            changedEmployeeServices[changedEmployeeServiceIndex] = changedEmployeeService
            return updateObject(state, {
                services: changedEmployeeServices,
            })
        case 'ADD_TO_PRODUCTS':
            const productIndex = state.products.findIndex(product => product.id === action.payload.id);
            const updatedProducts = [...state.products]
            if (productIndex === -1) {
                updatedProducts.push(action.payload)
            } else {
                const updatedItem = { ...updatedProducts[productIndex] }
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
        case 'INCREASE_PRODUCT':
            const increasedProductIndex = state.products.findIndex(product => product.id === action.payload);
            const increasedProduct = { ...state.products[increasedProductIndex] }
            increasedProduct.quantity = increasedProduct.quantity + 1
            const increasedProducts = [...state.products]
            increasedProducts[increasedProductIndex] = increasedProduct
            return updateObject(state, {
                products: increasedProducts,
            })
        case 'DECREASE_PRODUCT':
            const decreasedProductIndex = state.products.findIndex(product => product.id === action.payload);
            const decreasedProduct = { ...state.products[decreasedProductIndex] }
            const decreasedProducts = [...state.products]
            if (decreasedProduct.quantity === 1) {
                decreasedProducts.splice(decreasedProductIndex, 1)
            } else {
                decreasedProduct.quantity = decreasedProduct.quantity - 1
                decreasedProducts[decreasedProductIndex] = decreasedProduct
            }
            return updateObject(state, {
                products: decreasedProducts,
            })
        case 'CHANGE_PRODUCT_PRICE':
            const changedProductIndex = state.products.findIndex(product => product.id === action.payload.id);
            const changedProduct = { ...state.products[changedProductIndex] }
            changedProduct.price = action.payload.price
            const changedProducts = [...state.products]
            changedProducts[changedProductIndex] = changedProduct
            return updateObject(state, {
                products: changedProducts,
            })
        case 'ADD_TO_DEALS':
            const dealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const updatedDeals = [...state.deals]
            if (dealIndex === -1) {
                updatedDeals.push(action.payload)
            } else {
                const updatedItem = { ...updatedDeals[dealIndex] }
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
        case 'INCREASE_DEAL':
            const increasedDealIndex = state.deals.findIndex(deal => deal.id === action.payload);
            const increasedDeal = { ...state.deals[increasedDealIndex] }
            increasedDeal.quantity = increasedDeal.quantity + 1
            const increasedDeals = [...state.deals]
            increasedDeals[increasedDealIndex] = increasedDeal
            return updateObject(state, {
                deals: increasedDeals,
            })
        case 'DECREASE_DEAL':
            const decreasedDealIndex = state.deals.findIndex(deal => deal.id === action.payload);
            const decreasedDeal = { ...state.deals[decreasedDealIndex] }
            const decreasedDeals = [...state.deals]
            if (decreasedDeal.quantity === 1) {
                decreasedDeals.splice(decreasedDealIndex, 1)
            } else {
                decreasedDeal.quantity = decreasedDeal.quantity - 1
                decreasedDeals[decreasedDealIndex] = decreasedDeal
            }
            return updateObject(state, {
                deals: decreasedDeals,
            })
        case 'CHANGE_DEAL_PRICE':
            const changedDealIndex = state.deals.findIndex(deal => deal.id === action.payload.id);
            const changedDeal = { ...state.deals[changedDealIndex] }
            changedDeal.price = action.payload.price
            const changedDeals = [...state.deals]
            changedDeals[changedDealIndex] = changedDeal
            return updateObject(state, {
                deals: changedDeals,
            })
        case 'RESET_CART':
            const intialState = {
                services: [],
                products: [],
                deals: [],
            }
            return updateObject(state, intialState)
        default:
            return state;
    }
}

const intialPerPage = 15;

const PointOfSale = (props) => {

    const { t } = useTranslation()

    const { filterServicesHandler, filterProductsHandler, filterDealsHandler, createBookingHandler, fetchedLocations, bookingCreated, creatingBooking } = props

    const themeCtx = useContext(ThemeContext)

    const navigate = useNavigate()

    const { lang } = themeCtx

    const [cart, dispatch] = useReducer(cartReducer, {
        services: [],
        products: [],
        deals: [],
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(intialPerPage);

    const [shownType, setShownType] = useState('services');
    const [shownCategory, setShownCategory] = useState('all');
    const [shownLocation, setShownLocation] = useState('');
    const [searchWord, setSearchWord] = useState('');

    const [messageShown, setMessageShown] = useState(bookingCreated);

    const [reservedBookingData, setReservedBookingData] = useState(null);
    const [reservingBokking, setReservingBokking] = useState(false);

    const [printBookingModalOpened, setPrintBookingModalOpened] = useState(false);

    useEffect(() => {
        setMessageShown(bookingCreated)
    }, [bookingCreated, navigate])


    useEffect(() => {
        if (shownType === 'services') {
            filterServicesHandler(lang, shownType, shownCategory, shownLocation, searchWord, page, rowsPerPage);
        } else if (shownType === 'products') {
            filterProductsHandler(lang, shownType, shownLocation, searchWord, page, rowsPerPage);
        } else if (shownType === 'deals') {
            filterDealsHandler(lang, shownType, shownLocation, searchWord, page, rowsPerPage);
        }
    }, [filterDealsHandler, filterProductsHandler, filterServicesHandler, lang, page, rowsPerPage, searchWord, shownCategory, shownLocation, shownType]);

    const handleResultsChange = useCallback((type, category, location, search) => {
        setShownType(type);
        setShownCategory(category);
        setShownLocation(location);
        setSearchWord(search);
        setPage(0);
    }, [])

    const addToCartHandler = useCallback((itemData) => {
        if (shownType === 'services') {
            dispatch({
                type: 'ADD_TO_SERVICES',
                payload: itemData
            })
        }
        if (shownType === 'products') {
            dispatch({
                type: 'ADD_TO_PRODUCTS',
                payload: itemData
            })
        }
        if (shownType === 'deals') {
            dispatch({
                type: 'ADD_TO_DEALS',
                payload: itemData
            })
        }
    }, [shownType])

    const removeFromCartHandler = useCallback((type, itemId) => {
        //console.log(type, itemId)
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
    }, [])

    const increaseItemHandler = useCallback((type, itemId) => {
        if (type === 'services') {
            dispatch({
                type: 'INCREASE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'INCREASE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'INCREASE_DEAL',
                payload: itemId
            })
        }
    }, [])
    const decreaseItemHandler = useCallback((type, itemId) => {
        if (type === 'services') {
            dispatch({
                type: 'DECREASE_SERVICE',
                payload: itemId
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'DECREASE_PRODUCT',
                payload: itemId
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'DECREASE_DEAL',
                payload: itemId
            })
        }
    }, [])
    const changeItemPriceHandler = useCallback((type, itemId, price) => {
        //console.log(type, itemId, price);
        if (type === 'services') {
            dispatch({
                type: 'CHANGE_SERVICE_PRICE',
                payload: {
                    id: itemId,
                    price: +price,
                },
            })
        }
        if (type === 'products') {
            dispatch({
                type: 'CHANGE_PRODUCT_PRICE',
                payload: {
                    id: itemId,
                    price: +price,
                },
            })
        }
        if (type === 'deals') {
            dispatch({
                type: 'CHANGE_DEAL_PRICE',
                payload: {
                    id: itemId,
                    price: +price,
                },
            })
        }
    }, [])
    const changeServiceEmployeeHandler = useCallback((type, itemId, employeeId) => {
        //console.log(type, itemId, employeeId);
        if (type === 'services') {
            dispatch({
                type: 'CHANGE_SERVICE_EMPLOYEE',
                payload: {
                    id: itemId,
                    employeeId: employeeId,
                },
            })
        }
    }, [])
    const resetCartHandler = useCallback(() => {
        dispatch({
            type: 'RESET_CART',
        })
    }, [])

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const closeMessageHandler = useCallback(() => {
        setMessageShown(false)
    }, [])

    const purchaseCartHandler = useCallback((purchasedData) => {
        createBookingHandler({
            ...purchasedData,
            location_id: shownLocation === '' ? fetchedLocations[0].id : shownLocation,
        })
    }, [createBookingHandler, fetchedLocations, shownLocation])

    // Add Customer Modal
    const printBookingModalOpenHandler = useCallback((id) => {
        setPrintBookingModalOpened(true);
    }, [])
    const printBookingModalCloseHandler = useCallback(() => {
        setPrintBookingModalOpened(false);
    }, [])

    const purchasePrintBookingHandler = useCallback((purchasedData) => {
        setReservingBokking(true);
        axios.post(`/vendors/bookings`, {
            ...purchasedData,
            location_id: shownLocation === '' ? fetchedLocations[0].id : shownLocation,
        })
            .then(response => {
                setReservingBokking(false);
                setReservedBookingData(response.data);
                setPrintBookingModalOpened((true))
            })
            .catch(err => {

            })
    }, [fetchedLocations, shownLocation])

    const resetPrintedBookingData = useCallback(() => {
        setReservedBookingData(null);
        setPrintBookingModalOpened(false);
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <CustomCard heading='view items' >
                    <SearchFilters handleChangePage={handleChangePage} resultsHandler={handleResultsChange} />
                    <FilteredResults rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} results={shownType} addToCart={addToCartHandler} />
                </CustomCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <Cart cartData={cart} removeFromCart={removeFromCartHandler} increaseItem={increaseItemHandler} decreaseItem={decreaseItemHandler} 
                    resetCart={resetCartHandler} reserved={reservedBookingData}
                    purchase={purchaseCartHandler} print={purchasePrintBookingHandler}
                    priceChangeHandler={changeItemPriceHandler} changeEmployee={changeServiceEmployeeHandler} />
                <CustomizedSnackbars show={messageShown} message={t('Booking Created')} type='success' onClose={closeMessageHandler} />
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={creatingBooking || reservingBokking}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            {
                printBookingModalOpened && (
                    <PrintBookingModal show={printBookingModalOpened} onClose={printBookingModalCloseHandler} bookingData={reservedBookingData} reset={resetPrintedBookingData} />
                )
            }
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedLocations: state.locations.locations,
        bookingCreated: state.bookings.bookingCreated,
        creatingBooking: state.bookings.creatingBooking,
        fetchedServices: state.services.posServices.services,
        fetchedProducts: state.products.posProducts.products,
        fetchedDeals: state.deals.posDeals.deals,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterServicesHandler: (language, type, category, location, search, page, rowsPerPage) => dispatch(filterServices(language, type, category, location, search, page, rowsPerPage)),
        filterProductsHandler: (language, type, location, search, page, rowsPerPage) => dispatch(filterProducts(language, type, location, search, page, rowsPerPage)),
        filterDealsHandler: (language, type, location, search, page, rowsPerPage) => dispatch(filterDeals(language, type, location, search, page, rowsPerPage)),
        createBookingHandler: (data) => dispatch(createBooking(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PointOfSale);