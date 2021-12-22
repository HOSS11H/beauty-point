import { Grid } from '@mui/material';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState, } from 'react';
import { fetchLocations, filterBookings } from '../../../../../store/actions/index';
import ReactSelect from 'react-select';
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
import axios from '../../../../../utils/axios-instance';

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
        overflow: visible;
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
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#000',
    }),
    control: base => ({
        ...base,
        height: 56,
    })
};


const SearchFilters = (props) => {

    const { fetchedLocations, fetchLocationsHandler, filterBookingsHandler, page, perPage } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx;

    const [bookingId, setBookingId] = useState('');

    const [location, setLocation] = useState('');

    const [date, setDate] = useState('');

    const [customerInput, setCustomerInput] = useState('');
    const [options, setOptions] = useState([])
    const [customer, setCustomer] = useState([]);

    const [bookingStatus, setBookingStatus] = useState('');

    useEffect(() => {
        fetchLocationsHandler(lang);
    }, [fetchLocationsHandler, lang])

    const handleBookingIdChange = (event) => {
        setBookingId(event.target.value);
    }
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleDateChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDate(formattedVal);
    }

    const handleSelectOptions = (value, actions) => {
        setCustomerInput(value);
    }
    useEffect(() => {
        if (customerInput.length !== 0) {
            const searchTimeout = setTimeout(() => {
                axios.get(`/vendors/customers?term=${customerInput}`)
                    .then(res => {
                        const customers = res.data.data;
                        const options = customers.map(customer => {
                            return {
                                value: customer.id,
                                label: customer.name,
                                mobile: customer.mobile,
                            }
                        })
                        setOptions(options);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }, 1000)
            return () => clearTimeout(searchTimeout);
        }
    }, [customerInput])
    const filterOption = (option, inputValue) =>{
        if(option.data?.mobile?.includes(inputValue)){
            return true
        }
        if (option.label.toLowerCase().includes(inputValue.toLowerCase())) {
            return true
        }
    }
    const handleSelectCustomer = (value, actions) => {
        if (value) {
            setCustomer(value);
        } else {
            setCustomer([])
        }
    }
    const handleBookingStatusChange = (event) => {
        setBookingStatus(event.target.value);
    }

    const ConfirmFilteringHandler = () => {
        const searchParams = {
            term: date || bookingId,
            location_id: location,
            customer_id: customer.value,
            status: bookingStatus,
            /* page: page,
            per_page: perPage */
        }
        filterBookingsHandler(searchParams);
    }

    const resetFilteringHandler = () => {
        setBookingId('');
        setLocation('');
        setDate('');
        setOptions([]);
        setCustomer([]);
        setBookingStatus('');
        filterBookingsHandler({
            /* page: page,
            per_page: perPage */
        });
    }


    return (
        <CustomCardMui>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label={t('Booking Number')}
                        id="booking-id"
                        sx={{ flexGrow: '1' }}
                        value={bookingId}
                        onChange={handleBookingIdChange}
                    />
                </Grid>
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
                        <ReactSelect styles={customStyles} options={options} isClearable isRtl={lang === 'ar'} 
                            filterOption={filterOption}
                            placeholder={t('select customer')} value={customer}
                            onChange={handleSelectCustomer} onInputChange={handleSelectOptions} />
                    </FormControl>
                </Grid>
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
                    <ActionsWrapper>
                        <FilterButton onClick={ConfirmFilteringHandler} endIcon={<FilterAltIcon />} >{t('filter')}</FilterButton>
                        <ResetButton onClick={resetFilteringHandler} endIcon={<RestartAltIcon />} >{t('reset')}</ResetButton>
                    </ActionsWrapper>
                </Grid>
            </Grid>
        </CustomCardMui>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedLocations: state.locations.locations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
        filterBookingsHandler: (bookingId, date, location, customer, bookingStatus) => dispatch(filterBookings(bookingId, date, location, customer, bookingStatus)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);