import { Container, Grid } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { SalonPanel } from '../../components/UI/SalonPanel/SalonPanel';
import { formatCurrency } from "../../shared/utility";
import HomeLayout from "../../components/HomeLayout/HomeLayout";

const CategoriesWrapper = styled.section`
    background-color: #FAFAFA;
    padding: 70px 0px;
`
const HeroImage = styled.div`
    height: 40vh;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(150, 36, 142, 0.27);
        z-index:0;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(56, 56, 56, 0.72) 0%, rgba(255, 255, 255, 0) 50%);
        z-index:0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const SingleCategory = props => {

    const {t} = useTranslation();

    const param = useParams();

    
    const [category, setCategory ] = useState();
    

    useEffect(() => {
        axios.get(`/categories/${param.categoryId}/services?include[]=company`)
            .then(res => {
                setCategory(res.data);
                console.log(res.data);
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
    if (category) {
        content = category.data.map((service, index) => (
            <Grid item xs={6} md={4} key={index}>
                <SalonPanel >
                    <div className="salon-img">
                        <img src={service.image} alt="salon"/>
                    </div>
                    <div className="salon-content">
                        <h3 className="salon-title">
                            <NavLink to={`/services/${service.id}`}>{service.name}</NavLink>
                        </h3>
                        <p className="salon-desc">
                            {formatCurrency(service.price)}
                        </p>
                        <NavLink to={`/salons/${service.company.id}`} className="salon-location">
                            {service.company.companyName}
                        </NavLink>
                    </div>
                </SalonPanel>
            </Grid>
        ))
    }
    return (
        <HomeLayout>
            <CategoriesWrapper>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {content}
                    </Grid>
                </Container>
            </CategoriesWrapper>
        </HomeLayout>
    )
}
export default SingleCategory;