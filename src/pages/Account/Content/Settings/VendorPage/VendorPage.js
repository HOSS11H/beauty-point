import { Alert, Backdrop, Button, CircularProgress, Grid, Skeleton, Snackbar, TextField } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useOutletContext } from "react-router-dom";
import TagsInput from 'react-tagsinput';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import v1 from '../../../../../utils/axios-instance-v1';
import RegisterMap from "./VendorMap/VendorMap";

import 'react-tagsinput/react-tagsinput.css'
import AuthContext from "../../../../../store/auth-context";
import styled from 'styled-components';

const SwitchWrapper = styled.div`
    display: flex;
    align-items: center;
    @media screen and ( max-width: 600px ) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
`

export default function VendorPage(props) {
    const [formIsDirty, handleformIsDirty] = useOutletContext()

    const { t } = useTranslation()

    const authCtx = useContext(AuthContext);

    const { roleName } = authCtx;


    const [primary_contact, setPrimaryContact] = useState('');
    const [secondary_contact, setSecondaryContact] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [hasWifi, setHasWifi] = useState(false);
    const [hasWc, setHasWc] = useState(false);
    const [hasTv, setHasTv] = useState(false);
    const [hasLounge, setHasLounge] = useState(false);
    const [hasCoffee, setHasCoffee] = useState(false);
    const [hasMasjid, setHasMasjid] = useState(false);
    const [inHouse, setInHouse] = useState(false);
    const [inHousePrice, setInHousePrice] = useState(0);
    const [inSaloon, setInSaloon] = useState(false);
    const [inSaloonPrice, setInSaloonPrice] = useState(0);
    const [inCustomerHouse, setInCustomerHouse] = useState(false);
    const [inCustomerHousePrice, setInCustomerHousePrice] = useState(0);
    const [tags, setTags] = useState([])
    const [seo_keywords, setKeywords] = useState('');
    const [seo_description, setSeoDescription] = useState('');
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)
    const [marker, setMarker] = useState(null)

    useEffect(() => {
        v1.get('/vendors/settings/vendor_page')
            .then(res => {
                setPrimaryContact(res.data.primary_contact)
                setSecondaryContact(res.data.secondary_contact)
                setAddress(res.data.address)
                setDescription(res.data.description)
                setMarker({ lat: +res.data.latitude, lng: +res.data.longitude })
                if (res.data.seo_keywords !== null) {
                    setTags(res.data.seo_keywords.split(','))
                }
                setHasWifi(res.data.has_wifi)
                setHasWc(res.data.has_wc)
                setHasTv(res.data.has_tv)
                setHasLounge(res.data.has_lounge)
                setHasCoffee(res.data.has_coffee)
                setHasMasjid(res.data.has_masjid)
                setInHouse(res.data.in_house_available)
                setInHousePrice(res.data.in_house)
                setInSaloon(res.data.in_saloon_available)
                setInSaloonPrice(res.data.in_saloon)
                setInCustomerHouse(res.data.in_customer_house_available)
                setInCustomerHousePrice(res.data.in_customer_house)
                setSeoDescription(res.data.seo_description ?? '')
                setShow(false)
            })
    }, [])
    function handleTagChange(input) {
        setTags(input)
        handleformIsDirty(true)
        setKeywords(input.toString())
    }
    function submitForm() {
        setOpen(true)
        console.log(inCustomerHouse)
        v1.post('/vendors/settings/vendor_page', {
            address,
            description,
            primary_contact,
            secondary_contact,
            seo_keywords,
            seo_description,
            latitude: marker.lat,
            longitude: marker.lng,
            has_wifi: hasWifi,
            has_wc: hasWc,
            has_tv: hasTv,
            has_lounge: hasLounge,
            has_coffee: hasCoffee,
            has_masjid: hasMasjid,
            in_house_available: inHouse,
            in_house: +inHousePrice,
            in_saloon_available: inSaloon,
            in_saloon: +inSaloonPrice,
            in_customer_house_available: inCustomerHouse,
            in_customer_house: +inCustomerHousePrice,
        }).then(res => {
            setSuccess(true)
            setOpen(false)
            handleformIsDirty(false)
        }).catch(err => {
            //console.log(err.message)
            setOpen(false)
            handleformIsDirty(true)
        })
    }
    function handleClose() {
        setSuccess(false)
    }
    const assignCoords = (lat, lng) => {
        handleformIsDirty(true)
        setMarker({
            lat: lat,
            lng: lng,
            defaultAnimation: 2,
        })
    }

    const primaryContactChangeHandler = (e) => {
        handleformIsDirty(true)
        setPrimaryContact(e.target.value)
    }
    const secondaryContactChangeHandler = (e) => {
        handleformIsDirty(true)
        setSecondaryContact(e.target.value)
    }
    const addressChangeHandler = (e) => {
        handleformIsDirty(true)
        setAddress(e.target.value)
    }
    const descriptionChangeHandler = (e) => {
        handleformIsDirty(true)
        setDescription(e.target.value)
    }
    const seoChangeHandler = (e) => {
        handleformIsDirty(true)
        setSeoDescription(e.target.value)
    }
    const hasWifiChangeHandler = (e) => {
        handleformIsDirty(true)
        setHasWifi(e.target.checked)
    }
    const hasWcChangeHandler = (e) => {
        handleformIsDirty(true)
        setHasWc(e.target.checked)
    }
    const hasTvChangeHandler = (e) => {
        handleformIsDirty(true)
        setHasTv(e.target.checked)
    }
    const hasLoungeChangeHandler = (e) => {
        handleformIsDirty(true)
        setHasLounge(e.target.checked)
    }
    const hasCoffeeChangeHandler = (e) => {
        handleformIsDirty(true)
        setHasCoffee(e.target.checked)
    }
    const hasMasjidChangeHandler = (e) => {
        handleformIsDirty(true)
        setHasMasjid(e.target.checked)
    }

    const inHouseChangeHandler = (e) => {
        handleformIsDirty(true)
        setInHouse(e.target.checked)
    }
    const inHousePriceChangeHandler = (e) => {
        handleformIsDirty(true)
        setInHousePrice(e.target.value)
    }
    const inSaloonChangeHandler = (e) => {
        handleformIsDirty(true)
        setInSaloon(e.target.checked)
    }
    const inSaloonPriceChangeHandler = (e) => {
        handleformIsDirty(true)
        setInSaloonPrice(e.target.value)
    }
    const inCustomerHouseChangeHandler = (e) => {
        handleformIsDirty(true)
        setInCustomerHouse(e.target.checked)
    }
    const inCustomerHousePriceChangeHandler = (e) => {
        handleformIsDirty(true)
        setInCustomerHousePrice(e.target.value)
    }

    console.log(inHouse)

    return (
        <>
            {
                show ?
                    <SkeletonForm />
                    :
                    <Fragment>
                        <CssBaseline />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField value={primary_contact} onChange={primaryContactChangeHandler} fullWidth label={t('Primary Phone')} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={secondary_contact} onChange={secondaryContactChangeHandler} fullWidth label={t('Secondary Phone')} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={address} onChange={addressChangeHandler} multiline minRows={4} fullWidth label={t('Address')} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={description} onChange={descriptionChangeHandler} multiline minRows={4} fullWidth label={t('Description')} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormLabel sx={{ mb: 2 }} component="legend">{t('facilities')}</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch checked={hasWifi} onChange={hasWifiChangeHandler} name='wifi' />
                                            }
                                            label={t('wifi')}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch checked={hasCoffee} onChange={hasCoffeeChangeHandler} name='coffee' />
                                            }
                                            label={t('coffee')}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch checked={hasLounge} onChange={hasLoungeChangeHandler} name='lounge' />
                                            }
                                            label={t('lounge')}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch checked={hasWc} onChange={hasWcChangeHandler} name='wc' />
                                            }
                                            label={t('WC')}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch checked={hasTv} onChange={hasTvChangeHandler} name='tv' />
                                            }
                                            label={t('TV')}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch checked={hasMasjid} onChange={hasMasjidChangeHandler} name='masjid' />
                                            }
                                            label={t('masjid')}
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            {roleName === 'artist' && (
                                <Grid item xs={12} md={6} >
                                    <FormControl component="fieldset" variant="standard">
                                        <FormLabel sx={{ mb: 2 }} component="legend">{t('Bookings Places')}</FormLabel>
                                        <FormGroup sx={{ gap: 2 }} >
                                            <SwitchWrapper>
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={inHouse} onChange={inHouseChangeHandler} name='house-price' />
                                                    }
                                                    label={t('in house')}
                                                />
                                                {inHouse && <TextField id="house-price" type='number' label={t('price')} variant="outlined" value={inHousePrice} onChange={inHousePriceChangeHandler} />}
                                            </SwitchWrapper>
                                            <SwitchWrapper>
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={inSaloon} onChange={inSaloonChangeHandler} name='saloon-price' />
                                                    }
                                                    label={t('in saloon')}
                                                />
                                                {inSaloon && <TextField id="saloon-price" type='number' label={t('price')} variant="outlined" value={inSaloonPrice} onChange={inSaloonPriceChangeHandler} />}
                                            </SwitchWrapper>
                                            <SwitchWrapper>
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={inCustomerHouse} onChange={inCustomerHouseChangeHandler} name='customer-price' />
                                                    }
                                                    label={t('in customer house')}
                                                />
                                                {inCustomerHouse && <TextField id="customer-price" type='number' label={t('price')} variant="outlined" value={inCustomerHousePrice} onChange={inCustomerHousePriceChangeHandler} />}
                                            </SwitchWrapper>
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <TagsInput value={tags} onChange={handleTagChange} inputProps={{ placeholder: t("Keywords") }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField value={seo_description} onChange={seoChangeHandler} multiline minRows={4} fullWidth label={t('SEO Description')} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <RegisterMap assignCoords={assignCoords} marker={marker} />
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                                <Button variant="contained" color="secondary" sx={{ minWidth: '30%' }} size="large" onClick={submitForm}>{t('Save')}</Button>
                            </Grid>
                        </Grid>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            open={success}
                            onClose={handleClose}
                            key={'bottom-right'}
                        >
                            <Alert onClose={handleClose} severity="success" fullWidth>{t('Saved Successfuly')}</Alert>
                        </Snackbar>
                    </Fragment>
            }
        </>
    );
}
function SkeletonForm() {
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={150} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={150} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={150} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={300} />
                </Grid>
            </Grid>
        </Fragment>
    );
}
