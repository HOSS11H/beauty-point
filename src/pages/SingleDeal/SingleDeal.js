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
import { NavLink, useParams } from "react-router-dom";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { formatCurrency } from "../../shared/utility";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PushPinIcon from '@mui/icons-material/PushPin';
import Typography from '@mui/material/Typography';

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

const SingleDeal = props => {

    const { t } = useTranslation();

    const param = useParams();


    const [deal, setDeal] = useState();


    useEffect(() => {
        axios.get(`/deals/${param.dealId}?include[]=location`)
            .then(res => {
                setDeal(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (deal) {
        content = (
            <CustomCard sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' , flexDirection: 'column', flexBasis: '50%' }}>
                    <CardContent sx={{ flex: '1 0 auto', }}>
                        <Typography component="div" variant="h4" color="primary" sx={{ marginBottom: '20px' }}>
                            {deal.company.companyName}
                        </Typography>
                        <Typography component="div" variant="h5" sx={{ marginBottom: '10px' }} >
                            {deal.title}
                        </Typography>
                        <Typography variant="subtitle1" color="secondary" component="div" sx={{ marginBottom: '5px' }} >
                            {formatCurrency(deal.price)}
                        </Typography>
                        <Typography component="div" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center'}}>
                            <WatchLaterIcon sx={{ mr: 1, width:'15px', height:'15px' }} />{t('from')} {deal.open_time} {t('to')} {deal.close_time}
                        </Typography>
                        <Typography component="div" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <PushPinIcon sx={{ mr: 1, width:'15px', height:'15px' }} />{deal.location.name} 
                        </Typography>
                        <Typography component="div" color='primary' variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneAndroidIcon sx={{ mr: 1, width:'15px', height:'15px' }} />{deal.company.companyPhone} 
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ flexBasis: '50%', height: '100%', objectfit: 'cover' }}
                    image={deal.image}
                    alt={deal.name}
                />
            </CustomCard>
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
export default SingleDeal;