import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../store/theme-context'

import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';


const CustomTextField = styled(TextField)`
    width: 100%;
`






const EditModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, editingBookingSettingsSuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [timeRequired, setTimeRequired] = useState(0);

    const [serviceStatus, setServiceStatus] = useState('active');


    const serviceStatusChangeHandler = (event) => {
        setServiceStatus(event.target.value);
    }


    const serviceTimeChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setTimeRequired(event.target.value);
        }
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
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <Select
                        value={serviceStatus}
                        onChange={serviceStatusChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='active'>{t('active')}</MenuItem>
                        <MenuItem value='inactive'>{t('inactive')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                    <CustomTextField id="service-time" type='number' label={t('time')} variant="outlined" value={timeRequired} onChange={serviceTimeChangeHandler} />
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
