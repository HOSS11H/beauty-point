//import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PushPinIcon from '@mui/icons-material/PushPin';
import ShareIcon from '@mui/icons-material/Share';
import { Container, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import styled from 'styled-components';
import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import { CustomButton } from "../../../components/UI/Button/Button";
import TablePaginationActions from "../../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import DealPanel from '../../../components/UI/DealPanel/DealPanel';
import Loader from "../../../components/UI/Loader/Loader";
import CustomizedSnackbars from "../../../components/UI/SnackBar/SnackBar";
import TabPanel from "../../../components/UI/TabPanel/TabPanel";
import { a11yProps } from "../../../shared/utility";
import axios from '../../../utils/axios-instance';
import Cart from "./Cart/Cart";
import Services from './Services/Services';
import VendorMap from "./VendorMap/VendorMap";



const Wrapper = styled.section`
    padding: 70px 0px;
`


const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`
const ActionButton = styled(CustomButton)`
    &.MuiButton-root {
        margin-right: 20px;
        width: auto;
        padding: 0 10px;
        height: 56px;
        flex-shrink: 0;
        margin-bottom: 0;
        &:last-child {
            margin-right: 0;
        }
    }
`

const dealsRowsPerPage = 9

const SingleArtist = props => {

    const [searchParams] = useSearchParams();
    const navedTo = searchParams.get('tab');

    const { t } = useTranslation();

    const param = useParams();

    const [value, setValue] = useState(0);

    const [dealsPage, setDealsPage] = useState(0);

    const [artist, setArtist] = useState();
    const [ loading, setLoading ] = useState(false);


    const [deals, setDeals] = useState({data: []});
    const [loadingDeals, setLoadingDeals] = useState(false);

    const [showModal, setShowModal] = useState(navedTo === 'cart' ? true : false);

    const [messageShown, setMessageShown] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`/companies/${param.artistId}?include[]=vendor_page&include[]=booking_times`)
            .then(res => {
                setLoading(false);
                setArtist(res.data);
            })
            .catch(err => {
                setLoading(false);
                //console.log(err);
            })
    }, [param.artistId])

    useEffect(() => {
        setLoadingDeals(true);
        axios.get(`/companies/${param.artistId}/deals?page=${dealsPage + 1}&per_page=${dealsRowsPerPage}&include[]=company`)
            .then(res => {
                setDeals(res.data);
                setLoadingDeals(false);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [dealsPage, param.artistId])

    const handleDealChangePage = React.useCallback((event, newPage) => {
        setDealsPage(newPage);
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    /* const openShowModalHandler = useCallback(() => {
        setShowModal(true);
    }, []) */
    const closeShowModalHandler = useCallback(() => {
        setShowModal(false);
    }, [])

    const copyArtistUrlHandler = () => {
        navigator.clipboard.writeText(window.location.href);
        setMessageShown(true);
    }
    const copyArtistLocationHandler = () => {
        navigator.clipboard.writeText(`https://maps.google.com/maps?q=${artist.vendor_page.latitude},${artist.vendor_page.longitude}`);
        setMessageShown(true);
    }
    const closeMessageHandler = () => {
        setMessageShown(false);
    }

    let content ;

    if ( loading || loadingDeals ) {
        content = (
            <Loader height='200px' />
        );
    }
    if ( artist && !loading) {
        content = (
            <Box sx={{ width: '100%' }}>
                <Helmet>
                    {artist.companyName && <title>{artist.companyName}</title>}
                    {artist.vendor_page.description && <meta name="description" content={artist.vendor_page.description} />}
                    {artist.vendor_page.seo_keywords && <meta name="keywords" content={artist.vendor_page.seo_keywords} />}
                </Helmet>
                <Typography component="div" variant="h4" sx={{ marginBottom: '10px' }} >
                    {artist.companyName}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8} >
                        <Typography component="div" color='primary' variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', }}>
                            <PushPinIcon sx={{ mr: 1, width: '15px', height: '15px' }} />{artist.vendor_page.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} >
                        <ActionsWrapper>
                            {/* <ActionButton onClick={openShowModalHandler}><EventIcon sx={{ mr: '5px' }} />{t('book')}</ActionButton> */}
                            <ActionButton onClick={copyArtistUrlHandler}><ShareIcon sx={{ mr: '5px' }} /> {t('share')}</ActionButton>
                            <ActionButton onClick={copyArtistLocationHandler}><LocationOnIcon sx={{ mr: '5px' }} /> {t('location')}</ActionButton>
                        </ActionsWrapper>
                    </Grid>
                </Grid>
                <Cart artistData={artist} show={showModal} onClose={closeShowModalHandler} />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t('overview')} {...a11yProps(0)} />
                        <Tab label={t('services')} {...a11yProps(1)} />
                        <Tab label={t('deals')} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography component="div" variant="h5" sx={{ marginBottom: '10px' }} >
                                {t('description')}
                            </Typography>
                            <Typography component="div" variant="h6" sx={{ marginBottom: '10px' }} >
                                {artist.vendor_page.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography component="div" variant="h5" sx={{ marginBottom: '10px' }} >
                                {t('timing')}
                            </Typography>
                            <TableContainer component={Paper} sx={{ my: 2 }}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                        {artist.booking_times.map((item) => {
                                            if (item.status === 'enabled') {
                                                return (
                                                    <TableRow
                                                        key={item.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {t(item.day)}
                                                        </TableCell>
                                                        <TableCell align="center">{t('from')} {item.start_time} {t('to')}  {item.end_time}</TableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid  item xs={12}>
                            <VendorMap marker={ { lat: +artist.vendor_page.latitude, lng: +artist.vendor_page.longitude } } />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Services artistId={artist.id} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {
                        deals.data.length > 0 && (
                            <>
                                <Grid container spacing={2}>
                                    {deals.data.map(deal => {
                                        return (
                                            <Grid item xs={12} sm={6} md={4} key={deal.id}>
                                                <DealPanel deal={deal} path='../deals' />
                                            </Grid>
                                        )
                                    })
                                    }
                                </Grid>
                                <TablePaginationActions
                                    component="div"
                                    count={deals.data.length}
                                    total={deals.meta ? deals.meta.total : null}
                                    rowsPerPage={dealsRowsPerPage}
                                    page={dealsPage}
                                    onPageChange={handleDealChangePage}
                                    loading={loadingDeals}
                                />
                            </>
                        )
                    }
                </TabPanel>
            </Box>
        )
    }
    return (
        <HomeLayout>
            <Wrapper>
                <HelmetProvider>
                    <Container maxWidth="lg">
                        {content}
                    </Container>
                    <CustomizedSnackbars show={messageShown} message={t('Copied !')} type='success' onClose={closeMessageHandler} />
                </HelmetProvider>
            </Wrapper>
        </HomeLayout>
    )
}
export default SingleArtist;