import { Grid } from '@mui/material';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState, } from 'react';
import {  fetchLocations, fetchCustomers, filterBookings } from '../../../../../store/actions/index';
import { connect } from 'react-redux';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import ThemeContext from '../../../../../store/theme-context';
import { CustomButton } from '../../../../../components/UI/Button/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { format } from 'date-fns';
import Card from '@mui/material/Card';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        max-width: 100%;
        margin: auto;
        overflow: hidden;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius:20px;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        display: flex;
        position: relative;
        margin-bottom: 30px;
    }
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

    const { fetchedLocations, fetchLocationsHandler, fetchedCustomers, fetchCustomersHandler, filterBookingsHandler } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    const [location, setLocation] = useState('');

    const [date, setDate] = useState('');

    const [customer, setCustomer] = useState('');

    const [bookingStatus, setBookingStatus] = useState('');


    useEffect(() => {
        fetchLocationsHandler(lang);
        fetchCustomersHandler(lang);
    }, [fetchCustomersHandler, fetchLocationsHandler, lang])

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleDateChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDate(formattedVal);
    }

    const handleCustomerChange = (event) => {
        setCustomer(event.target.value);
    }
    const handleBookingStatusChange = (event) => {
        setBookingStatus(event.target.value);
    }

    const ConfirmFilteringHandler = ( ) => {
        filterBookingsHandler(date, location,  customer,  bookingStatus);
    }

    const resetFilteringHandler = ( ) => {
        setLocation('');
        setDate('');
        setCustomer('');
        setBookingStatus('');
        filterBookingsHandler('', '', '', '', '');
    }


    return (
        <CustomCardMui>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date")}
                            inputFormat="MM/dd/yyyy"
                            value={date}
                            onChange={handleDateChange}
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
                            label={t("Location")}
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
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <InputLabel id="item-customer">{t('Customer')}</InputLabel>
                        <Select
                            labelId="item-customer"
                            id="item-customer-select"
                            value={customer}
                            label="Customer"
                            onChange={handleCustomerChange}
                        >
                            {fetchedCustomers.map((customer) => (
                                <MenuItem
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }} >
                        <InputLabel id="booking-status">{t('booking status')}</InputLabel>
                        <Select
                            labelId="booking-status"
                            id="item-status-select"
                            value={bookingStatus}
                            label="booking status"
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
                    <ActionsWrapper>
                        <FilterButton onClick={ConfirmFilteringHandler} endIcon={<FilterAltIcon />} >{t('filter')}</FilterButton>
                        <ResetButton onClick={resetFilteringHandler}  endIcon={<RestartAltIcon />} >{t('reset')}</ResetButton>
                    </ActionsWrapper>
                </Grid>
            </Grid>
        </CustomCardMui>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedLocations: state.locations.locations,
        fetchedCustomers: state.customers.customers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
        fetchCustomersHandler: (lang) => dispatch(fetchCustomers(lang)),
        filterBookingsHandler: ( date, location, customer, bookingStatus ) => dispatch(filterBookings( date, location, customer, bookingStatus )),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);