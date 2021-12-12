import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';
import InputLabel from '@mui/material/InputLabel';
import { format } from 'date-fns';
import InputAdornment from '@mui/material/InputAdornment';

const CustomTextField = styled(TextField)`
    width: 100%;
`

const EditModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, bookingTimes, id, editingBookingSettingsSuccess } = props;

    const bookingTimesData = bookingTimes.find( item => item.id === id );

    console.log( bookingTimesData)

    const { t } = useTranslation();

    const [openTime, setOpenTime] = useState(new Date());

    const [closeTime, setCloseTime] = useState(new Date());
    const [closeTimeError, setCloseTimeError] = useState(false);

    const [timeRequired, setTimeRequired] = useState(0);
    
    const [multipleBookings, setmMultipleBookings] = useState('yes');

    const [maximumBookings, setMaximumBookings] = useState(0);

    const [maximumBookingsPerDay, setMaximumBookingsPerDay] = useState(0);

    const [maximumBookingsPerSlot, setMaximumBookingsPerSlot] = useState(0);

    const [bookingStatus, setServiceStatus] = useState('active');


    const openTimeChangeHandler = (newValue) => {
        setOpenTime(newValue);
    }
    const closeTimeChangeHandler = (newValue) => {
        setCloseTime(newValue);
        setCloseTimeError(false);
    }
    const bookingTimeChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setTimeRequired(event.target.value);
        }
    }
    const multipleBookingsChangeHandler = (event) => {
        setmMultipleBookings(event.target.value);
    }
    const maximumBookingsChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setMaximumBookings(event.target.value);
        }
    }
    const maximumBookingsPerDayChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setMaximumBookingsPerDay(event.target.value);
        }
    }
    const maximumBookingsPerSlotChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setMaximumBookingsPerSlot(event.target.value);
        }
    }
    const bookingStatusChangeHandler = (event) => {
        setServiceStatus(event.target.value);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setTimeRequired(0);
        setServiceStatus('active');
    }, [])

    useEffect(() => {
        editingBookingSettingsSuccess && resetModalData();
    }, [editingBookingSettingsSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        const data= {}
        onConfirm(data);
    }, [onConfirm])

    let content = (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label={t('Open time')}
                        value={openTime}
                        onChange={openTimeChangeHandler}
                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label={t('Close time')}
                        value={closeTime}
                        onChange={closeTimeChangeHandler}
                        renderInput={(params) => <TextField  sx={{ width: '100%' }} {...params} />}
                    />
                </LocalizationProvider>
                { closeTimeError && <ValidationMessage notExist>{t('close time must be after open time')}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="booking-time" type='number' label={t('Slot Duration')} variant="outlined" 
                    value={timeRequired} onChange={bookingTimeChangeHandler} 
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{t('minutes')}</InputAdornment>,
                    }}
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="multiple-bookings">{t('Multiple Bookings')}</InputLabel>
                    <Select
                        labelId="multiple-bookings"
                        label={t('Multiple Bookings')}
                        value={multipleBookings}
                        onChange={multipleBookingsChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='yes'>{t('yes')}</MenuItem>
                        <MenuItem value='no'>{t('no')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="maximum-bookings" type='number' label={t('Maximum Bookings')} variant="outlined" 
                    value={maximumBookings} onChange={maximumBookingsChangeHandler} 
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="bookings-per-day" type='number' label={t('Max Bookings Per Day')} variant="outlined" 
                    value={maximumBookingsPerDay} onChange={maximumBookingsPerDayChangeHandler} 
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="bookings-per-slot" type='number' label={t('Max Bookings Per Slot')} variant="outlined" 
                    value={maximumBookingsPerSlot} onChange={maximumBookingsPerSlotChangeHandler} 
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="bookings-status">{t('Bookings Status')}</InputLabel>
                    <Select
                        labelId="bookings-status"
                        label={t('Bookings Status')}
                        value={bookingStatus}
                        onChange={bookingStatusChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='active'>{t('active')}</MenuItem>
                        <MenuItem value='inactive'>{t('inactive')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

export default EditModal;
