import { Container } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SalonPanel } from '../../../components/UI/SalonPanel/SalonPanel';
import { useState, useEffect, useContext } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeContext from "../../../store/theme-context";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SalonsWrapper = styled.section`
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

const Salons = props => {

    const themeCtx= useContext(ThemeContext);

    const { theme } = themeCtx

    const {t} = useTranslation();
    const [salons, setSalons] = useState(null);

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
        axios.get('/companies')
            .then(res => {
                setSalons(res.data.data);
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
    if (salons) {
        console.log(salons);
        let fetchedSalons = [...salons];
        if(fetchedSalons.length < 4){
            while (fetchedSalons.length < 4 ) {
                fetchedSalons = fetchedSalons.concat(fetchedSalons)
            }
        }
        content = (
            <Slider {...settings} >
                {
                    fetchedSalons.map((salon, index) => {
                        return (
                            <SalonPanel key={salon.id}>
                                <div className="salon-img">
                                    <img src={salon.logo_url} alt="salon"/>
                                </div>
                                <div className="salon-content">
                                    <h3 className="salon-title">
                                        <NavLink to={`/salons/${salon.id}`}>{salon.companyName}</NavLink>
                                    </h3>
                                    <p className="salon-desc">
                                        {salon.address}
                                    </p>
                                    <p className="salon-location">
                                        {salon.companyPhone}
                                    </p>
                                </div>
                            </SalonPanel>
                        )
                    })
                }
            </Slider>
        );
    }

    return (
        <SalonsWrapper>
            <Container maxWidth="lg">
                <Heading>
                    <NavLink className="heading-title" to='/all-saloons'>{t('popular saloons')}  { theme === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon /> } </NavLink>
                </Heading>
                {content}
            </Container>
        </SalonsWrapper>
    )
}
export default Salons