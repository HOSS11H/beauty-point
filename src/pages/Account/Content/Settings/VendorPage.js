import { Fragment, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Grid, TextField } from "@mui/material";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import v1 from '../../../../utils/axios-instance-v1'

export default function VendorPage(props) {
    const { t } = useTranslation()
    const [primary_contact, setPrimaryContact] = useState('');
    const [secondary_contact, setSecondaryContact] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([])
    const [seo_keywords, setKeywords] = useState('');
    const [seo_description, setSeoDescription] = useState('');

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
                setSeoDescription(res.data.seo_description)
            })
    }, [])
    function handleTagChange(input) {
        setTags(input)
        setKeywords(input.toString())
    }
    function submitForm() {
        v1.post('/vendors/settings/vendor_page', {
            address,
            description,
            primary_contact,
            secondary_contact,
            seo_keywords,
            seo_description
        })
    }
    return (
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
                    <TagsInput value={tags} onChange={handleTagChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={seo_description} onChange={(e) => setSeoDescription(e.target.value)} multiline minRows={4} fullWidth label={t('SEO Description')} variant="outlined" />
                </Grid>
                <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                    <Button variant="contained" color="secondary" sx={{ minWidth: '30%' }} size="large" onClick={submitForm}>{t('Save')}</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
