import styled from 'styled-components'
import Card from '@mui/material/Card';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

// import Swiper core and required modules
import SwiperCore, {
    Autoplay
} from 'swiper';

import 'swiper/swiper.min.css';

// install Swiper modules
SwiperCore.use([Autoplay]);

// Import Swiper styles

const SalonCard = styled(Card)`
    &.MuiPaper-root {-
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius: 20px;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        display: flex;
        position: relative;
        cursor: pointer;
        margin-bottom: 0px;
    }
`
const CardImg = styled.div`
    flex-basis: 50%;
    flex-shrink:0;
    margin-right: 10px;
    height: 150px;
    img {
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
        color: ${({ theme }) => theme.palette.common.black};
    }
    h4 {
        font-size: 15px;
        line-height: 1.4;
        font-weight: 600;
        margin-bottom: 10px;
        font-family: ${({ theme }) => theme.fonts.ar};
        color: ${({ theme }) => theme.palette.common.black};
    }
    p {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 600;
        font-family: ${({ theme }) => theme.fonts.ar};
        color: ${({ theme }) => theme.palette.common.black};
        svg {
            width: 16px;
            height: 16px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`

const SalonsCarousel = ({ salons, handleClick }) => {


    let content = salons.map(salon => {
        return (
            <SwiperSlide key={salon.data.id}>
                <SalonCard onClick={() => handleClick({ lat: +salon.lat, lng: +salon.lng })} >
                    <CardImg>
                        <img src={salon.data.image} alt={salon.data.name} />
                    </CardImg>
                    <CardBody>
                        <h3>{salon.data.name}</h3>
                        {/* <h4>{salon.data.address}</h4> */}
                        <p>
                            <PhoneAndroidIcon sx={{ mr: 1 }} />{salon.data.phone}
                        </p>
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
                        "slidesPerView": 1,
                        "spaceBetween": 10
                    },
                    "500": {
                        "slidesPerView": 2,
                        "spaceBetween": 20
                    },
                    "700": {
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