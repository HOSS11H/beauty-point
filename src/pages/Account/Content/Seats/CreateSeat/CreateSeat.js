import { Grid, TextField, FormControl, Select, MenuItem, InputAdornment, InputLabel } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import PercentIcon from '@mui/icons-material/Percent';
import Loader from '../../../../../components/UI/Loader/Loader';
import { toast } from 'react-toastify';
import v1 from '../../../../../utils/axios-instance-v1';
import ThemeContext from '../../../../../store/theme-context';

const CustomTextField = styled(TextField)`
    width: 100%;
`

const CreateSeat  = props => {
    const { show, heading, confirmText, onConfirm, onClose, addSuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [locations, setLocations] = useState([])
    const [fetchingLocations, setFetchingLocations] = useState()

    const [seatTitle, setSeatTitle] = useState('');
    const [seatTitleError, setSeatTitleError] = useState(false);

    const [seatStatus, setSeatStatus] = useState('active');

    const [seatCommission, setSeatCommission] = useState(0);
    const [seatCommissionError, setSeatCommissionError] = useState(false);

    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState(false);

    useEffect(() => {
        setFetchingLocations(true)
        v1.get(`/locations`, {
            headers: {
                'Accept-Language': lang
            }
        }).then(response => {
            setFetchingLocations(false)
            setLocations(response.data)
        })
            .catch(err => {
                setFetchingLocations(false)
                toast.error(t('Error Happened'))
            })
    }, [lang, t])


    const seatTitleChangeHandler = (event) => {
        setSeatTitle(event.target.value);
        setSeatTitleError(false);
    }
    const seatStatusChangeHandler = (event) => {
        setSeatStatus(event.target.value);
    }
    const seatCommissionChangeHandler = (event) => {
        setSeatCommission(event.target.value);
        setSeatCommissionError(false);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };


    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setSeatTitle('');
        setSeatTitleError(false);
        setSeatCommission(0);
        setSeatCommissionError(false);
        setLocation('');
        setLocationError(false);
        setSeatStatus('active');
    }, [])

    useEffect(() => {
        addSuccess && resetModalData();
    }, [addSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        if (seatTitle.trim().length === 0) {
            setSeatTitleError(true);
            return;
        }
        if (seatCommission.trim().length === 0) {
            setSeatCommissionError(true);
            return;
        }
        if (!location) {
            setLocationError(true);
            return;
        }
        const data = {
            title: seatTitle,
            status: seatStatus,
            commission: seatCommission,
            location_id: location
        }
        onConfirm(data);
    }, [seatTitle, seatCommission, seatStatus, location, onConfirm])

    let content;
    if (fetchingLocations) {
        content = <Loader height='50vh' />
    } else {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="seat-title" label={t('title')} variant="outlined" value={seatTitle} onChange={seatTitleChangeHandler} />
                    {seatTitleError && <ValidationMessage notExist>{t(`Please add title`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                        <Select
                            value={seatStatus}
                            onChange={seatStatusChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='active'>{t('active')}</MenuItem>
                            <MenuItem value='inactive'>{t('inactive')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="seat-comission" label={t('seat comission')} variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                        }}
                        type='number' value={seatCommission} onChange={seatCommissionChangeHandler} />
                    {seatCommissionError && <ValidationMessage notExist>{t(`Please add seat comission`)}</ValidationMessage>}
                </Grid>
                <Grid item xs={12} sm={6} >
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
                                locations.map(location => {
                                    return <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    {locationError && <ValidationMessage notExist>{t(`Please add location`)}</ValidationMessage>}
                </Grid>
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}
export default CreateSeat