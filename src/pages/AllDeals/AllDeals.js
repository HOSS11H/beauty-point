import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../components/UI/Heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DealPanel } from '../../components/UI/SalonPanel/SalonPanel';
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

const DealsWrapper = styled.section`
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

const AllDeals = props => {

    const { t } = useTranslation();
    const [deals, setDeals] = useState(null);

    useEffect(() => {
        axios.get('/deals?include[]=location')
            .then(res => {
                setDeals(res.data.data);
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
    if (deals) {
        content = (
            <Grid container spacing={2}>
                {
                    deals.map((deal, index) => {
                        return (
                            <Grid item xs={6} md={4} key={deal.id}>
                                <DealPanel >
                                    <div className="deal-img">
                                        <img src={deal.image} alt="spotlight"/>
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
                                                <h5 className={`discount-percent ${ deal.discount_type === 'percentage' && 'percentage'} `}  >
                                                    <span>{deal.discount_value}</span>
                                                    <span className={`discount-percent-sign ${ deal.discount_type === 'percentage' && 'percentage'} `}>{deal.discount_type === 'percentage' ? '%' : 'SAR'}</span>
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
        );
    }

    return (
        <>
            <Header />
            <HeroImage >
                <img src={heroImgSrc} alt="hero" />
            </HeroImage>
        <DealsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <h2 className="heading-title" >{t('popular deals')}</h2>
                </Heading>
                {content}
            </Container>
            </DealsWrapper>
            <Footer />
            <ModuleWhatsapp />
            </>
    )
}
export default AllDeals