import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealPanel from '../../../../components/UI/DealPanel/DealPanel';
import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// import Swiper core and required modules
import SwiperCore, {
    Autoplay
} from 'swiper';

import 'swiper/swiper.min.css';

const SpotlightsWrapper = styled.section`
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

// install Swiper modules
SwiperCore.use([Autoplay]);

const Spotlights = props => {
    const {t} = useTranslation();

    const [spotlights, setSpotlights] = useState(null);

    useEffect(() => {
        axios.get('/spotlights?include[]=deal')
            .then(res => {
                setSpotlights(res.data.data);
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
    if (spotlights) {
        let fetchedSpotlights = [...spotlights];
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
                    fetchedSpotlights.map((spotlight, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <DealPanel key={spotlight.id} deal={spotlight.deal} path='deals' />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        );
    }

    return (
        <SpotlightsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <h2 className="heading-title" >{t('popular spotlights')}</h2>
                </Heading>
                {content}
            </Container>
        </SpotlightsWrapper>
    )
}
export default Spotlights