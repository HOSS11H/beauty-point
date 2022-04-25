import PercentIcon from '@mui/icons-material/Percent';
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loader from '../../../../../components/UI/Loader/Loader';
import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';
import ThemeContext from '../../../../../store/theme-context';
import axios from '../../../../../utils/axios-instance';
import v1 from '../../../../../utils/axios-instance-v1';

const CustomTextField = styled(TextField)`
    width: 100%;
`

const EditSeat  = props => {

    const { seatId, show, heading, confirmText, onConfirm, onClose } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [loading, setLoading] = useState(true);

    const [locations, setLocations] = useState([])
    const [fetchingLocations, setFetchingLocations] = useState()

    const [seatTitle, setSeatTitle] = useState('');
    const [seatTitleError, setSeatTitleError] = useState(false);

    const [seatStatus, setSeatStatus] = useState('active');

    const [seatCommission, setSeatCommission] = useState(0);
    const [seatCommissionError, setSeatCommissionError] = useState(false);

    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState(false);

    const fetchSeat = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/seats/${seatId}?include[]=location`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                const { data } = res;
                setSeatTitle(data.title);
                setSeatStatus(data.status);
                setSeatCommission(data.commission);
                setLocation(data.location.id);
            }
            )
            .catch(err => {
                setLoading(false)
            })
    }, [seatId])

    useEffect(() => {
        fetchSeat()
    }, [fetchSeat])

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

    const confirmCreateHandler = useCallback(() => {
        if (seatTitle.trim().length === 0) {
            setSeatTitleError(true);
            return;
        }
        if (seatCommission < 0 || seatCommission > 100) {
            setSeatCommissionError(true);
            return;
        }
        if (!location) {
            setLocationError(true);
            return;
        }
        const data = {
            id: seatId,
            title: seatTitle,
            status: seatStatus,
            commission: seatCommission,
            location_id: location
        }
        onConfirm(data);
    }, [seatTitle, seatCommission, location, seatId, seatStatus, onConfirm])

    let content;
    if (fetchingLocations || loading) {
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
                            max: '100'
                        }}
                        type='number' value={seatCommission} onChange={seatCommissionChangeHandler} />
                    {seatCommissionError && <ValidationMessage notExist>{t(`Please add valid seat comission between 0% and 100%`)}</ValidationMessage>}
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
export default EditSeat