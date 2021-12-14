import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SalonsWrapper = styled.section`
    margin: 100px 0;
    @media screen and (max-width: 899.98px) {
        margin: 70px 0;
    }
`
const SalonPanel = styled.div`
    background-color: #fff;
    border-radius: 25px;
    margin-bottom: 30px;
    padding: 0 9px;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 30px;
        max-width: 370px
    }
    .salon-img  {
        img {
            width: 100%;
            border-radius: 25px 25px 0 0;
            height: 250px;
            object-fit: cover;
            @media screen and (max-width: 599.98px) {
                height: 200px;
            }
        }
    }
    .salon-content {
        background-color: #F7F7F7;
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .salon-title {
            font-size: 22px;
            line-height:1.5;
            font-weight: 500;
            color         : #96248e;
            margin-bottom:0;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color         : #96248e;
            }
        }
        .salon-desc {
            @include text(var(--global--font-body), 17px, 1.5, 300, var(--global--color-heading), 30px);
            font-size:17px;
            line-height:1.5;
            font-weight: 300;
            color         : ${props => props.theme.vars.black};
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
        }
        .salon-location {
            @include text(var(--global--font-body), 16px, 21px, 300, var(--global--color-heading), 0px);
            font-size: 16px;
            line-height: 21px;
            font-weight: 300;
            color         : ${props => props.theme.vars.black};
            margin-bottom: 0;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
    }
`
const salons = [
    {imgSrc: 'assets/images/salons/1.jpg', title:'Salon name', desc: 'Lorem ipsum', location: 'geddah', },
    {imgSrc: 'assets/images/salons/2.jpg', title:'Salon name', desc: 'Lorem ipsum', location: 'geddah', },
    {imgSrc: 'assets/images/salons/3.jpg', title:'Salon name', desc: 'Lorem ipsum', location: 'geddah', },
    {imgSrc: 'assets/images/salons/4.jpg', title:'Salon name', desc: 'Lorem ipsum', location: 'geddah', },
]

const Salons = props => {

    

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    };
    return (
        <SalonsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <h2 className="heading-title" >popular saloons</h2>
                </Heading>
                <Slider {...settings} >
                    {
                        salons.map((salon, index) => {
                            return (
                                <SalonPanel key={index}>
                                    <div className="salon-img">
                                        <img src={salon.imgSrc} alt="salon"/>
                                    </div>
                                    <div className="salon-content">
                                        <h3 className="salon-title">
                                            <a href="/">{salon.title}</a>
                                        </h3>
                                        <p className="salon-desc">
                                            {salon.desc}
                                        </p>
                                        <p className="salon-location">
                                            {salon.location}
                                        </p>
                                    </div>
                                </SalonPanel>
                            )
                        })
                    }

                </Slider>
            </Container>
        </SalonsWrapper>
    )
}
export default Salons