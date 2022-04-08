import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { useCallback, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CustomButton } from '../../../../../components/UI/Button/Button';
import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';

const DeleteButton = styled(CustomButton)`
    &.MuiButton-root {
        width: auto;
        padding: 0 20px;
        height: 40px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.error.main};
        font-size: 16px;
    }
`

const CustomTextField = styled(TextField)`
    width: 100%;
`


const EditCoupon = (props) => {

    const { show, heading, confirmText, onClose, onConfirm, coupon, deleteCoupon } = props;

    const { title, code, amount, status, startDateTime, endDateTime, discountType: dicount_type } = coupon;

    const { t } = useTranslation();

    const [couponTitle, setCouponTitle] = useState(title);
    const [couponTitleError, setCouponTitleError] = useState(false);

    const [couponCode, setCouponCode] = useState(code);
    const [couponCodeError, setCouponCodeError] = useState(false);

    const [startDate, setStartDate] = useState(moment.utc(startDateTime));
    const [hasEndDate, setHasEndDate] = useState(endDateTime ? true : false);
    const [endDate, setEndDate] = useState(moment.utc(endDateTime));

    const [couponAmount, setCouponAmount] = useState(amount);
    const [couponAmountError, setCouponAmountError] = useState(false);

    const [discountType, setDiscountType] = useState(dicount_type)

    const [couponStatus, setCouponStatus] = useState(status)

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
    }, [onClose])

    const confirmAddHandler = useCallback(() => {
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
        formData.append('id', coupon.id);
        formData.append('title', couponTitle);
        formData.append('code', couponCode);
        formData.append('amount', couponAmount);
        formData.append('start_time', startDate.format('YYYY-MM-DD hh:mm A'));
        formData.append('discount_type', discountType);
        formData.append('status', couponStatus);
        formData.append('_method', 'PUT');
        if (hasEndDate) {
            formData.append('end_time', endDate.format('YYYY-MM-DD hh:mm A'));
        }
        onConfirm(formData);
    }, [coupon.id, couponAmount, couponCode, couponStatus, couponTitle, discountType, endDate, hasEndDate, onConfirm, startDate])

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmAddHandler} onClose={closeModalHandler} >
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
                            inputFormat="DD/MM/yyyy"
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
                                inputFormat="DD/MM/yyyy"
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
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', }} >
                        <DeleteButton onClick={(id) => deleteCoupon(coupon.id)} >{t('Delete')}</DeleteButton>
                    </Box>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default EditCoupon;