import { Container } from "@mui/material";
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, {keyframes} from 'styled-components';
import './beauty-icons.css'
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';
import { useTranslation } from "react-i18next";


const ServicesSliderWrapper = styled.section`
    background-color: #FAFAFA;
    padding: 74px 0 88px;
    @media screen and (max-width: 899.98px) {
        padding: 25px 0 15px;
    }
    && {
        .slick-prev, .slick-next {
            top: 40%;
            display:flex;
            justify-content: center;
            align-items: center;
            width: auto;
            height: auto;
            width: 30px;
            z-index:51;
            &::before {
                font-family    : 'beauty-point';
                color          : #96248e;
                font-size      : 14px;
                transition     : 0.3s ease-in-out;
                opacity : 1;
            }
            @media screen and (max-width: 899.98px) {
                display: none;
            }
        }
        .slick-prev {
            left: 0;
            &::before {
                content: ${ ( {theme}  ) => theme.direction === 'rtl' ?  "'\\e901'" :  "'\\e900'" };
            }
        }
        .slick-next {
            right: 0;
            &::before {
                content: ${ ( {theme}  ) => theme.direction === 'rtl' ?  "'\\e900'" :  "'\\e901'" };
            }
        }
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

const ServicesSlider = props => {

    const {t} = useTranslation();

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
        ]
    };

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
        content = (
            <Slider {...settings}>
                {
                    services.map((service, index) => (
                        <ServicePanel key={index}>
                            <div className="service-icon">
                                {/* <i className={`beauty-icon ${service.icon}`}></i> */}
                                <img src={service.image} alt="service" />
                            </div>
                            <div className="service-title">
                                <NavLink to="/">{service.name}</NavLink>
                            </div>
                        </ServicePanel>
                    ))
                }
            </Slider>
        )
    }

    
    return (
        <ServicesSliderWrapper>
            <Container maxWidth="lg">
                <Heading className='heading-2'>
                    <h2 className="heading-title" >{t('select your services')}</h2>
                </Heading>
                {content}
            </Container>
        </ServicesSliderWrapper>
    )
}
export default ServicesSlider;