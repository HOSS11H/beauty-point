import { Grid } from '@mui/material';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState, } from 'react';
import { fetchServices, fetchLocations, fetchProducts, fetchEmployees, filterTabularReport } from '../../../../../../../store/actions/index';
import { connect } from 'react-redux';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import ThemeContext from '../../../../../../../store/theme-context';
import { CustomButton } from '../../../../../../../components/UI/Button/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { format } from 'date-fns';
import SearchCustomer from '../../../../PointOfSale/Cart/SearchCustomer/SearchCustomer';
import { useCallback } from 'react';
import AuthContext from '../../../../../../../store/auth-context';

const FiltersWrapper = styled.div`
    margin-bottom: 30px;
`
const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
`
const FilterButton = styled(CustomButton)`
    &.MuiButton-root {
        margin-right: 20px;
        width: auto;
        padding: 0 10px;
        height: 56px;
        flex-shrink: 0;
        margin-bottom: 0;
        &:last-child {
            margin-right: 0;
        }
    }
`
const ResetButton = styled(CustomButton)`
    &.MuiButton-root {
        margin-right: 20px;
        width: auto;
        padding: 0 10px;
        height: 56px;
        flex-shrink: 0;
        margin-bottom:0;
        background-color: ${(props) => props.theme.palette.error.main};
        &:last-child {
            margin-right: 0;
        }
    }
