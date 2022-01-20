import { Container } from "@mui/material";
import { Heading } from "../../../components/UI/Heading/Heading";
import Slider from "react-slick";
import './beauty-icons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from "react";
import ThemeContext from "../../../store/theme-context";


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
const CategoryPanel = styled.div`
    position: relative;
    text-align: center;
    margin-top: 10px;
    @media screen and (max-width: 899.98px) {
        maz-width: 370px;
        margin: 10px  auto 0;
    }
    &:hover {
        .category-icon {
            i,svg, img {
                animation: ${Bounce} 1s ease-in-out;
            }
        }
    }   
    .category-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 127px;
        height: 127px;
        background: ${({ theme }) => theme.vars.secondary};
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
            color: ${({ theme }) => theme.palette.common.white};
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
    .category-title {
        a {
            font-size: 20px;
            line-height: 27px;
            font-weight: 500;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 15px
            }
            transition: 0.3s ease-in-out;
            color: ${({ theme }) => theme.palette.text.primary};
            &:hover {
                color: ${({ theme }) => theme.vars.primary};
            }
        }
    }
    .category-num {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 30px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${({ theme }) => theme.palette.common.white};
        color: ${({ theme }) => theme.vars.primary};
        font-size: 16px;
        font-weight: 600;
        z-index: 51;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
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


    const [categories, setCategories] = useState();

    useEffect(() => {
        axios.get('/categories?include[]=services')
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (categories) {
        content = (
            <Slider {...settings}>
                {
                    categories.map((category, index) => (
                        <CategoryPanel key={index}>
                            <div className="category-icon">
                                <img src={category.image} alt="Category" />
                            </div>
                            <div className="category-title">
                                <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
                            </div>
                            <div className="category-num" >
                                {category.services.length}
                            </div>
                        </CategoryPanel>
                    ))
                }
            </Slider>
        )
    }


    return (
        <CategoriesSliderWrapper>
            <Container maxWidth="lg">
                <Heading className='heading-2'>
                    <NavLink className="heading-title" to='/all-categories'>{t('select your Categories')}  {theme === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon />} </NavLink>
                </Heading>
                {content}
            </Container>
        </CategoriesSliderWrapper>
    )
}
export default CategoriesSlider;