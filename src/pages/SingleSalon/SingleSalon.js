import { Container, Grid } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { NavLink, useParams } from "react-router-dom";
import PushPinIcon from '@mui/icons-material/PushPin';
import { SalonPanel, DealPanel } from '../../components/UI/SalonPanel/SalonPanel';
import { a11yProps, formatCurrency } from "../../shared/utility";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import HomeLayout from "../../components/HomeLayout/HomeLayout";
import { CustomButton } from "../../components/UI/Button/Button";
import { useCallback } from "react";
import Cart from "./Cart/Cart";
import TabPanel from "../../components/UI/TabPanel/TabPanel";
import ShareIcon from '@mui/icons-material/Share';
import CustomizedSnackbars from "../../components/UI/SnackBar/SnackBar";



const Wrapper = styled.section`
    padding: 70px 0px;
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
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


const servicesIntialRowsPerPage = 9
const dealsIntialRowsPerPage = 9

const SingleSalon = props => {

    const { t } = useTranslation();

    const param = useParams();

    const [value, setValue] =useState(0);

    const [servicesPage, setServicesPage] = useState(0);
    const [servicesRowsPerPage, setServicesRowsPerPage] = useState(servicesIntialRowsPerPage);

    const [dealsPage, setDealsPage] = useState(0);
    const [dealsRowsPerPage, setDealsRowsPerPage] = useState(dealsIntialRowsPerPage);

    const [salon, setSalon] = useState();

    const [services, setServices] = useState();
    const [loadingServices, setLoadingServices] = useState(false);
    
    const [deals, setDeal] = useState();
    const [loadingDeals, setLoadingDeals] = useState(false);

    const [ showModal, setShowModal ] = useState(false);

    const [messageShown, setMessageShown] = useState(false);

    useEffect(() => {
        axios.get(`/companies/${param.salonId}?include[]=vendor_page&include[]=booking_times`)
            .then(res => {
                setSalon(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [param.salonId])
    useEffect(() => {
        setLoadingServices(true);
        axios.get(`/companies/${param.salonId}/services?page=${servicesPage + 1}&per_page=${servicesRowsPerPage}`)
        .then(res => {
                setLoadingServices(false);
                setServices(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [param.salonId, servicesPage, servicesRowsPerPage])
    useEffect(() => {
        setLoadingDeals(true);
        axios.get(`/companies/${param.salonId}/deals?page=${dealsPage + 1}&per_page=${dealsRowsPerPage}`)
            .then(res => {
                setDeal(res.data);
                setLoadingDeals(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [dealsPage, dealsRowsPerPage, param.salonId, servicesPage, servicesRowsPerPage])

    const handleServiceChangePage = React.useCallback((event, newPage) => {
        setServicesPage(newPage);
    }, []);
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

    const copySalonUrlHandler = ( ) => {
        navigator.clipboard.writeText(window.location.href);
        setMessageShown(true);
    }
    const closeMessageHandler = () => {
        setMessageShown(false);
    }

    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (salon && services && deals) {
        content = (
            <Box sx={{ width: '100%' }}>
                <Typography component="div" variant="h4" sx={{ marginBottom: '10px' }} >
                    {salon.companyName}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} md={8} >
                        <Typography component="div" color='primary' variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', }}>
                            <PushPinIcon sx={{ mr: 1, width: '15px', height: '15px' }} />{salon.vendor_page.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                        <ActionsWrapper>
                            <ActionButton onClick={openShowModalHandler}>{t('book')}</ActionButton>
                            <ActionButton onClick={copySalonUrlHandler}><ShareIcon sx={{ mr: '5px'}} /> {t('share')}</ActionButton>
                        </ActionsWrapper>
                    </Grid>
                </Grid>
                <Cart salonData={salon}  show={showModal} onClose={closeShowModalHandler} />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t('services')} {...a11yProps(0)} />
                        <Tab label={t('deals')} {...a11yProps(1)} />
                        <Tab label={t('overview')} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        {services.data.map(service => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={service.id}>
                                    <SalonPanel >
                                        <div className="salon-img">
                                            <img src={service.image} alt="salon" />
                                        </div>
                                        <div className="salon-content">
                                            <h3 className="salon-title">
                                                <NavLink to={`/services/${service.id}`}>{service.name}</NavLink>
                                            </h3>
                                            <p className="salon-desc">
                                                {formatCurrency(service.price)}
                                            </p>
                                        </div>
                                    </SalonPanel>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                    <TablePaginationActions
                        component="div"
                        count={services.data.length}
                        total={services.meta ? services.meta.total : null}
                        rowsPerPage={dealsRowsPerPage}
                        page={servicesPage}
                        onPageChange={handleServiceChangePage}
                        loading={loadingServices}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        {deals.data.map(deal => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={deal.id}>
                                    <DealPanel >
                                        <div className="deal-img">
                                            <img src={deal.image} alt="spotlight" />
                                        </div>
                                        <div className="deal-content">
                                            <div className="deal-body" >
                                                <div>
                                                    <h3 className="deal-title">
                                                        <NavLink to={`/deals/${deal.id}`}>{deal.title}</NavLink>
                                                    </h3>
                                                    <p className="deal-desc">
                                                        {deal.applied_between_time}
                                                    </p>
                                                </div>
                                                <div className="deal-discount">
                                                    <h5 className={`discount-percent ${deal.discount_type === 'percentage' && 'percentage'} `}  >
                                                        <span>{deal.discount_value}</span>
                                                        <span className={`discount-percent-sign ${deal.discount_type === 'percentage' && 'percentage'} `}>{deal.discount_type === 'percentage' ? '%' : 'SAR'}</span>
                                                    </h5>
                                                    <h6 className="discount-text" >off</h6>
                                                </div>
                                            </div>
                                            <p className="deal-location">
                                                {deal.status}
                                            </p>
                                        </div>
                                    </DealPanel>
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
                </TabPanel>
                <TabPanel value={value} index={2}>
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
                                {t('timing')}
                            </Typography>
                            <TableContainer component={Paper} sx={{ my: 2 }}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                        {salon.booking_times.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {t(item.day)}
                                                </TableCell>
                                                <TableCell align="center">{t('from')} {item.start_time} {t('to')}  {item.end_time}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
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