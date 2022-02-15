import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../../components/UI/Heading/Heading";
import DealPanel from '../../../../components/UI/DealPanel/DealPanel';
import { useState, useEffect, useContext } from 'react';
import axios from '../../../../utils/axios-instance';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import ThemeContext from "../../../../store/theme-context";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import Swiper core and required modules
import SwiperCore, {
    Autoplay
} from 'swiper';

import 'swiper/swiper.min.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../../../components/UI/Loader/Loader';

const SpotlightsWrapper = styled.section`
    margin: 100px 0;
    @media screen and (max-width: 899.98px) {
        margin: 70px 0;
    }
`


// install Swiper modules
SwiperCore.use([Autoplay]);

const Spotlights = props => {
    const {t} = useTranslation();

    const [spotlights, setSpotlights] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const themeCtx = useContext(ThemeContext);
    const {theme, city} = themeCtx

    useEffect(() => {
        setLoading(true)
        axios.get(`/spotlights?include[]=deal&include[]=company&page=1&per_page=8&location_id=${city}`)
            .then(res => {
                setLoading(false)
                setSpotlights(res.data.data);
            })
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [city])


    let content;

    if (loading) {
        content= (
            <Loader height='200px' />
        );
    }
    if (spotlights.length > 0) {
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
                                <DealPanel key={spotlight.id} deal={{...spotlight.deal, company: spotlight.company}} path='deals' />
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
                    <NavLink className="heading-title" to='all-spotlights'>{t('popular spotlights')}  {theme === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon />} </NavLink>
                </Heading>
                {content}
            </Container>
        </SpotlightsWrapper>
    )
}
export default Spotlights