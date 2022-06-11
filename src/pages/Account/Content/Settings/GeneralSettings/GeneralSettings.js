import { Fragment, useEffect, useState } from "react";
import v1 from '../../../../../utils/axios-instance-v1'
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { Alert, Backdrop, Button, CircularProgress, FormControlLabel, FormGroup, Grid, Skeleton, Snackbar, Switch, TextField } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styled from 'styled-components';

import ImageUploading from 'react-images-uploading';
import { useOutletContext } from "react-router-dom";


const UploadImageTopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const UploadImageBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    max-width: 100%;
    width: 100%;
    img {
        width: 100%;
        height: 150px;
        object-fit: contain;
        max-width: 100%;
    }
`
const ImageItemBottomBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`

export default function GeneralSettings(props) {
    const [ formIsDirty, handleformIsDirty ] = useOutletContext()

    const { t } = useTranslation()
    const [uploadedLogo, setUploadedLogo] = useState([{ data_url: '' }]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [tax, setTax] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [website, setWebsite] = useState('');
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)
    const [vat, setVat] = useState(true);
    const [ webBokking, setWebBokking ] = useState(true);
    const [ appBokking, setAppBokking ] = useState(true);

    useEffect(() => {
        v1.get('/vendors/settings/company')
            .then(res => {
                setUploadedLogo([{ data_url: res.data.logo_url }])
                setName(res.data.companyName)
                setEmail(res.data.companyEmail)
                setPhone(res.data.companyPhone)
                setTax(res.data.tax_record)
                setAddress(res.data.address)
                setNotes(res.data.invoice_notes ?? '')
                setWebsite(res.data.website)
                setVat(res.data.has_vat)
                setWebBokking(res.data.web_bokking)
                setAppBokking(res.data.app_bokking)
                setShow(false)
            })
    }, []);
    function submitForm() {
        setOpen(true)
        let formData = new FormData();
        formData.append('company_name', name);
        formData.append('company_email', email);
        formData.append('company_phone', phone);
        if (uploadedLogo.length > 0 && uploadedLogo[0].data_url !== null) {
            formData.append('logo', uploadedLogo[0].file);
        }
        formData.append('tax_record', tax);
        formData.append('address', address);
        formData.append('website', website);
        formData.append('invoice_notes', notes);
        formData.append('has_vat', vat);
        v1.post('/vendors/settings/company', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                if (res.status === 204) {
                    setSuccess(true)
                }
                setOpen(false)
                handleformIsDirty(false)
            }).catch(err => {
                setOpen(false)
                handleformIsDirty(true)
            })
    }
    function handleClose() {
        setSuccess(false)
    }
    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        handleformIsDirty(true)
        setUploadedLogo(imageList);
    };
    const nameChangeHandler = (e) => {
        handleformIsDirty(true)
        setName(e.target.value)
    }
    const emailChangeHandler = (e) => {
        handleformIsDirty(true)
        setEmail(e.target.value)
    }
    const taxChangeHandler = (e) => {
        handleformIsDirty(true)
        setTax(e.target.value)
    }
    const addressChangeHandler = (e) => {
        handleformIsDirty(true)
        setAddress(e.target.value)
    }
    const notesChengeHandler = (e) => {
        handleformIsDirty(true)
        setNotes(e.target.value)
    }
    const websiteChangeHandler = (e) => {
        handleformIsDirty(true)
        setWebsite(e.target.value)
    }
    const phoneChangeHandler = (e) => {
        handleformIsDirty(true)
        setPhone(e.target.value)
    }
    const toggleVat = () => {
        handleformIsDirty(true)
        setVat(prevState => !prevState);
    }
    const toogleWebBooking = () => {
        handleformIsDirty(true)
        setWebBokking(prevState => !prevState);
    }
    const toogleAppBooking = () => {
        handleformIsDirty(true)
        setAppBokking(prevState => !prevState);
    }

    return (
        <>
            {
                show ?
                    <SkeletonForm />
                    :
                    <Fragment >
                        <CssBaseline />
                        <Stack spacing={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <ImageUploading
                                                multiple
                                                value={uploadedLogo}
                                                onChange={onImageChangeHandler}
                                                maxNumber={1}
                                                dataURLKey="data_url"
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageRemoveAll,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    isDragging,
                                                    dragProps,
                                                }) => (
                                                    // write your building UI
                                                    <div className="upload__image-wrapper">
                                                        <UploadImageBody>
                                                            {imageList.map((image, index) => (
                                                                <Grid item xs={12} key={index} >
                                                                    <div style={{ width: '100%' }} >
                                                                        <img src={image['data_url']} alt="" width="100" />
                                                                        <ImageItemBottomBar>
                                                                            <Button sx={{ mr: 1 }} size="large" variant="outlined" startIcon={<PhotoCamera />} onClick={() => onImageUpdate(index)}>
                                                                                {t('update')}
                                                                            </Button>
                                                                        </ImageItemBottomBar>
                                                                    </div>
                                                                </Grid>
                                                            ))}
                                                        </UploadImageBody>
                                                        {
                                                            uploadedLogo.length !== 1 && (
                                                                <UploadImageTopBar>
                                                                    <Button size="medium" sx={{ mr: 2, color: isDragging && 'red' }} variant="contained" startIcon={<PhotoCamera />} {...dragProps} onClick={onImageUpload} >
                                                                        {t('photos')}
                                                                    </Button>
                                                                </UploadImageTopBar>
                                                            )
                                                        }
                                                    </div>
                                                )}
                                            </ImageUploading>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField value={name} onChange={nameChangeHandler} fullWidth label={t('Business Name')} variant="outlined" required />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField value={email} onChange={emailChangeHandler} fullWidth label={t('Business Email')} variant="outlined" required />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <TextField value={tax} onChange={taxChangeHandler} fullWidth label={t("Tax Record")} variant="outlined" required />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch checked={vat} onChange={toggleVat} />} label={t("has Taxes")} />
                                                        <FormControlLabel control={<Switch checked={webBokking} onChange={toogleWebBooking} />} label={t("allow web booking")} />
                                                        <FormControlLabel control={<Switch checked={appBokking} onChange={toogleAppBooking} />} label={t("allow app booking")} />
                                                    </FormGroup>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField value={address} onChange={addressChangeHandler} multiline minRows={4} fullWidth label={t('Address')} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField value={notes} onChange={notesChengeHandler} multiline minRows={4} fullWidth label={t('Invoice Notes')} variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField value={website} onChange={websiteChangeHandler} fullWidth label={t('Website')} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField value={phone} onChange={phoneChangeHandler} fullWidth label={t("Business Phone")} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                                    <Button variant="contained" color="secondary" sx={{ minWidth: '30%' }} size="large" onClick={submitForm}>{t('Save')}</Button>
                                </Grid>
                            </Grid>
                        </Stack>
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
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" height={150} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={50} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={50} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" height={50} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={150} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={150} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={50} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={50} />
                    </Grid>
                </Grid>
            </Stack>
        </Fragment>
    );
}
