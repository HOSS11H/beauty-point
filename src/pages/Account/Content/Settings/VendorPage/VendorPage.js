import { Fragment, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, Backdrop, Button, CircularProgress, Grid, Skeleton, Snackbar, TextField } from "@mui/material";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import v1 from '../../../../../utils/axios-instance-v1'

export default function VendorPage(props) {
    const { t } = useTranslation()
    const [primary_contact, setPrimaryContact] = useState('');
    const [secondary_contact, setSecondaryContact] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([])
    const [seo_keywords, setKeywords] = useState('');
    const [seo_description, setSeoDescription] = useState('');
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        v1.get('/vendors/settings/vendor_page')
            .then(res => {
                setPrimaryContact(res.data.primary_contact)
                setSecondaryContact(res.data.secondary_contact)
                setAddress(res.data.address)
                setDescription(res.data.description)
                if (res.data.seo_keywords !== null) {
                    setTags(res.data.seo_keywords.split(','))
                }
                setSeoDescription(res.data.seo_description ?? '')
                setShow(false)
                console.log(res.data)
            })
    }, [])
    function handleTagChange(input) {
        setTags(input)
        setKeywords(input.toString())
    }
    function submitForm() {
        setOpen(true)
        v1.post('/vendors/settings/vendor_page', {
            address,
            description,
            primary_contact,
            secondary_contact,
            seo_keywords,
            seo_description
        }).then(res => {
            setSuccess(true)
            setOpen(false)
        }).catch(err => {
            console.log(err.message)
            setOpen(false)
        })
    }
    function handleClose() {
        setSuccess(false)
    }
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
                            <TextField value={primary_contact} onChange={(e) => setPrimaryContact(e.target.value)} fullWidth label={t('Primary Phone')} variant="outlined" required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField value={secondary_contact} onChange={(e) => setSecondaryContact(e.target.value)} fullWidth label={t('Secondary Phone')} variant="outlined" required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField value={address} onChange={(e) => setAddress(e.target.value)} multiline minRows={4} fullWidth label={t('Address')} variant="outlined" required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField value={description} onChange={(e) => setDescription(e.target.value)} multiline minRows={4} fullWidth label={t('Description')} variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                                <TagsInput value={tags} onChange={handleTagChange} inputProps={{ placeholder: t("Keywords")}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={seo_description} onChange={(e) => setSeoDescription(e.target.value)} multiline minRows={4} fullWidth label={t('SEO Description')} variant="outlined" />
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
                    <Skeleton variant="rectangular" height={50}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={50}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={150} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Skeleton variant="rectangular" height={150} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={50}/>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={150}/>
                </Grid>
            </Grid>
        </Fragment>
    );
}
