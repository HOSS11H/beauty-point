import { Container, Grid } from "@mui/material";
import { Heading } from "../../components/UI/Heading/Heading";
import heroImgSrc from '../../assets/images/hero/1.jpg';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import Header from "../Landing/Header/Header";
import Footer from "../Landing/Footer/Footer";
import ModuleWhatsapp from "../Landing/Header/Modules/ModuleWhatsapp/ModuleWhatsapp";
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
import { formatCurrency } from "../../shared/utility";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "../../components/UI/Dashboard/Table/TablePagination/TablePagination";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CategoriesWrapper = styled.section`
    background-color: #FAFAFA;
    padding: 70px 0px;
`
const HeroImage = styled.div`
    height: 40vh;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(150, 36, 142, 0.27);
        z-index:0;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(56, 56, 56, 0.72) 0%, rgba(255, 255, 255, 0) 50%);
        z-index:0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const CustomCard = styled(Card)`
    @media screen and (max-width: 599.98px) {
        flex-direction: column;
    }
`
const servicesIntialRowsPerPage = 9
const dealsIntialRowsPerPage = 9

const SingleSalon = props => {

    const { t } = useTranslation();

    const param = useParams();

    const [value, setValue] = React.useState(0);

    const [servicesPage, setServicesPage] = useState(0);
    const [servicesRowsPerPage, setServicesRowsPerPage] = useState(servicesIntialRowsPerPage);

    const [dealsPage, setDealsPage] = useState(0);
    const [dealsRowsPerPage, setDealsRowsPerPage] = useState(dealsIntialRowsPerPage);

    const [salon, setSalon] = useState();

    const [services, setServices] = useState();
    const [loadingServices, setLoadingServices] = useState(false);
    
    const [deals, setDeal] = useState();
    const [loadingDeals, setLoadingDeals] = useState(false);

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
                <Typography component="div" color='primary' variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <PushPinIcon sx={{ mr: 1, width: '15px', height: '15px' }} />{salon.vendor_page.address}
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t('services')} {...a11yProps(0)} />
                        <Tab label={t('deals')} {...a11yProps(1)} />
                        <Tab label={t('overview')} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TablePaginationActions
                        component="div"
                        count={services.data.length}
                        total={services.meta ? services.meta.total : null}
                        rowsPerPage={dealsRowsPerPage}
                        page={servicesPage}
                        onPageChange={handleServiceChangePage}
                        loading={loadingServices}
                    />
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
                                            <p className="salon-location">
                                                {service.name}
                                            </p>
                                        </div>
                                    </SalonPanel>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TablePaginationActions
                            component="div"
                            count={deals.data.length}
                            total={deals.meta ? deals.meta.total : null}
                            rowsPerPage={dealsRowsPerPage}
                            page={dealsPage}
                            onPageChange={handleDealChangePage}
                            loading={loadingDeals}
                        />
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
        <>
            <Header />
            <HeroImage >
                <img src={heroImgSrc} alt="hero" />
            </HeroImage>
            <CategoriesWrapper>
                <Container maxWidth="lg">
                    {content}
                </Container>
            </CategoriesWrapper>
            <Footer />
            <ModuleWhatsapp />
        </>
    )
}
export default SingleSalon;