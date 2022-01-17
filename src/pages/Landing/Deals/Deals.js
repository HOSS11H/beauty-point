import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealPanel from '../../../components/UI/DealPanel/DealPanel';
import { useState, useEffect, useContext } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeContext from "../../../store/theme-context";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DealsWrapper = styled.section`
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

const Deals = props => {
    const {t} = useTranslation();
    const [deals, setDeals] = useState(null);

    const themeCtx= useContext(ThemeContext);

    const { theme } = themeCtx

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
        axios.get('/deals')
            .then(res => {
                setDeals(res.data.data);
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
    if (deals) {
        let fetchedDeals = [...deals];
        if(fetchedDeals.length < 4){
            while (fetchedDeals.length < 4 ) {
                fetchedDeals = fetchedDeals.concat(fetchedDeals)
            }
        }
        content = (
            <Slider {...settings} >
                {
                    fetchedDeals.map((deal, index) => {
                        return (
                            <DealPanel key={deal.id} deal={deal} />
                        )
                    })
                }
            </Slider>
        );
    }

    return (
        <DealsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <NavLink className="heading-title" to='/all-deals'>{t('deals')}  { theme === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon /> } </NavLink>
                </Heading>
                {content}
            </Container>
        </DealsWrapper>
    )
}
export default Deals