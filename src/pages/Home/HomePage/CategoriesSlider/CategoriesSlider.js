import { Container } from "@mui/material";
import { Heading } from "../../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import './beauty-icons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios-instance';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from "react";
import ThemeContext from "../../../../store/theme-context";
import CategoryPanel from "../../../../components/UI/CategoryPanel/CategoryPanel";
import Loader from "../../../../components/UI/Loader/Loader";


const CategoriesSliderWrapper = styled.section`
    padding: 64px 0 0px;
    @media screen and (max-width: 899.98px) {
        padding: 15px 0 0px;
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
                color          : ${({ theme }) => theme.vars.secondary};
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
                content: ${({ theme }) => theme.direction === 'rtl' ? "'\\e901'" : "'\\e900'"};
            }
        }
        .slick-next {
            right: 0;
            &::before {
                content: ${({ theme }) => theme.direction === 'rtl' ? "'\\e900'" : "'\\e901'"};
            }
        }
    }
`

const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 900,
            settings: {
                arrows: false,
                slidesToShow: 4,
                slidesToScroll: 2,
            }
        },
    ]
};

const CategoriesSlider = props => {

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext);

    const { theme } = themeCtx


    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        axios.get('/categories', {
            signal: controller.signal
        })
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => {
                //console.log(err);
            })
        return () => {
            controller.abort();
        }
    }, [])

    let content = (
        <Loader height='200px' />
    );
    if (categories.length > 0) {
        content = (
            <Slider {...settings}>
                {
                    categories.map((category, index) => {
                        return <CategoryPanel key={index} category={category} path='categories' />
                    })
                }
            </Slider>
        )
    }


    return (
        <CategoriesSliderWrapper>
            <Container maxWidth="lg">
                <Heading className='heading-2'>
                    <NavLink className="heading-title" to='all-categories'>{t('select your Categories')}  {theme === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon />} </NavLink>
                </Heading>
                {content}
            </Container>
        </CategoriesSliderWrapper>
    )
}
export default CategoriesSlider;
