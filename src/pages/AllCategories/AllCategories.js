import { Container, Grid } from "@mui/material";
import { Heading } from "../../components/UI/Heading/Heading";
import heroImgSrc from '../../assets/images/hero/1.jpg';
import styled, {keyframes} from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Header from "../Landing/Header/Header";
import Footer from "../Landing/Footer/Footer";
import ModuleWhatsapp from "../Landing/Header/Modules/ModuleWhatsapp/ModuleWhatsapp";

const CategoriesWrapper = styled.section`
    background-color: #FAFAFA;
    padding: 74px 0 88px;
    @media screen and (max-width: 899.98px) {
        padding: 25px 0 15px;
    }
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

const Bounce = keyframes`
    0%, 100%, 20%, 50%, 80% {
        transform:         translateY(0)
    }
    40% {
        transform:         translateY(-20px)
    }
    60% {
        transform:         translateY(-15px)
    }
`;
const ServicePanel = styled.div`
    text-align: center;
    @media screen and (max-width: 899.98px) {
        maz-width: 370px;
        margin: 0 auto;
    }
    &:hover {
        .service-icon {
            i,svg, img {
                animation: ${Bounce} 1s ease-in-out;
            }
        }
    }   
    .service-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 127px;
        height: 127px;
        background: #96248e;
        border-radius: 50%;
        margin-bottom: 14px;
        @media screen and (max-width: 899.98px) {
            width:80px;
            height:80px;
        }
        @media screen and (max-width: 599.98px) {
            width:50px;
            height:50px;
        }
        i, svg {
            color: #fff;
            transition: 0.3s ease-in-out;
            font-size: 60px;
            @media screen and (max-width: 899.98px) {
                font-size: 35px
            }
            @media screen and (max-width: 599.98px) {
                font-size: 25px
            }
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    .service-title {
        font-size: 20px;
        line-height: 27px;
        font-weight: 500;
        text-transform: capitalize;
        @media screen and (max-width: 599.98px) {
            font-size: 15px
        }
        a {
            transition: 0.3s ease-in-out;
            color: ${({ theme }) => theme.vars.black};
            &:hover {
                color: ${({ theme }) => theme.vars.primary};
            }
        }
    }
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const AllCategories = props => {

    const {t} = useTranslation();

    const [services, setServices ] = useState();

    useEffect(() => {
        axios.get('/categories')
            .then(res => {
                setServices(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    let content= (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (services) {
        content = services.map((service, index) => (
            <Grid item xs={3} lg={2} key={index}>
                <ServicePanel>
                    <div className="service-icon">
                        <img src={service.image} alt="service" />
                    </div>
                    <div className="service-title">
                        <NavLink to="/">{service.name}</NavLink>
                    </div>
                </ServicePanel>
            </Grid>
        ))
    }
    return (
        <>
            <Header />
            <HeroImage >
                <img src={heroImgSrc} alt="hero" />
            </HeroImage>
            <CategoriesWrapper>
                <Container maxWidth="lg">
                    <Heading className='heading-2'>
                        <h2 className="heading-title">{t('all categories')}</h2>
                    </Heading>
                    <Grid container spacing={3}>
                        {content}   
                    </Grid>
                </Container>
            </CategoriesWrapper>
            <Footer />
            <ModuleWhatsapp />
        </>
    )
}
export default AllCategories;