import { Container } from "@mui/material";
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, {keyframes} from 'styled-components';
import './beauty-icons.css'

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
            i,svg {
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
const services = [
    { icon: 'icon-hair-care', title: 'hair cair', },
    { icon: 'icon-makeover', title: 'makeover', },
    { icon: 'icon-skin-care', title: 'skin care', },
    { icon: 'icon-facial', title: 'facial', },
    { icon: 'icon-nails', title: 'nails', },
    { icon: 'icon-body-care', title: 'body care', },
    { icon: 'icon-makeup', title: 'makeup', },
    { icon: 'icon-hairstyle', title: 'hairstyle', },
    { icon: 'icon-bride-makeup', title: 'bride makeup', },
    { icon: 'icon-hair-cut', title: 'hair cut', },
    { icon: 'icon-skin-smoothing', title: 'skin smoothing', },
    { icon: 'icon-hair-dryer', title: 'hair dryer', },
]

const ServicesSlider = props => {
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
    return (
        <ServicesSliderWrapper>
            <Container maxWidth="lg">
                <Heading className='heading-2'>
                    <h2 className="heading-title" >select your services</h2>
                </Heading>
                <Slider {...settings} >
                    {
                        services.map((service, index) => {
                            return (
                                <ServicePanel key={index}>
                                    <div className="service-icon">
                                        <i className={service.icon}></i>
                                    </div>
                                    <div className="service-title">
                                        <a href="/">{service.title}</a>
                                    </div>
                                </ServicePanel>
                            )
                        })
                    }
                </Slider>
            </Container>
        </ServicesSliderWrapper>
    )
}
export default ServicesSlider;