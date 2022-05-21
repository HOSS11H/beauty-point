import styled from 'styled-components'
import Card from '@mui/material/Card';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// import Swiper core and required modules
import SwiperCore, {
    Autoplay
} from 'swiper';

import 'swiper/swiper.min.css';
import { useMap, useMapEvents } from 'react-leaflet';

// install Swiper modules
SwiperCore.use([Autoplay]);

// Import Swiper styles

const SalonCard = styled(Card)`
    &.MuiPaper-root {
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius: 20px;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        display: flex;
        position: relative;
        cursor: pointer;
        margin-bottom: 0px;
        @media screen and (max-width: 500px) {
            display: block;
        }
    }
`
const CardImg = styled.div`
    flex-basis: 50%;
    flex-shrink:0;
    margin-right: 10px;
    height: 150px;
    @media screen and (max-width: 500px) {
        margin-bottom: 10px;
        margin-right: 0px;
        height: 125px;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const CardBody = styled.div`
    flex-grow: 1;
    h3 {
        font-size: 16px;
        line-height: 1.4;
        font-weight: 700;
        font-family: ${({ theme }) => theme.fonts.ar};
        margin-bottom: 5px;
        color: ${({ theme }) => theme.vars.theme};
        overflow: hidden;
        @media screen and (max-width: 500px) {
            max-height: 42px;
        }
    }
    h4 {
        font-size: 15px;
        line-height: 1.4;
        font-weight: 600;
        font-family: ${({ theme }) => theme.fonts.ar};
        color: ${({ theme }) => theme.palette.text.primary};
        max-height: 63px;
        overflow: hidden;
        @media screen and (max-width: 500px) {
            max-height: 42px;
        }
    }
`

const SalonsCarousel = ({ salons, handleClick }) => {

    const map = useMap();
    const handleSalonClick = ((coords) => {
        map.flyTo(coords, map.getZoom())
    })

    let content = salons.map(salon => {
        return (
            <SwiperSlide key={salon.data.id}>
                <SalonCard onClick={() => handleSalonClick({ lat: +salon.lat, lng: +salon.lng })} >
                    <CardImg>
                        <img src={salon.data.image} alt={salon.data.name} />
                    </CardImg>
                    <CardBody>
                        <h3>{salon.data.name}</h3>
                        <h4>{salon.data.address}</h4>
                    </CardBody>
                </SalonCard>
            </SwiperSlide>
        )
    })
    return (
        <>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                breakpoints={{
                    "0": {
                        "slidesPerView": 2,
                        "spaceBetween": 10
                    },
                    "500": {
                        "slidesPerView": 2,
                        "spaceBetween": 20
                    },
                    "750": {
                        "slidesPerView": 3,
                        "spaceBetween": 30
                    },
                    "900": {
                        "slidesPerView": 4,
                        "spaceBetween": 20
                    }
                }}
            >
                {content}
            </Swiper>
        </>
    )
}
export default SalonsCarousel;