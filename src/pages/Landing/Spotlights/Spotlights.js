import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealPanel from '../../../components/UI/DealPanel/DealPanel';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
    const {t} = useTranslation();

    const [spotlights, setSpotlights] = useState(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
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
                            <DealPanel key={spotlight.id} deal={spotlight.deal} />
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
                    <h2 className="heading-title" >{t('popular spotlights')}</h2>
                </Heading>
                {content}
            </Container>
        </SpotlightsWrapper>
    )
}
export default Spotlights