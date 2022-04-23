import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../../components/UI/Heading/Heading";
import SalonPanel from '../../../../components/UI/SalonPanel/SalonPanel';
import { useState, useEffect, useContext } from 'react';
import axios from '../../../../utils/axios-instance';
import { NavLink } from 'react-router-dom';
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
import Loader from '../../../../components/UI/Loader/Loader';

// install Swiper modules
SwiperCore.use([Autoplay]);

const ArtistsWrapper = styled.section`
    margin: 100px 0;
    @media screen and (max-width: 899.98px) {
        margin: 70px 0;
    }
`



const Artists = props => {

    const themeCtx = useContext(ThemeContext);

    const { theme, city } = themeCtx

    const { t } = useTranslation();
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get(`/artists?page=1&per_page=8&location_id=${city}`)
            .then(res => {
                setLoading(false)
                setArtists(res.data.data);
            })
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [city])


    let content;
    if (loading) {
        content = (
            <Loader height='200px' />
        );
    }
    if (artists.length > 0) {
        let fetchedArtists = [...artists];
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
                    fetchedArtists.map((artist, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <SalonPanel salon={artist} path='artists' />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        );
    }

    return (
        <ArtistsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <NavLink className="heading-title" to='all-artists'>{t('artists')}  {theme === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon />} </NavLink>
                </Heading>
                {content}
            </Container>
        </ArtistsWrapper>
    )
}
export default Artists