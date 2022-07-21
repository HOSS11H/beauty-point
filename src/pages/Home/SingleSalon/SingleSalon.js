import CoffeeIcon from '@mui/icons-material/Coffee';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MosqueIcon from '@mui/icons-material/Mosque';
import PushPinIcon from '@mui/icons-material/PushPin';
import ShareIcon from '@mui/icons-material/Share';
import SignalWifi3BarIcon from '@mui/icons-material/SignalWifi3Bar';
import TvIcon from '@mui/icons-material/Tv';
import WcIcon from '@mui/icons-material/Wc';
import WeekendIcon from '@mui/icons-material/Weekend';
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
import { Helmet } from 'react-helmet';
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

const FacilitiesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`
const FacilitiesItem = styled.div`
    display: flex;
    align-items: center;
    & .MuiSvgIcon-root {
        color: ${ ( { theme } ) => theme.vars.primary };
        margin-right: 10px;
        font-size: 16px;
    }
`
const FaclilityText = styled.h6`
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    color: ${ ( { theme } ) => theme.palette.text.primary };
    text-transform: capitalize;
`

const dealsRowsPerPage = 9

const SingleSalon = props => {

    const [searchParams] = useSearchParams();
    const navedTo = searchParams.get('tab');

    const { t } = useTranslation();

    const param = useParams();

    const [value, setValue] = useState(0);


    const [dealsPage, setDealsPage] = useState(0);

    const [salon, setSalon] = useState();
    const [loading, setLoading] = useState(false);

    const [deals, setDeals] = useState({ data: [] });
    const [loadingDeals, setLoadingDeals] = useState(false);

    const [showModal, setShowModal] = useState(navedTo === 'cart' ? true : false);

    const [messageShown, setMessageShown] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`/companies/${param.salonId}?include[]=vendor_page&include[]=booking_times`)
            .then(res => {
                setLoading(false);
                setSalon(res.data);
            })
            .catch(err => {
                setLoading(false);
                //console.log(err);
            })
    }, [param.salonId])

    useEffect(() => {
        setLoadingDeals(true);
        axios.get(`/companies/${param.salonId}/deals?page=${dealsPage + 1}&per_page=${dealsRowsPerPage}&include[]=company`)
            .then(res => {
                setDeals(res.data);
                setLoadingDeals(false);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [dealsPage, param.salonId])


    const handleDealChangePage = React.useCallback((event, newPage) => {
        setDealsPage(newPage);
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const openShowModalHandler = useCallback(() => {
        setShowModal(true);
    }, [])
    const closeShowModalHandler = useCallback(() => {
        setShowModal(false);
    }, [])

    const copySalonUrlHandler = () => {
        navigator.clipboard.writeText(window.location.href);
        setMessageShown(true);
    }
    const copySalonLocationHandler = () => {
        navigator.clipboard.writeText(`https://maps.google.com/maps?q=${salon.vendor_page.latitude},${salon.vendor_page.longitude}`);
        setMessageShown(true);
    }
    const closeMessageHandler = () => {
        setMessageShown(false);
    }

    let content;

    if (loading || loadingDeals) {
        content = (
            <Loader height='200px' />
        );
    }
    if (salon && !loading) {
        content = (
            <Box sx={{ width: '100%' }}>
                <Helmet>
                    {salon.companyName && <title>{salon.companyName}</title>}
                    {salon.vendor_page.description && <meta name="description" content={salon.vendor_page.description} />}
                    {salon.vendor_page.seo_keywords && <meta name="keywords" content={salon.vendor_page.seo_keywords} />}
                </Helmet>
                <Typography component="div" variant="h4" sx={{ marginBottom: '10px' }} >
                    {salon.companyName}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8} >
                        <Typography component="div" color='primary' variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', }}>
                            <PushPinIcon sx={{ mr: 1, width: '15px', height: '15px' }} />{salon.vendor_page.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} >
                        <ActionsWrapper>
                            <ActionButton onClick={openShowModalHandler}><EventIcon sx={{ mr: '5px' }} />{t('book')}</ActionButton>
                            <ActionButton onClick={copySalonUrlHandler}><ShareIcon sx={{ mr: '5px' }} /> {t('share')}</ActionButton>
                            <ActionButton onClick={copySalonLocationHandler}><LocationOnIcon sx={{ mr: '5px' }} /> {t('location')}</ActionButton>
                        </ActionsWrapper>
                    </Grid>
                </Grid>
                <Cart salonData={salon} show={showModal} onClose={closeShowModalHandler} />
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
                                {salon.vendor_page.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography component="div" variant="h5" sx={{ marginBottom: '10px' }} >
                                {t('facilities')}
                            </Typography>
                            <FacilitiesList>
                                {salon.vendor_page.has_wifi && (
                                    <FacilitiesItem>
                                        <SignalWifi3BarIcon />
                                        <FaclilityText>{t('wifi')}</FaclilityText>
                                    </FacilitiesItem>
                                ) }
                                {salon.vendor_page.has_coffee && (
                                    <FacilitiesItem>
                                        <CoffeeIcon />
                                        <FaclilityText>{t('coffee')}</FaclilityText>
                                    </FacilitiesItem>
                                ) }
                                {salon.vendor_page.has_lounge && (
                                    <FacilitiesItem>
                                        <WeekendIcon />
                                        <FaclilityText>{t('lounge')}</FaclilityText>
                                    </FacilitiesItem>
                                ) }
                                {salon.vendor_page.has_masjid && (
                                    <FacilitiesItem>
                                        <MosqueIcon />
                                        <FaclilityText>{t('masjid')}</FaclilityText>
                                    </FacilitiesItem>
                                ) }
                                {salon.vendor_page.has_tv && (
                                    <FacilitiesItem>
                                        <TvIcon />
                                        <FaclilityText>{t('TV')}</FaclilityText>
                                    </FacilitiesItem>
                                ) }
                                {salon.vendor_page.has_wc && (
                                    <FacilitiesItem>
                                        <WcIcon />
                                        <FaclilityText>{t('WC')}</FaclilityText>
                                    </FacilitiesItem>
                                ) }
                            </FacilitiesList>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography component="div" variant="h5" sx={{ marginBottom: '10px' }} >
                                {t('timing')}
                            </Typography>
                            <TableContainer component={Paper} sx={{ my: 2 }}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                        {salon.booking_times.map((item) => {
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
                        <Grid item xs={12}>
                            <VendorMap marker={{ lat: +salon.vendor_page.latitude, lng: +salon.vendor_page.longitude }} />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Services salonId={salon.id} />
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
                <Container maxWidth="lg">
                    {content}
                </Container>
                <CustomizedSnackbars show={messageShown} message={t('Copied !')} type='success' onClose={closeMessageHandler} />
            </Wrapper>
        </HomeLayout>
    )
}
export default SingleSalon;