import { Container, Grid } from "@mui/material";
import { Heading } from "../../components/UI/Heading/Heading";
import styled, {keyframes} from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import HomeLayout from "../../components/HomeLayout/HomeLayout";

const CategoriesWrapper = styled.section`
    background-color: #FAFAFA;
    padding: 74px 0 88px;
    @media screen and (max-width: 899.98px) {
        padding: 25px 0 15px;
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
        a {
            font-size: 20px;
            line-height: 27px;
            font-weight: 500;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 15px
            }
            transition: 0.3s ease-in-out;
            color: ${({ theme }) => theme.palette.common.black};
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

const AllCategories = props => {

    const {t} = useTranslation();

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
        content = services.map((category, index) => (
            <Grid item xs={3} lg={2} key={index}>
                <ServicePanel>
                    <div className="service-icon">
                        <img src={category.image} alt="service" />
                    </div>
                    <div className="service-title">
                        <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
                    </div>
                </ServicePanel>
            </Grid>
        ))
    }
    return (
        <HomeLayout>
            <CategoriesWrapper>
                <Container maxWidth="lg">
                    <Heading className='heading-2'>
                        <h2 className="heading-title">{t('all categories')}</h2>
                    </Heading>
                    <Grid container spacing={2}>
                        {content}
                    </Grid>
                </Container>
            </CategoriesWrapper>
        </HomeLayout>
    )
}
export default AllCategories;