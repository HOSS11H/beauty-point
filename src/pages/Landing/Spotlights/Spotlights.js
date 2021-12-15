import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DealPanel } from '../../../components/UI/SalonPanel/SalonPanel';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';

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

const Spotlights = props => {
    const [spotlights, setSpotlights] = useState(null);

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
    useEffect(() => {
        axios.get('/spotlights?include[]=deal')
            .then(res => {
                setSpotlights(res.data.data);
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
    if (spotlights) {
        let fetchedSpotlights = [...spotlights];
        if(fetchedSpotlights.length < 4){
            while (fetchedSpotlights.length < 4 ) {
                fetchedSpotlights = fetchedSpotlights.concat(fetchedSpotlights)
            }
        }
        content = (
            <Slider {...settings} >
                {
                    fetchedSpotlights.map((spotlight, index) => {
                        return (
                            <DealPanel key={spotlight.id}>
                                <div className="deal-img">
                                    <img src={spotlight.deal.image} alt="spotlight"/>
                                </div>
                                <div className="deal-content">
                                    <div className="deal-body" >
                                        <div>
                                            <h3 className="deal-title">
                                                <NavLink to="/">{spotlight.deal.title}</NavLink>
                                            </h3>
                                            <p className="deal-desc">
                                                {spotlight.deal.applied_between_time}
                                            </p>
                                        </div>
                                        <div className="deal-discount">
                                            <h5 className={`discount-percent ${ spotlight.deal.discount_type === 'percentage' && 'percentage'} `}  >
                                                <span>{spotlight.deal.discount_value}</span>
                                                <span className={`discount-percent-sign ${ spotlight.deal.discount_type === 'percentage' && 'percentage'} `}>{spotlight.deal.discount_type === 'percentage' ? '%' : 'SAR'}</span>
                                            </h5>
                                            <h6 className="discount-text" >off</h6>
                                        </div>
                                    </div>
                                    <p className="deal-location">
                                        {spotlight.deal.status}
                                    </p>
                                </div>
                            </DealPanel>
                        )
                    })
                }
            </Slider>
        );
    }

    return (
        <SpotlightsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <h2 className="heading-title" >popular spotlights</h2>
                </Heading>
                {content}
            </Container>
        </SpotlightsWrapper>
    )
}
export default Spotlights