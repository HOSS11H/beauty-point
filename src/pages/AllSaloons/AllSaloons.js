import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../components/UI/Heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SalonPanel } from '../../components/UI/SalonPanel/SalonPanel';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from "../Landing/Header/Header";
import Footer from "../Landing/Footer/Footer";
import ModuleWhatsapp from "../Landing/Header/Modules/ModuleWhatsapp/ModuleWhatsapp";
import heroImgSrc from '../../assets/images/hero/1.jpg';

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

const SalonsWrapper = styled.section`
    margin: 100px 0;
    @media screen and (max-width: 899.98px) {
        margin: 70px 0;
    }
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const AllSaloons = props => {

    const { t } = useTranslation();
    const [salons, setSalons] = useState(null);

    useEffect(() => {
        axios.get('/companies')
            .then(res => {
                setSalons(res.data.data);
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
    if (salons) {
        let fetchedSalons = [...salons];
        content = (
            <Grid container spacing={2}>
                {
                    fetchedSalons.map((salon, index) => {
                        return (
                            <Grid item xs={6} md={4}>
                                <SalonPanel key={salon.id}>
                                    <div className="salon-img">
                                        <img src={salon.logo_url} alt="salon" />
                                    </div>
                                    <div className="salon-content">
                                        <h3 className="salon-title">
                                            <NavLink to={`/salons/${salon.id}`}>{salon.companyName}</NavLink>
                                        </h3>
                                        <p className="salon-desc">
                                            {salon.address}
                                        </p>
                                        <p className="salon-location">
                                            {salon.companyPhone}
                                        </p>
                                    </div>
                                </SalonPanel>
                            </Grid>
                        )
                    })
                }
            </Grid>
        );
    }

    return (
        <>
            <Header />
            <HeroImage >
                <img src={heroImgSrc} alt="hero" />
            </HeroImage>
        <SalonsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <h2 className="heading-title" >{t('popular saloons')}</h2>
                </Heading>
                {content}
            </Container>
            </SalonsWrapper>
            <Footer />
            <ModuleWhatsapp />
            </>
    )
}
export default AllSaloons
