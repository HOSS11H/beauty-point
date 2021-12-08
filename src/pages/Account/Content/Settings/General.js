import { Fragment, useEffect, useState } from "react";
import v1 from '../../../../utils/axios-instance-v1'
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { Alert, Backdrop, Button, CircularProgress, Grid, Skeleton, Snackbar, TextField } from "@mui/material";

export default function General(props) {
    const { t } = useTranslation()
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
    useEffect(() => {
        v1.get('/vendors/settings/company')
            .then(res => {
                setName(res.data.companyName)
                setEmail(res.data.companyEmail)
                setPhone(res.data.companyPhone)
                setTax(res.data.tax_record)
                setAddress(res.data.address)
                setNotes(res.data.invoice_notes)
                setWebsite(res.data.website)
                setShow(false)
            })
    }, []);
    function submitForm() {
        setOpen(true)
        v1.post('/vendors/settings/company', {
            company_name: name,
            company_email: email,
            company_phone: phone,
            tax_record: tax,
            address: address,
            website: website,
            invoice_notes: notes
        }).then(res => {
            if (res.status === 204) {
                setSuccess(true)
            }
            setOpen(false)
        }).catch(err => {
            setOpen(false)
            console.log(err.message)
        })
    }
    function handleClose() {
        setSuccess(false)
    }
    return (
        <>
            {
                show ?
                <SkeletonForm/>
                :
                <Fragment >
                    <CssBaseline />
                    <Stack spacing={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4}>
                                <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label={t('Business Name')} variant="outlined" required />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label={t('Business Email')} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth label={t("Business Phone")} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={address} onChange={(e) => setAddress(e.target.value)} multiline minRows={4} fullWidth label={t('Address')} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={notes} onChange={(e) => setNotes(e.target.value)} multiline minRows={4} fullWidth label={t('Invoice Notes')} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={website} onChange={(e) => setWebsite(e.target.value)} fullWidth label={t('Website')} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={tax} onChange={(e) => setTax(e.target.value)} fullWidth label={t("Tax Record")} variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} md={12} sx={{textAlign: 'center'}}>
                                <Button variant="contained" color="secondary" sx={{ minWidth: '30%' }} size="large" onClick={submitForm}>{ t('Save') }</Button>
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
                        anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                        open={success}
                        onClose={handleClose}
                        key={'bottom-right'}
                    >
                        <Alert onClose={handleClose} severity="success" fullWidth>{t('Saved Successfuly') }</Alert>
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
                    <Grid item xs={6} md={4}>
                        <Skeleton variant="rectangular" height={50}/>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Skeleton variant="rectangular" height={50}/>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Skeleton variant="rectangular" height={50}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={150}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={150}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={50}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={50}/>
                    </Grid>
                </Grid>
            </Stack>
        </Fragment>
    );
}
