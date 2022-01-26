import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SalonPanel from '../../../../components/UI/SalonPanel/SalonPanel';
import { useState, useEffect, useContext } from 'react';
import axios from '../../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeContext from "../../../../store/theme-context";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// import Swiper core and required modules
import SwiperCore, {
    Autoplay
} from 'swiper';

import 'swiper/swiper.min.css';

// install Swiper modules
SwiperCore.use([Autoplay]);

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


const Salons = props => {

    const themeCtx= useContext(ThemeContext);

    const { theme } = themeCtx

    const {t} = useTranslation();
    const [salons, setSalons] = useState(null);

    useEffect(() => {
        axios.get('/companies?page=1&per_page=8')
            .then(res => {
                setSalons(res.data.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])


    let content= (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (salons) {
        let fetchedSalons = [...salons];
        content = (
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                breakpoints={{
                    "0": {
                        "slidesPerView": 1,
                        "spaceBetween": 10
                    },
                    "450": {
                        "slidesPerView": 2,
                        "spaceBetween": 20
                    },
                    "800": {
                        "slidesPerView": 3,
                        "spaceBetween": 20
                    },
                    "1200": {
                        "slidesPerView": 4,
                        "spaceBetween": 20
                    }
                }}
            >
                {
                    fetchedSalons.map((salon, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <SalonPanel salon={salon} path='salons' />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        );
    }

    return (
        <SalonsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <NavLink className="heading-title" to='all-saloons'>{t('salons')}  { theme === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon /> } </NavLink>
                </Heading>
                {content}
            </Container>
        </SalonsWrapper>
    )
}
export default Salons