`





const SearchFilters = (props) => {

    const { fetchedLocations, fetchLocationsHandler, fetchedProducts, fetchProductsHandler, fetchedServices, fetchServicesHandler, fetchedEmployees, fetchEmployeesHandler, handleFilters } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx;
    const { roleName } = authCtx;

    const [location, setLocation] = useState('');

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [selectedServices, setSelectedServices] = useState('');

    const [selectedProducts, setSelectedProducts] = useState('');

    const [customer, setCustomer] = useState([]);
    const [resetSearchData, setResetSearchData] = useState(false)

    const [employee, setEmployee] = useState('');

    const [bookingType, setBookingType] = useState('');

    const [bookingStatus, setBookingStatus] = useState('');

    const [paymentStatus, setPaymentStatus] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        fetchLocationsHandler(lang);
        fetchProductsHandler(lang, 1, 'all', 'name', 'desc');
        fetchServicesHandler(lang, 1, 'all', 'name', 'desc');
        roleName !== 'artist' && fetchEmployeesHandler(lang)
    }, [fetchEmployeesHandler, fetchLocationsHandler, fetchProductsHandler, fetchServicesHandler, lang, roleName])

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleDateFromChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDateFrom(formattedVal);
    }
    const handleDateToChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDateTo(formattedVal);
    }
    const selectedServicesChangeHandler = (event) => {
        setSelectedServices(event.target.value);
    }
    const selectedProductsChangeHandler = (event) => {
        setSelectedProducts(event.target.value);
    }
    const selectCustomer = useCallback((value) => {
        if (value) {
            setCustomer(value);
        } else {
            setCustomer(null);
        }
        setResetSearchData(false)
    }, [])
    const handleEmplloyeeChange = (event) => {
        setEmployee(event.target.value);
    }
    const handleBookingStatusChange = (event) => {
        setBookingStatus(event.target.value);
    }
    const handlePaymentStatusChange = (event) => {
        setPaymentStatus(event.target.value);
    }
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    }

    const ConfirmFilteringHandler = () => {
        const selectedSearchParams = {
            from_date: dateFrom,
            to_date: dateTo,
            customer_id: customer.id || '',
            service_id: selectedServices,
            product_id: selectedProducts,
            employee_id: employee,
            booking_status: bookingStatus,
            booking_type: bookingType,
            location: location,
            payment: paymentStatus,
            payment_method: paymentMethod,
        }
        handleFilters(selectedSearchParams);
    }

    const resetFilteringHandler = () => {
        const searchParams = {
        }
        setLocation('');
        setDateFrom('');
        setDateTo('');
        setSelectedServices('');
        setSelectedProducts('');
        setEmployee('');
        setBookingType('');
        setBookingStatus('');
        setPaymentStatus('');
        setPaymentMethod('');
        setCustomer([]);
        setResetSearchData(true);
        handleFilters(searchParams);
    }


    return (
        <FiltersWrapper>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date from")}
                            inputFormat="MM/dd/yyyy"
                            value={dateFrom}
                            onChange={handleDateFromChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date to")}
                            inputFormat="MM/dd/yyyy"
                            value={dateTo}
                            onChange={handleDateToChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="item-location">{t('location')}</InputLabel>
                        <Select
                            labelId="item-location"
                            id="item-location-select"
                            value={location}
                            label={t("location")}
                            onChange={handleLocationChange}
                        >
                            {
                                fetchedLocations.map(location => {
                                    return <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="products-label">{t('choose products')}</InputLabel>
                        <Select
                            label={t('choose products')}
                            labelId="products-label"
                            id="select-products"
                            value={selectedProducts}
                            onChange={selectedProductsChangeHandler}
                        >
                            {fetchedProducts.data.map((product) => (
                                <MenuItem
                                    key={product.id}
                                    value={product.id}
                                >
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="services-label">{t('choose services')}</InputLabel>
                        <Select
                            label={t('choose services')}
                            labelId="services-label"
                            id="select-services"
                            value={selectedServices}
                            onChange={selectedServicesChangeHandler}
                        >
                            {fetchedServices.data.map((service) => (
                                <MenuItem
                                    key={service.id}
                                    value={service.id}
                                >
                                    {service.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {roleName !== 'artist' && (
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth sx={{ minWidth: '200px' }} >
                            <InputLabel id="item-employee">{t('Employee')}</InputLabel>
                            <Select
                                labelId="item-employee"
                                id="item-employee-select"
                                value={employee}
                                label={t('Employee')}
                                onChange={handleEmplloyeeChange}
                            >
                                {fetchedEmployees.map((employee) => (
                                    <MenuItem
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                {/* <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <InputLabel id="booking-type">{t('booking type')}</InputLabel>
                        <Select
                            labelId="booking-type"
                            id="item-employee-select"
                            value={bookingType}
                            label={t('booking type')}
                            onChange={handleBookingTypeChange}
                        >
                            <MenuItem value='services'>{t('services')}</MenuItem>
                            <MenuItem value='deals'>{t('deals')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <InputLabel id="booking-status">{t('booking status')}</InputLabel>
                        <Select
                            labelId="booking-status"
                            id="item-status-select"
                            value={bookingStatus}
                            label={t('booking status')}
                            onChange={handleBookingStatusChange}
                        >
                            <MenuItem value='completed'>{t('completed')}</MenuItem>
                            <MenuItem value='pending'>{t('pending')}</MenuItem>
                            <MenuItem value='approved'>{t('approved')}</MenuItem>
                            <MenuItem value='in progress'>{t('in progress')}</MenuItem>
                            <MenuItem value='canceled'>{t('canceled')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <InputLabel id="payment-status">{t('payment status')}</InputLabel>
                        <Select
                            labelId="payment-status"
                            id="payment-status-select"
                            value={paymentStatus}
                            label={t('payment status')}
                            onChange={handlePaymentStatusChange}
                        >
                            <MenuItem value='completed'>{t('completed')}</MenuItem>
                            <MenuItem value='pending'>{t('pending')}</MenuItem>
                            <MenuItem value='refunded'>{t('refunded')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <InputLabel id="payment-method">{t('payment method')}</InputLabel>
                        <Select
                            labelId="payment-method"
                            id="payment-method-select"
                            value={paymentMethod}
                            label={t('payment method')}
                            onChange={handlePaymentMethodChange}
                        >
                            <MenuItem value='cash'>{t('cash')}</MenuItem>
                            <MenuItem value='card'>{t('card')}</MenuItem>
                            <MenuItem value='transfer'>{t('transfer')}</MenuItem>
                            <MenuItem value='online'>{t('online')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <SearchCustomer selectCustomer={selectCustomer} resetSearchData={resetSearchData} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ActionsWrapper>
                        <FilterButton onClick={ConfirmFilteringHandler} endIcon={<FilterAltIcon />} >{t('filter')}</FilterButton>
                        <ResetButton onClick={resetFilteringHandler} endIcon={<RestartAltIcon />} >{t('reset')}</ResetButton>
                    </ActionsWrapper>
                </Grid>
            </Grid>
        </FiltersWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedLocations: state.locations.locations,
        fetchedProducts: state.products.products,
        fetchedServices: state.services.services,
        fetchedCustomers: state.customers.customers,
        fetchedEmployees: state.employees.employees,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
        fetchServicesHandler: (lang, page, sortBy, sortDirection, search) => dispatch(fetchServices(lang, page, sortBy, sortDirection, search)),
        fetchProductsHandler: (lang, page, sortBy, sortDirection, search) => dispatch(fetchProducts(lang, page, sortBy, sortDirection, search)),
        fetchEmployeesHandler: (language) => dispatch(fetchEmployees(language)),
        filterTabularReportHandler: (params) => dispatch(filterTabularReport(params)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);