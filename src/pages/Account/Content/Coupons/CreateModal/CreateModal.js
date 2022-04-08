import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';

const CustomTextField = styled(TextField)`
    width: 100%;
`

const CreateModal = (props) => {

    const { show, heading, confirmText, onClose, addSuccess, onConfirm } = props;

    const { t } = useTranslation();

    const [couponTitle, setCouponTitle] = useState('');
    const [couponTitleError, setCouponTitleError] = useState(false);

    const [couponCode, setCouponCode] = useState('');
    const [couponCodeError, setCouponCodeError] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [hasEndDate, setHasEndDate] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const [couponAmount, setCouponAmount] = useState(0);
    const [couponAmountError, setCouponAmountError] = useState(false);

    const [discountType, setDiscountType] = useState('percentage')

    const [couponStatus, setCouponStatus] = useState('active')

    const couponTitleChangeHandler = (event) => {
        setCouponTitle(event.target.value);
        setCouponTitleError(false);
    }
    const couponCodeChangeHandler = (event) => {
        setCouponCode(event.target.value);
        setCouponCodeError(false);
    }
    const handleStartDateChange = (startDate) => {
        setStartDate(startDate);
    }
    const handleEndDateChange = (startDate) => {
        setEndDate(startDate);
    }

    const hasEndDateHandleChange = (event) => {
        setHasEndDate(event.target.checked);
    };


    const couponAmountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setCouponAmount(event.target.value);
            setCouponAmountError(false);
        }
    }

    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }

    const couponStatusChangeHandler = (event) => {
        setCouponStatus(event.target.value);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose]);


    const resetModalData = useCallback(() => {
        setCouponTitle('');
        setCouponTitleError(false);
        setCouponCode('');
        setCouponCodeError(false);
        setStartDate(new Date());
        setHasEndDate(false);
        setEndDate(new Date());
        setCouponAmount(0);
        setCouponAmountError(false);
        setDiscountType('percentage')
        setCouponStatus('active')
    }, [])

    useEffect(() => {
        addSuccess && resetModalData();
    }, [addSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {

        if (couponTitle.trim().length === 0) {
            setCouponTitleError(true);
            return;
        }
        if (couponCode.trim().length === 0) {
            setCouponCodeError(true);
            return;
        }
        if (couponAmount === 0) {
            setCouponAmountError(true);
            return;
        }
        let formData = new FormData();
        formData.append('title', couponTitle);
        formData.append('code', couponCode);
        formData.append('amount', couponAmount);
        formData.append('start_time', format(startDate, 'Y-MM-dd hh:ii a'));
        formData.append('discount_type', discountType);
        formData.append('status', couponStatus);
        if (hasEndDate) {
            formData.append('end_time', format(endDate, 'Y-MM-dd hh:ii a'));
        }
        onConfirm(formData);
    }, [couponTitle, couponCode, couponAmount, startDate, discountType, couponStatus, hasEndDate, onConfirm, endDate])


    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="coupon-title" label={t('title')} variant="outlined" value={couponTitle} onChange={couponTitleChangeHandler} />
                {couponTitleError && <ValidationMessage notExist>{t(`Please add title`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="coupon-code" label={t('coupon code')} variant="outlined" value={couponCode} onChange={couponCodeChangeHandler} />
                {couponCodeError && <ValidationMessage notExist>{t(`Please add code`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6} >
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                        label={t("Date from")}
                        inputFormat="dd/MM/yyyy"
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormGroup>
                    <FormControlLabel control={<Switch checked={hasEndDate} onChange={hasEndDateHandleChange} />} label={t("Has End Date ?")} />
                </FormGroup>
            </Grid>
            {hasEndDate && (
                <Grid item xs={12} sm={6} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date to")}
                            inputFormat="dd/MM/yyyy"
                            value={endDate}
                            onChange={handleEndDateChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            )}
            <Grid item xs={12} sm={6}>
                <CustomTextField id="coupon-amount" type='number' label={t('amount')} variant="outlined" value={couponAmount} onChange={couponAmountChangeHandler} />
                {couponAmountError && <ValidationMessage notExist>{t(`Please add amount`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="discount-label">{t('discount type')}</InputLabel>
                    <Select
                        label={t('discount type')}
                        labelId="discount-label"
                        value={discountType}
                        onChange={discountTypeChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='percentage'>{t('percentage')}</MenuItem>
                        <MenuItem value='amount'>{t('fixed')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="coupon-status">{t('status')}</InputLabel>
                    <Select
                        label={t('status')}
                        labelId="coupon-status"
                        value={couponStatus}
                        onChange={couponStatusChangeHandler}
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

const mapStateToProps = (state) => {
    return {
        creatingCouponSuccess: state.coupons.creatingCouponSuccess,
    }
}

export default connect(mapStateToProps, null)(CreateModal);